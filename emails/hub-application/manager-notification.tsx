import { createTranslator } from '@hyperse/translator'
import { Column, Container, Row, Section, Text } from '@react-email/components'
import * as React from 'react'
import { useMemo } from 'react'

import { Footer } from '../fragments/footer.tsx'
import { Header } from '../fragments/header.tsx'
import { MailBody } from '../fragments/mail-body.tsx'
import {
	container,
	dataTable,
	dataTableCell,
	dataTableLabelCell,
	dataTableLastRow,
	dataTableRow,
	heading,
	paragraph,
	section,
} from '../styles/styles.ts'

const messages = {
	de: {
		body: 'Eine neue Registrierung wurde eingereicht. Hier sind die Details:',
		customerDetails: 'Kundendetails',
		directLink: 'https://box.nenana.ch',
		directLinkText: 'Zur Ne'Na'Na Box',
		email: 'E-Mail',
		footer: 'Eine Dienstleistung von Ne'Na'Na - Netzwerk Natürliche Nahrung',
		footerLink: 'https://nenana.ch',
		hub: 'Hub',
		hubId: 'Hub ID',
		instructions:
			'Bitte bearbeiten Sie diese Anfrage und erstellen Sie einen Kunden-Account auf Open Food Network. Nehmen Sie bitte anschliessend Kontakt mit dem Kunden auf, um die Registrierung zu bestätigen, sobald die nötigen Schritte erledigt wurden.',
		logoText: 'Ne'Na'Na Box',
		name: 'Name',
		noNotifications: 'Keine Benachrichtigungen',
		notifications: 'Benachrichtigungen',
		notificationsByEmail: 'E-Mail',
		notificationsByTelegram: 'Telegram',
		phone: 'Telefon',
		preview: 'Neue Kundenregistrierung erhalten',
		title: 'Neue Ne'Na'Na Box Registrierung',
	},
	en: {
		body: 'A new registration has been submitted. Here are the details:',
		customerDetails: 'Customer Details',
		directLink: 'https://box.nenana.ch',
		directLinkText: 'To NeNaNa Box',
		email: 'Email',
		footer: 'A service from NeNaNa - Netzwerk Natürliche Nahrung (Natural Nutrition Network)',
		footerLink: 'https://nenana.ch',
		hub: 'Hub',
		hubId: 'Hub ID',
		instructions:
			'Please handle this request and create a customer account on OpenFoodNetwork. Please get in touch with the customer to confirm the registration, once the necessary steps have been completed.',
		logoText: 'NeNaNa Box',
		name: 'Name',
		noNotifications: 'No notifications',
		notifications: 'Notifications',
		notificationsByEmail: 'Email',
		notificationsByTelegram: 'Telegram',
		phone: 'Phone',
		preview: 'New customer registration received',
		title: 'New NeNaNa Box Registration',
	},
}

const baseUrl = process.env.ORIGIN ? process.env.ORIGIN : 'https://box.nenana.ch'

type Props = {
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
}

export const ManagerNotification = ({ customerData, hubData, languageCode = 'en' }: Props) => {
	const t = createTranslator({
		locale: languageCode,
		messages,
		namespace: languageCode as 'en',
	})

	const notificationsBy = useMemo(() => {
		const notifications = []
		if (customerData.notificationsByEmail) {
			notifications.push(t('notificationsByEmail'))
		}
		if (customerData.notificationsByTelegram) {
			notifications.push(t('notificationsByTelegram'))
		}
		if (notifications.length === 0) {
			return t('noNotifications')
		}
		return notifications.join(', ')
	}, [customerData.notificationsByEmail, customerData.notificationsByTelegram, t])

	return (
		<MailBody languageCode={languageCode} previewText={t('preview')}>
			<Container style={{ ...container, paddingTop: '0' }}>
				<Header baseUrl={baseUrl} logoText={t('logoText')} />
				<Section style={section}>
					<Text style={heading}>{t('title')}</Text>
					<Text style={paragraph}>{t('body')}</Text>
					<Text style={{ ...paragraph, fontWeight: 'bold', marginTop: '20px' }}>
						{t('customerDetails')}
					</Text>
					<Section style={dataTable}>
						<Row style={dataTableRow}>
							<Column style={dataTableLabelCell}>
								<Text style={{ ...paragraph, fontWeight: 'bold', margin: 0 }}>{t('name')}</Text>
							</Column>
							<Column style={dataTableCell}>
								<Text style={{ ...paragraph, margin: 0 }}>{customerData.name}</Text>
							</Column>
						</Row>
						<Row style={dataTableRow}>
							<Column style={dataTableLabelCell}>
								<Text style={{ ...paragraph, fontWeight: 'bold', margin: 0 }}>{t('email')}</Text>
							</Column>
							<Column style={dataTableCell}>
								<Text style={{ ...paragraph, margin: 0 }}>{customerData.email}</Text>
							</Column>
						</Row>
						<Row style={dataTableRow}>
							<Column style={dataTableLabelCell}>
								<Text style={{ ...paragraph, fontWeight: 'bold', margin: 0 }}>{t('phone')}</Text>
							</Column>
							<Column style={dataTableCell}>
								<Text style={{ ...paragraph, margin: 0 }}>{customerData.phone}</Text>
							</Column>
						</Row>
						<Row style={dataTableRow}>
							<Column style={dataTableLabelCell}>
								<Text style={{ ...paragraph, fontWeight: 'bold', margin: 0 }}>
									{t('notifications')}
								</Text>
							</Column>
							<Column style={dataTableCell}>{notificationsBy}</Column>
						</Row>
						<Row style={dataTableRow}>
							<Column style={dataTableLabelCell}>
								<Text style={{ ...paragraph, fontWeight: 'bold', margin: 0 }}>{t('hub')}</Text>
							</Column>
							<Column style={dataTableCell}>
								<Text style={{ ...paragraph, margin: 0 }}>{hubData.name}</Text>
							</Column>
						</Row>
						<Row style={dataTableLastRow}>
							<Column style={dataTableLabelCell}>
								<Text style={{ ...paragraph, fontWeight: 'bold', margin: 0 }}>{t('hubId')}</Text>
							</Column>
							<Column style={dataTableCell}>
								<Text style={{ ...paragraph, margin: 0 }}>{hubData.id}</Text>
							</Column>
						</Row>
					</Section>

					<Text style={{ ...paragraph, marginTop: '20px' }}>{t('instructions')}</Text>
				</Section>
				<Footer url={t('footerLink')} urlText={t('footer')} />
			</Container>
		</MailBody>
	)
}

ManagerNotification.PreviewProps = {
	customerData: {
		email: 'a@b.c',
		name: 'John Doe',
		notificationsByEmail: true,
		notificationsByTelegram: false,
		phone: '+49 123 4567890',
	},
	hubData: {
		id: '1234',
		name: 'My Hub',
	},
	languageCode: 'de',
} as Props

export default ManagerNotification
