import type * as Mail from 'nodemailer/lib/mailer'

import nodemailer from 'nodemailer'
import sgTransport from 'nodemailer-sendgrid'

import { logger } from '../logger'

// Type definitions for the sendMail function parameters
interface SendMailOptions {
	from: string
	html: string
	replyTo: string
	subject: string
	to: string
}

/**
 * Sends a text-only email using SendGrid
 *
 * @param options - Configuration for the email to be sent
 * @returns Promise that resolves when email is sent or rejects on error
 *
 * @example
 * ```ts
 * await sendMail({
 *   to: 'recipient@example.com',
 *   subject: 'Hello',
 *   html: '<h1>Hello</h1>'
 * })
 * ```
 */
export async function sendMail({
	from = process.env.MAIL_FROM || 'noreply@nenana.ch',
	html,
	replyTo,
	subject,
	to,
}: SendMailOptions): Promise<void> {
	if (process.env.NODE_ENV !== 'production') {
		logger.debug('Sending email', { from, replyTo, subject, to })
		return
	}

	if (!process.env.SENDGRID_API_KEY) {
		throw new Error('SENDGRID_API_KEY environment variable is not set')
	}

	try {
		const transporter = nodemailer.createTransport(
			sgTransport({
				apiKey: process.env.SENDGRID_API_KEY,
			}),
		)

		const mailOptions: Mail.Options = {
			from,
			html,
			subject,
			to,
			...(replyTo ? { replyTo } : {}),
		}

		await transporter.sendMail(mailOptions)
		logger.debug(`Email sent to ${to} with subject "${subject}"`)
	} catch (error) {
		logger.error('Failed to send email', { error, subject, to })
		throw new Error(
			`Failed to send email: ${error instanceof Error ? error.message : String(error)}`,
		)
	}
}
