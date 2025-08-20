import { InfoIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { P } from '~/components/typography/p.tsx'
import { Alert } from '~/components/ui/alert.tsx'
import { Button } from '~/components/ui/button.tsx'

export const HomeInfo: React.FC = () => {
	const { t } = useTranslation()
	return (
		<div className="max-w-3xl space-y-6">
			<Alert>
				<InfoIcon />
				<div>
					<h3 className="font-bold">
						{t('home.info.title', 'Choose your preferred pick-up location')}
					</h3>
					<div className="text-sm">
						{t(
							'home.info.description',
							'To make it easier and faster for you to reach your store, your chosen pick-up location will be saved and automatically selected the next time you visit this website.',
						)}
					</div>
				</div>
			</Alert>
			<div className="flex flex-col items-center space-y-2">
				<Link to="https://app.openfoodswitzerland.ch/demo-hub-appenzell/shop#/shop_panel">
					<Button>{t('home.info.demo.button', 'Open Demo Shop')}</Button>
				</Link>
				<P className="max-w-md text-center">
					{t(
						'home.info.demo.description',
						"Browse our demo hub without registering and discover which products you can buy at Ne'Na'Na.",
					)}
				</P>
			</div>
		</div>
	)
}
