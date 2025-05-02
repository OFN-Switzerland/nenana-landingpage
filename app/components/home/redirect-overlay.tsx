import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouteLoaderData } from 'react-router'
import { H3 } from '~/components/typography/h3.tsx'
import { P } from '~/components/typography/p.tsx'
import { Button } from '~/components/ui/button.tsx'
import { logger } from '~/lib/logger.ts'
import { type HomeRouteLoaderData } from '~/routes/home.tsx'

const COUNTDOWN = 4

export const RedirectOverlay = () => {
	const loaderData = useRouteLoaderData<HomeRouteLoaderData>('routes/home')
	const [timeLeft, setTimeLeft] = useState<number>(COUNTDOWN)
	const { t } = useTranslation()
	const dialogRef = useRef<HTMLDialogElement>(null)

	const openDialog = () => {
		dialogRef.current?.showModal()
	}

	useEffect(() => {
		logger.debug({ loaderData })
		if (loaderData?.isValidPreferences) {
			openDialog()
			setTimeLeft(COUNTDOWN)
		}
	}, [loaderData])

	useEffect(() => {
		if (!dialogRef.current?.open) return

		const intervalId = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev === 0) return 0
				if (prev <= 1) {
					clearInterval(intervalId)
					return 0
				}
				return prev - 1
			})
		}, 1000)

		return () => clearInterval(intervalId)
	}, [dialogRef.current?.open])

	useEffect(() => {
		// Don't redirect in dev
		if (window.ENV.NODE_ENV === 'development') {
			dialogRef.current?.close()
			return
		}
		if (dialogRef.current?.open && timeLeft === 0 && loaderData?.storeRedirectUrl) {
			window.location.href = loaderData?.storeRedirectUrl
			dialogRef.current?.close()
		}
	}, [loaderData?.storeRedirectUrl, timeLeft])

	const onCancelClick = () => {
		dialogRef.current?.close()
	}

	return (
		<>
			<dialog ref={dialogRef} className="modal modal-bottom sm:modal-middle">
				<div className="modal-box">
					<progress className="progress w-full" value={timeLeft} max={COUNTDOWN}></progress>
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
