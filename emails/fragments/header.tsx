import { Column, Img, Row, Section, Text } from '@react-email/components'
import * as React from 'react'

import { header, headerLogo, headerLogoSize, headerTitle } from '../styles/styles.ts'

type Props = {
	baseUrl: string
	logoText: string
}

export const Header = ({ baseUrl, logoText }: Props) => {
	return (
		<Section style={header}>
			<Row>
				<Column>
					<Img
						height={headerLogoSize[1]}
						src={`${baseUrl}/pwa-assets/ios/128.png`}
						style={headerLogo}
						width={headerLogoSize[0]}
					/>
				</Column>
				<Column>
					<Text style={headerTitle}>{logoText}</Text>
				</Column>
			</Row>
		</Section>
	)
}
