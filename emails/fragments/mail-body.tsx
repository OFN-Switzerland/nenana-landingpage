import { Body, Head, Html, Preview } from '@react-email/components'
import * as React from 'react'

import { body } from '../styles/styles.ts'

type Props = {
	children: React.ReactNode
	languageCode: string
	previewText: string
}

export const MailBody = ({ children, languageCode, previewText }: Props) => {
	return (
		<Html lang={languageCode}>
			<Head />
			<Preview>{previewText}</Preview>
			<Body style={body}>{children}</Body>
		</Html>
	)
}
