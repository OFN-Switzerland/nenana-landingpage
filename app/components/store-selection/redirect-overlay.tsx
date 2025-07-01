import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouteLoaderData } from 'react-router'

import { H2 } from '~/components/typography/h2.tsx'
import { P } from '~/components/typography/p.tsx'
import { Button } from '~/components/ui/button.tsx'
import { logger } from '~/lib/logger.ts'
import { type RootRouteLoaderData } from '~/root.tsx'

const COUNTDOWN_SECONDS = 4
const ANIMATION_INTERVAL_MS = 50 // Update every 50ms for smooth animation

export const RedirectOverlay = () => {
	const loaderData = useRouteLoaderData<RootRouteLoaderData>('root')
	const [progress, setProgress] = useState<number>(COUNTDOWN_SECONDS)
	const { t } = useTranslation()
	const dialogRef = useRef<HTMLDialogElement>(null)

	// Simplify by deriving both values in one memo
	const { redirectUrl, shouldRedirect } = useMemo(
		() => ({
			redirectUrl: loaderData?.preferences?.storeRedirectUrl,
			shouldRedirect:
				loaderData?.isValidPreferences && Boolean(loaderData?.preferences?.storeRedirectUrl),
		}),
		[loaderData],
	)

	// Single effect to handle dialog opening
	useEffect(() => {
		if (!shouldRedirect || !dialogRef.current) return

		// Only open if not already open
		if (!dialogRef.current.open) {
			logger.debug({ message: 'Opening redirect dialog' })
			dialogRef.current.showModal()
			setProgress(COUNTDOWN_SECONDS)
		}
	}, [shouldRedirect])

	// Countdown effect
	useEffect(() => {
		if (!dialogRef.current?.open) return

		const timer = setInterval(() => {
			setProgress((prev) => {
				return Math.max(0, prev - ANIMATION_INTERVAL_MS / 1000)
			})
		}, ANIMATION_INTERVAL_MS)

		return () => clearInterval(timer)
	}, [])

	// Redirect effect when countdown completes
	useEffect(() => {
		if (dialogRef.current?.open && progress === 0 && redirectUrl) {
			if (window.ENV?.NODE_ENV === 'development') {
				dialogRef.current?.close()
				return
			}

			window.location.href = redirectUrl
			dialogRef.current?.close()
		}
	}, [redirectUrl, progress])

	const onCancelClick = () => {
		dialogRef.current?.close()
	}

	const progressPercentage = Math.max(0, Math.min(100, (progress / COUNTDOWN_SECONDS) * 100))

	return (
		<dialog className="modal modal-bottom sm:modal-middle" ref={dialogRef}>
			<div className="modal-box">
				<H2>
					{t('redirecting.title', 'Redirecting...')} {`${Math.ceil(progress)}`}
				</H2>
				<P>
					{t(
						'redirecting.description',
						'You will be redirected to the new page in a few seconds. Click cancel or press Esc to choose another pick-up location',
					)}
				</P>
				<div className="mt-4 mb-4 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
					<div
						className="bg-primary h-2.5 rounded-full dark:bg-blue-500"
						style={{ width: `${progressPercentage}%` }}
					/>
				</div>
				<div className="modal-action">
					<Button onClick={onCancelClick} type="button">
						{t('actions.cancel', 'Cancel')}
					</Button>
				</div>
			</div>
		</dialog>
	)
}
