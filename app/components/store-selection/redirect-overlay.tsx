import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouteLoaderData } from 'react-router'
import { H3 } from '~/components/typography/h3.tsx'
import { P } from '~/components/typography/p.tsx'
import { Button } from '~/components/ui/button.tsx'
import { logger } from '~/lib/logger.ts'
import { type HomeRouteLoaderData } from '~/routes/home.tsx'

const COUNTDOWN_SECONDS = 4
const ANIMATION_INTERVAL_MS = 50 // Update every 50ms for smooth animation

export const RedirectOverlay = () => {
	const loaderData = useRouteLoaderData<HomeRouteLoaderData>('routes/home')
	const [progress, setProgress] = useState<number>(COUNTDOWN_SECONDS)
	const { t } = useTranslation()
	const dialogRef = useRef<HTMLDialogElement>(null)
	const [isInitialized, setIsInitialized] = useState(false)

	// Initial render effect that runs once the component is mounted
	useEffect(() => {
		if (!isInitialized && loaderData?.isValidPreferences) {
			logger.debug({ loaderData, message: 'Opening redirect dialog on initial load' })

			// Use setTimeout to ensure the dialog opens after the DOM is fully updated
			setTimeout(() => {
				if (dialogRef.current) {
					dialogRef.current.showModal()
					setProgress(COUNTDOWN_SECONDS)
				}
			}, 100)

			setIsInitialized(true)
		}
	}, [loaderData, isInitialized])

	// Effect for handling changes to loaderData after initial render
	useEffect(() => {
		if (isInitialized && loaderData?.isValidPreferences) {
			logger.debug({ loaderData, message: 'Opening redirect dialog after data change' })
			if (dialogRef.current && !dialogRef.current.open) {
				dialogRef.current.showModal()
				setProgress(COUNTDOWN_SECONDS)
			}
		}
	}, [loaderData, isInitialized])

	useEffect(() => {
		if (!dialogRef.current?.open) return

		// Calculate decrement per interval for smooth progress
		const decrementPerInterval = ANIMATION_INTERVAL_MS / 1000

		const intervalId = setInterval(() => {
			setProgress((prev) => {
				// Smoothly decrease by the calculated amount
				const newValue = Math.max(0, prev - decrementPerInterval)

				// If we've reached 0, clear the interval
				if (newValue === 0) {
					clearInterval(intervalId)
				}

				return newValue
			})
		}, ANIMATION_INTERVAL_MS)

		return () => clearInterval(intervalId)
	}, [dialogRef.current?.open])

	useEffect(() => {
		// Don't redirect in dev
		if (dialogRef.current?.open && progress === 0 && loaderData?.storeRedirectUrl) {
			if (window.ENV?.NODE_ENV === 'development') {
				dialogRef.current?.close()
				return
			}
			window.location.href = loaderData?.storeRedirectUrl
			dialogRef.current?.close()
		}
	}, [loaderData?.storeRedirectUrl, progress])

	const onCancelClick = () => {
		dialogRef.current?.close()
	}

	return (
		<>
			<dialog ref={dialogRef} className="modal modal-bottom sm:modal-middle">
				<div className="modal-box">
					<div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-gray-200">
						<div
							className="bg-primary h-full transition-all duration-100 ease-linear"
							style={{ width: `${(progress / COUNTDOWN_SECONDS) * 100}%` }}></div>
					</div>
					<H3>{t('redirectOverlay.title', 'Redirecting...')}</H3>
					<P>
						{t(
							'redirectOverlay.description',
							'You will be redirected to the new page in a few seconds. Click cancel or press Esc to choose another pick-up location',
						)}
					</P>
					<div className="modal-action">
						<Button onClick={onCancelClick}>{t('actions.cancel', 'Cancel')}</Button>
					</div>
				</div>
			</dialog>
		</>
	)
}
