import React from 'react'
import { useTranslation } from 'react-i18next'
import { href, Link } from 'react-router'

import { H1 } from '~/components/typography/h1.tsx'
import { P } from '~/components/typography/p.tsx'
import { Alert } from '~/components/ui/alert.tsx'
import { Button } from '~/components/ui/button.tsx'
import { ErrorBoundaryShared } from '~/services/error-boundary-shared.tsx'

import { type Route as RootRoute } from '../../.react-router/types/app/+types/root.ts'

export function ErrorBoundary(args: RootRoute.ErrorBoundaryProps) {
	return ErrorBoundaryShared(args)
}

export default function RegistrationStart() {
	const { t } = useTranslation()

	return (
		<>
			<H1 className="card-title">{t('registerStart.title', 'Already have an account?')}</H1>
			<P>
				{t(
					'registerStart.p1',
					'Registration is required in order to access the NeNaNa OpenFoodNetwork Hub. If you already have an account and received instructions from one of our hub managers (maybe you are using this app on a new device?), you can continue without another registration process and wait to be redirected to your selected hub.',
				)}
			</P>
			<Alert className="flex w-full flex-col">
				<div className="flex w-full flex-col gap-6 md:flex-row">
					<Link className="w-full" to={href('/:lang?/registration/form')}>
						<Button className="w-full">
							{t('registerStart.actions.register', 'Start registration')}
						</Button>
						<legend className="mt-2 text-center">
							{t('registerStart.actions.registerLegend', 'For new customers')}
						</legend>
					</Link>
					<Link className="w-full" to={href('/:lang?/registration/completed')}>
						<Button className="w-full" variant="outline">
							{t('registerStart.actions.continue', 'Continue without registration')}
						</Button>
						<legend className="mt-2 text-center">
							{t('registerStart.actions.continueLegend', 'For existing customers')}
						</legend>
					</Link>
				</div>
			</Alert>
		</>
	)
}
