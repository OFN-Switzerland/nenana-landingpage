import { cacheHeader } from 'pretty-cache-header'
import { data } from 'react-router'
import { z } from 'zod'

import { i18nConfig } from '~/i18n-config.ts'
import { logger } from '~/lib/logger.ts'

import { type Route } from '../../../.react-router/types/app/routes/api/+types/locales.ts'

const resources = i18nConfig.resources

export async function loader({ params }: Route.LoaderArgs) {
	const lng = z
		.string()
		.refine((lng) => Object.keys(resources).includes(lng))
		.safeParse(params.lang)

	if (lng.error) {
		logger.error(lng.error)
		return data({ error: lng.error }, { status: 400 })
	}

	const namespaces = (resources as any)[lng.data] as Record<string, any>

	const ns = z
		.string()
		.refine((ns): ns is string => {
			return Object.keys(namespaces).includes(ns)
		})
		.safeParse(params.ns)

	if (ns.error) {
		logger.error(ns.error)
		return data({ error: ns.error }, { status: 400 })
	}

	const headers = new Headers()

	// On production, we want to add cache headers to the response
	if (process.env.NODE_ENV === 'production') {
		headers.set(
			'Cache-Control',
			cacheHeader({
				maxAge: '5m', // Cache in the browser for 5 minutes
				sMaxage: '1d', // Cache in the CDN for 1 day
				// Serve stale content if there's an error for 7 days
				staleIfError: '7d',
				// Serve stale content while revalidating for 7 days
				staleWhileRevalidate: '7d',
			}),
		)
	}

	return data(namespaces[ns.data], { headers })
}
