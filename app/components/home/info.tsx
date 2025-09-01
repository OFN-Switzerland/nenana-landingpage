import { InfoIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Alert } from '~/components/ui/alert.tsx'

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
		</div>
	)
}
