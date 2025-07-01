import { InfoIcon } from 'lucide-react'
import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import {
	data,
	href,
	type LoaderFunctionArgs,
	type MetaFunction,
	redirect,
	useLoaderData,
} from 'react-router'

import { SelectedStore } from '~/components/store-selection/selected-store.tsx'
import { StoreInfoDisplay } from '~/components/store-selection/store-info-display.tsx'
import { H1 } from '~/components/typography/h1.tsx'
import { H3 } from '~/components/typography/h3.tsx'
import { P } from '~/components/typography/p.tsx'
import { Alert } from '~/components/ui/alert.tsx'
import { getUserPreferences } from '~/lib/cookies/store-selection/get-user-preferences.tsx'
import { getInstance } from '~/middleware/i18next.ts'
import { ErrorBoundaryShared } from '~/services/error-boundary-shared.tsx'

import { type Route as RootRoute } from '../../.react-router/types/app/+types/root.ts'

export const loader = async ({ context, request }: LoaderFunctionArgs) => {
	const { t } = getInstance(context)
	const preferences = await getUserPreferences(request)

	if (!preferences || !preferences.preferences.storeId) {
		return redirect(href('/'))
	}

	return data({
		...preferences,
		description: t(
			'routes.register.description',
			'Register for a NeNaNa account to access an OFN store directly via this website.',
		),
		title: t('routes.register.title', 'NeNaNa - Registration'),
	})
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	return [
		{ title: data?.title },
		{
			content: data?.description,
			name: 'description',
		},
	]
}

export function ErrorBoundary(args: RootRoute.ErrorBoundaryProps) {
	return ErrorBoundaryShared(args)
}

export default function RegistrationPending() {
	const { t } = useTranslation()
	const loaderData = useLoaderData<typeof loader>()

	return (
		<>
			<H1 className="card-title">
				{t('registrationPending.title', 'Your registration is pending')}
			</H1>
			<SelectedStore />
			<Alert>
				<div className="flex flex-col items-start gap-3">
					<div className="flex items-center gap-3">
						<InfoIcon size={32} />{' '}
						<H3>{t('registrationPending.box.title', 'Registration already sent')}</H3>
					</div>
					<P>
						<Trans i18nKey="registrationPending.box.p1">
							You have already registered with NeNaNa. Please check your email for instructions on
							how to complete your registration. Please do not register again, instead, if you think
							something went wrong, contact the hub's manager.
						</Trans>
					</P>
					{loaderData.selectedStore && <StoreInfoDisplay data={loaderData.selectedStore} />}
				</div>
			</Alert>
		</>
	)
}
