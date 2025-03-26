import { useTranslation } from 'react-i18next'
import { Alert } from '~/components/ui/alert.tsx'
import { InfoIcon } from 'lucide-react'

export const InfoIosInstall: React.FC = () => {
	const { t } = useTranslation()
	return (
		<div className={'max-w-3xl'}>
			<Alert variant={'success'}>
				<InfoIcon />
				<div>
					<h3 className="font-bold">
						{t('home.infoIosInstall.title', 'You can install this website on your iPhone')}
					</h3>
					<div className="text-sm">
						{t(
							'home.infoIosInstall.description',
							'1. Tap the share button at the bottom of the browser. 2. Scroll down and tap "Add to Home Screen".',
						)}
					</div>
				</div>
			</Alert>
		</div>
	)
}
