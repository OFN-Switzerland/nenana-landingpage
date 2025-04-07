import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '~/components/ui/button.tsx'
import { logger } from '~/lib/logger.ts'

interface BeforeInstallPromptEvent extends Event {
	readonly platforms: string[]
	prompt(): Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export const InstallPWA = () => {
	const [supportsPWA, setSupportsPWA] = useState(false)
	const [promptInstall, setPromptInstall] = useState<BeforeInstallPromptEvent | null>(null)
	const { t } = useTranslation()

	useEffect(() => {
		const handler = (e: BeforeInstallPromptEvent) => {
			e.preventDefault()
			logger.debug('Install PWA event triggered')
			setSupportsPWA(true)
			setPromptInstall(e)
		}
		window.addEventListener('beforeinstallprompt', handler as EventListener)

		return () => window.removeEventListener('beforeinstallprompt', handler as EventListener)
	}, [])

	const onClick = async (evt: React.MouseEvent<HTMLButtonElement>) => {
		evt.preventDefault()
		if (!promptInstall) {
			return
		}
		await promptInstall.prompt()
	}

	if (!supportsPWA) {
		return null
	}

	return (
		<Button
			aria-label={t('installPwa.installApp', 'Install this app on your home screen')}
			title={t('installPwa.installApp', 'Install this app on your home screen')}
			onClick={onClick}>
			{t('installPwa.installApp', 'Install this app on your home screen')}
		</Button>
	)
}
