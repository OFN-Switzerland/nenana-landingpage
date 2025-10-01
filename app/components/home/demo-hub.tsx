import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { P } from '~/components/typography/p.tsx'
import { Button } from '~/components/ui/button.tsx'
import { Alert } from '~/components/ui/alert.tsx'

export const DemoHub = () => {
	const { t } = useTranslation()
	return (
		<Alert>
		<div className="flex flex-col items-center space-y-2">
			<P className="text-center">
					{t(
						'home.info.demo.demoInstructions'
					)}
				</P>

			<div className="flex flex-col items-center space-y-2">
				<Link to="https://app.openfoodswitzerland.ch/demo-hub-appenzell/shop#/shop_panel">
					<Button>{t('home.info.demo.button', 'Open Demo Shop')}</Button>
				</Link>
				<P className="text-center">
					{t(
						'home.info.demo.description',
						"Browse our demo hub without registering and discover which products you can buy at Ne'Na'Na.",
					)}
				</P>
			</div>
		</div>
		</Alert>
	)
}
