import { InfoIcon, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert } from '~/components/ui/alert.tsx'
import { Button } from '~/components/ui/button.tsx'

const LOCAL_STORAGE_KEY = 'nenana-ios-install-alert-dismissed'

export const InfoIosInstall: React.FC = () => {
	const { t } = useTranslation()
	const [isVisible, setIsVisible] = useState(true)

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const isDismissed = localStorage.getItem(LOCAL_STORAGE_KEY) === 'true'
			setIsVisible(!isDismissed)
		}
	}, [])

	const handleDismiss = () => {
		if (typeof window !== 'undefined') {
			localStorage.setItem(LOCAL_STORAGE_KEY, 'true')
		}
		setIsVisible(false)
	}

	if (!isVisible) {
		return null
	}

	return (
		<div className="w-full max-w-3xl">
			<Alert variant="success">
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
				<Button variant="primary" onClick={handleDismiss} aria-label={t('common.close', 'Close')}>
					<X size={18} />
				</Button>
			</Alert>
		</div>
	)
}
