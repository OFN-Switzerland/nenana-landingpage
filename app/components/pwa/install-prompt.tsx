import { Download, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert } from '~/components/ui/alert.tsx'
import { Button } from '~/components/ui/button.tsx'

interface BeforeInstallPromptEvent extends Event {
	prompt: () => Promise<void>
	userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const LOCAL_STORAGE_KEY = 'nenana-pwa-install-prompt-dismissed'

export const InstallPwaPrompt: React.FC = () => {
	const { t } = useTranslation()
	const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null)
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		// Check if the prompt has been dismissed
		if (typeof window !== 'undefined') {
			const isDismissed = localStorage.getItem(LOCAL_STORAGE_KEY) === 'true'
			if (isDismissed) return

			// Check if the app is already installed
			const isAppInstalled = window.matchMedia('(display-mode: standalone)').matches
			if (isAppInstalled) return
		}

		// Create handler for the beforeinstallprompt event
		const handleBeforeInstallPrompt = (e: Event) => {
			// Prevent the default browser prompt
			e.preventDefault()

			// Store the event for later use
			const promptEvent = e as BeforeInstallPromptEvent
			setInstallPrompt(promptEvent)

			// Show our custom install prompt
			setIsVisible(true)
		}

		// Add the event listener
		if (typeof window !== 'undefined') {
			window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

			return () => {
				window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
			}
		}
	}, [])

	const handleInstallClick = async () => {
		if (!installPrompt) return

		// Show the browser's install prompt
		await installPrompt.prompt()

		// Wait for the user to respond to the prompt
		const choiceResult = await installPrompt.userChoice

		if (choiceResult.outcome === 'accepted') {
			// User accepted the install prompt
			setIsVisible(false)
		}

		// Clear the saved prompt as it can only be used once
		setInstallPrompt(null)
	}

	const handleDismiss = () => {
		// Save to localStorage to remember user's choice
		if (typeof window !== 'undefined') {
			localStorage.setItem(LOCAL_STORAGE_KEY, 'true')
		}
		setIsVisible(false)
	}

	if (!isVisible) return null

	return (
		<div className="w-full max-w-3xl">
			<Alert variant="neutral" className="relative">
				<Download className="h-5 w-5" />
				<div className="flex-1">
					<h3 className="font-bold">{t('installPwa.title', 'Install App')}</h3>
					<div className="text-sm">
						{t(
							'installPwa.description',
							'Install this app on your device for quicker access and better performance.',
						)}
					</div>
					<div className="mt-2">
						<Button variant="primary" size="sm" onClick={handleInstallClick} className="mr-2">
							{t('installPwa.installButton', 'Install Now')}
						</Button>
						<Button variant="ghost" size="sm" onClick={handleDismiss}>
							{t('actions.notNow', 'Not Now')}
						</Button>
					</div>
				</div>
				<Button
					onClick={handleDismiss}
					className="absolute top-2 right-2"
					variant="ghost"
					aria-label={t('common.close', 'Close')}>
					<X size={18} />
				</Button>
			</Alert>
		</div>
	)
}
