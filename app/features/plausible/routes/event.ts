import { type ActionFunctionArgs } from 'react-router'
import { getClientIPAddress } from 'remix-utils/get-client-ip-address'

import { logger } from '~/lib/logger.ts'

import { plausibleRateLimiter } from '../utils/rate-limiter.ts'
import { sanitizeEventData, validateEventData } from '../utils/validation.ts'

export const action = async ({ request }: ActionFunctionArgs) => {
	const { method } = request

	// Parse and validate request body
	let body: any
	try {
		body = await request.json()
	} catch (error) {
		logger.error('Invalid JSON in Plausible event request', { error })
		return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
			headers: { 'Content-Type': 'application/json' },
			status: 400,
		})
	}

	// Validate and sanitize event data
	const validationErrors = validateEventData(body)
	if (validationErrors.length > 0) {
		return new Response(
			JSON.stringify({
				error: 'Validation failed',
				errors: validationErrors,
			}),
			{
				headers: { 'Content-Type': 'application/json' },
				status: 400,
			},
		)
	}

	// Sanitize the data
	body = sanitizeEventData(body)

	const userAgent = request.headers.get('user-agent') || ''
	const clientIp = getClientIPAddress(request) || ''

	// Apply rate limiting
	if (!plausibleRateLimiter.isAllowed(clientIp)) {
		logger.warn(`Rate limit exceeded for IP: ${clientIp}`)
		return new Response(JSON.stringify({ error: 'Too many requests' }), {
			headers: {
				'Content-Type': 'application/json',
				'Retry-After': String(
					Math.ceil((plausibleRateLimiter.getResetTime(clientIp) - Date.now()) / 1000),
				),
			},
			status: 429,
		})
	}

	// Check environment configuration
	if (!process.env.PLAUSIBLE_INSTANCE_URL) {
		logger.error('PLAUSIBLE_INSTANCE_URL environment variable not set')
		return new Response(JSON.stringify({ error: 'Service configuration error' }), {
			headers: { 'Content-Type': 'application/json' },
			status: 500,
		})
	}

	// Suppress events in localhost
	if (process.env.ORIGIN?.includes('localhost')) {
		logger.debug(`Plausible event suppressed in localhost: ${body.name}`)
		return new Response(JSON.stringify({ status: 'suppressed' }), {
			headers: { 'Content-Type': 'application/json' },
			status: 200,
		})
	}

	const headers = {
		'CF-Connecting-IP': clientIp,
		'Content-Type': 'application/json',
		'True-Client-IP': clientIp,
		'User-Agent': userAgent,
		'X-Forwarded-For': clientIp,
		'X-Real-IP': clientIp,
	}

	try {
		const response = await fetch(`${process.env.PLAUSIBLE_INSTANCE_URL}/api/event`, {
			body: JSON.stringify(body),
			headers,
			method,
		})

		// Handle non-JSON responses
		let responseBody: any = {}
		const contentType = response.headers.get('content-type')

		if (contentType?.includes('application/json')) {
			try {
				responseBody = await response.json()
			} catch (error) {
				logger.warn('Failed to parse Plausible response as JSON', { error })
			}
		} else {
			// For non-JSON responses, just pass through the status
			responseBody = { status: response.status }
		}

		return new Response(JSON.stringify(responseBody), {
			headers: { 'Content-Type': 'application/json' },
			status: response.status,
			statusText: response.statusText,
		})
	} catch (error) {
		logger.error('Failed to forward event to Plausible', { error })
		return new Response(JSON.stringify({ error: 'Failed to send analytics event' }), {
			headers: { 'Content-Type': 'application/json' },
			status: 500,
		})
	}
}
