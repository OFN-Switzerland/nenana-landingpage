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
		body: 'Schön, bist du bei uns dabei! Wir freuen uns sehr, dass du Teil von unserer Community wirst. Tritt doch auch gleich unserer Telegram-Gruppe bei – hier erhältst du Informationen zu neuen Produkten, News aus dem Netzwerk, sowie Erinnerungen deine Bestellung vor Ablauf des Bestellzykluses aufzugeben.',
		directLink: 'https://t.me/+afF7DYwrbaoxZWU0',
		directLinkText: 'Telegram Gruppe beitreten',
		footer: "Eine Dienstleistung von Ne'Na'Na - Netzwerk Natürliche Nahrung",
		footerLink: 'https://nenana.ch',
		greeting: 'Hallo',
		logoText: "Ne'Na'Na Box",
		preview: 'Registrationsformular abgesendet',
		title: "Ne'Na'Na Box Registrierung",
	},
	en: {
		body: "Great, you're with us! We are very happy that you are becoming part of our community. Why not join our Telegram group right away? Here you will receive information about new products, news from the network, and reminders to place your order before the end of the order cycle.",
		directLink: 'https://t.me/+afF7DYwrbaoxZWU0',
		directLinkText: 'Join Telegram Group',
		footer: "A service from Ne'Na'Na - Netzwerk Natürliche Nahrung",
		footerLink: 'https://nenana.ch',
		greeting: 'Hi',
		logoText: "Ne'Na'Na Box",
		preview: 'Registration',
		title: "Ne'Na'Na Box Registration in Progress",
	},
}

const baseUrl = process.env.ORIGIN ? process.env.ORIGIN : 'https://box.nenana.ch'

type Props = {
	customerData: HubApplicationEmailsOptions['customerData']
	languageCode: 'de' | 'en' | string
}

export const UserNotificationHasTelegram = (props: Props) => {
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

UserNotificationHasTelegram.PreviewProps = {
	customerData: {
		email: 'a@b.c',
		name: 'John Doe',
		phone: '+49 123 4567890',
	},
	languageCode: 'de',
} as Props

export default UserNotificationHasTelegram
