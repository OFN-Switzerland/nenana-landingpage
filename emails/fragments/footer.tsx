import { Hr, Section, Text } from '@react-email/components'
import * as React from 'react'

import { anchor, footer, hr, section } from '../styles/styles.ts'

type Props = {
	url: string
	urlText: string
}

export const Footer = ({ url, urlText }: Props) => {
	return (
		<Section style={section}>
			<Hr style={hr} />
			<Text style={footer}>
				<a href={url} style={anchor}>
					{urlText}
				</a>
			</Text>
		</Section>
	)
}
