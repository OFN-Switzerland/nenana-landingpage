import { render } from '@react-email/render'
import React from 'react'

import ManagerNotification from '../../../emails/hub-application/manager-notification'
import UserNotification from '../../../emails/hub-application/user-notification'
import { logger } from '../logger'
import { sendMail } from './sendmail'

type Messages = {
	[lang: 'de' | 'en' | string]: {
		[key: string]: string
	}
}

const messages: Messages = {
	de: {
		mailSubjectManager: 'Neue NeNaNa Box Registrierung erhalten',
		mailSubjectUser: 'Ihre NeNaNa Box Registrierung wurde eingereicht',
	},
	en: {
		mailSubjectManager: 'New NeNaNa Box Registration Received',
		mailSubjectUser: 'Your NeNaNa Box Registration has been submitted',
	},
}

export interface HubApplicationEmailsOptions {
	customerData: {
		acceptedTerms: boolean
		email: string
		name: string
		notificationsByEmail: boolean
		notificationsByTelegram: boolean
		phone: string
	}
	hubData: {
		id: string
		name: string
	}
	languageCode: 'de' | 'en' | string
	registrationRecipientEmail: string
}

/**
 * Sends hub application confirmation emails to both the customer and hub manager
 *
 * @param options - Configuration for the emails to be sent
 * @returns Promise that resolves when both emails are sent or rejects on error
 *
 * @example
 * ```ts
 * await sendHubApplicationEmails({
 *   customerEmail: 'customer@example.com',
 *   customerName: 'Jane Doe',
 *   customerPhone: '+41 79 123 45 67',
 *   hubId: '123',
 *   hubName: 'Local Hub',
 *   languageCode: 'de',
 *   registrationRecipientEmail: 'manager@example.com'
 * })
 * ```
 */
export async function sendHubApplicationEmails({
	customerData,
	hubData,
	languageCode,
	registrationRecipientEmail,
}: HubApplicationEmailsOptions): Promise<void> {
	if (!process.env.MAIL_FROM) {
		throw new Error('MAIL_FROM environment variable is not set')
	}
	try {
		logger.debug('Preparing hub application emails', {
			customerData,
			hubData,
			registrationRecipientEmail,
		})

		// Render email templates using react-email's render function
		const userEmailHtml = await render(
			<UserNotification customerData={customerData} languageCode={languageCode} />,
		)

		const registrationRecipientEmailHtml = await render(
			<ManagerNotification
				customerData={customerData}
				hubData={hubData}
				languageCode={languageCode}
			/>,
		)

		// Send emails in parallel
		await Promise.all([
			// Send confirmation email to the customer
			sendMail({
				from: process.env.MAIL_FROM,
				html: userEmailHtml,
				replyTo: registrationRecipientEmail,
				subject: messages[languageCode]?.mailSubjectUser || '',
				to: customerData.email,
			}),

			// Send notification email to the hub manager
			sendMail({
				from: process.env.MAIL_FROM,
				html: registrationRecipientEmailHtml,
				replyTo: customerData.email,
				subject: messages[languageCode]?.mailSubjectManager || '',
				to: registrationRecipientEmail,
			}),
		])

		logger.debug('Successfully sent hub application emails', {
			customerEmail: customerData.email,
			hubId: hubData.id,
			registrationRecipientEmail,
		})
	} catch (error) {
		logger.error('Failed to send hub application emails', {
			customerEmail: customerData.email,
			error,
			hubId: hubData.id,
			registrationRecipientEmail,
		})
		throw new Error(
			`Failed to send hub application emails: ${error instanceof Error ? error.message : String(error)}`,
		)
	}
}
