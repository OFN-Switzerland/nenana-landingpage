import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { H3 } from '~/components/typography/h3.tsx'
import { P } from '~/components/typography/p.tsx'
import { HomeRouteLoaderData } from '~/routes/home.tsx'
import { useRouteLoaderData } from 'react-router'
import { logger } from '~/lib/logger.ts'
import { Button } from '~/components/ui/button.tsx'

const COUNTDOWN = 3

export const RedirectOverlay = () => {
	const loaderData = useRouteLoaderData<HomeRouteLoaderData>('routes/home')
	const [show, setShow] = useState(false)
	const [timeLeft, setTimeLeft] = useState<number | null>(null)
	const { t } = useTranslation()

	useEffect(() => {
		logger.debug({ loaderData })
		if (loaderData?.isValidPreferences) {
			setShow(true)
			setTimeLeft(COUNTDOWN)
		}
	}, [loaderData])

	useEffect(() => {
		if (!show) return

		const intervalId = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev === null) return null
				if (prev <= 1) {
					clearInterval(intervalId)
					return 0
				}
				return prev - 1
			})
		}, 1000)

		return () => clearInterval(intervalId)
	}, [show])

	useEffect(() => {
		if (show && timeLeft === 0 && loaderData?.storeRedirectUrl) {
			window.location.href = loaderData?.storeRedirectUrl
		}
	}, [timeLeft])

	const onCancelClick = () => {
		setShow(false)
	}

	return (
		<>
			<dialog open={show} className="modal modal-bottom sm:modal-middle">
				<div className="modal-box">
					<H3>{t('redirectOverlay.title', 'Redirecting...')}</H3>
					<P>
						{t(
							'redirectOverlay.description',
							'You will be redirected to the new page in a few seconds. Click cancel or press Esc to choose another pick-up location',
						)}
					</P>
					<div className="modal-action">
						<div className={'flex flex-row items-center gap-4'}>
							<div>{timeLeft}</div>
							<Button onClick={onCancelClick}>{t('actions.cancel', 'Cancel')}</Button>
						</div>
					</div>
				</div>
			</dialog>
		</>
	)
}
