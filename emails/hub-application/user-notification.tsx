import { createTranslator } from '@hyperse/translator'
import { Button, Container, Section, Text } from '@react-email/components'
import * as React from 'react'

import { type HubApplicationEmailsOptions } from '~/lib/mails/hub-application.tsx'

import { Footer } from '../fragments/footer.tsx'
import { Header } from '../fragments/header.tsx'
import { MailBody } from '../fragments/mail-body.tsx'
import { button, container, heading, paragraph, section } from '../styles/styles.ts'

const messages = {
	de: {
		body: 'Vielen Dank für die Registrierung. Wir werden uns so schnell wie möglich bei Ihnen melden. Sobald Sie von uns Bescheid erhalten, können Sie über unsere Web-App direkt auf den Hub zugreifen.',
		directLink: 'https://box.nenana.ch',
		directLinkText: 'Zur Ne'Na'Na Box',
		footer: 'Eine Dienstleistung von Ne'Na'Na - Netzwerk Natürliche Nahrung',
		footerLink: 'https://nenana.ch',
		greeting: 'Hallo',
		logoText: 'Ne'Na'Na Box',
		preview: 'Registrationsformular abgesendet',
		title: 'Ne'Na'Na Box Registrierung in Bearbeitung',
	},
	en: {
		body: 'Thank you for registering. We will get back to you as soon as possible. Once we get in touch with you, you can access our web app directly on the hub.',
		directLink: 'https://box.nenana.ch',
		directLinkText: 'To your Ne'Na'Na Box',
		footer: 'A service from Ne'Na'Na - Netzwerk Natürliche Nahrung',
		footerLink: 'https://nenana.ch',
		greeting: 'Hi',
		logoText: 'Ne'Na'Na Box',
		preview: 'Registration form submitted',
		title: 'Ne'Na'Na Box Registration in Progress',
	},
}

const baseUrl = process.env.ORIGIN ? process.env.ORIGIN : 'https://box.nenana.ch'

type Props = {
	customerData: HubApplicationEmailsOptions['customerData']
	languageCode: 'de' | 'en' | string
}

export const UserNotification = (props: Props) => {
	const { customerData, languageCode = 'en' } = props

	const t = createTranslator({
		locale: languageCode,
		messages,
		namespace: languageCode as 'en',
	})

	return (
		<MailBody languageCode={languageCode} previewText={t('preview')}>
			<Container style={{ ...container, paddingTop: '0' }}>
				<Header baseUrl={baseUrl} logoText={t('logoText')} />
				<Section style={section}>
					<Text style={heading}>{t('title')}</Text>
					<Text style={paragraph}>
						{t('greeting')} {customerData.name},
					</Text>
					<Text style={paragraph}>{t('body')}</Text>
					<Button href={t('directLink')} style={button}>
						{t('directLinkText')}
					</Button>
				</Section>
				<Footer url={t('footerLink')} urlText={t('footer')} />
			</Container>
		</MailBody>
	)
}

UserNotification.PreviewProps = {
	customerData: {
		email: 'a@b.c',
		name: 'John Doe',
		phone: '+49 123 4567890',
	},
	languageCode: 'de',
} as Props

export default UserNotification
