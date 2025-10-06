import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import {
	data,
	href,
	Link,
	type LoaderFunctionArgs,
	type MetaFunction,
	redirect,
	useLoaderData,
} from 'react-router'

import { H1 } from '~/components/typography/h1.tsx'
import { P } from '~/components/typography/p.tsx'
import { Button } from '~/components/ui/button.tsx'
import { getUserPreferences } from '~/lib/cookies/store-selection/get-user-preferences.tsx'
import { userPreferencesCookie } from '~/lib/cookies/store-selection/store-selection-cookie.server.ts'
import { StoreSelectionStatus } from '~/lib/cookies/store-selection/store-selection-status.ts'
import { getInstance } from '~/middleware/i18next.ts'
import { ErrorBoundaryShared } from '~/services/error-boundary-shared.tsx'

import { type Route as RootRoute } from '../../.react-router/types/app/+types/root.ts'

export const loader = async ({ context, request }: LoaderFunctionArgs) => {
	const { t } = getInstance(context as any)
	const preferences = await getUserPreferences(request)

	if (!preferences || !preferences.preferences.storeId) {
		return redirect(href('/'))
	}

	return data(
		{
			...preferences,
			description: t(
				'routes.register.description',
				'Register with Ne\'Na\'Na to access a store directly via this website.',
			),
			title: t('routes.register.title', 'Ne\'Na\'Na Registration'),
		},
		{
			headers: {
				'Set-Cookie': await userPreferencesCookie.serialize({
					...preferences.preferences,
					storeSelectionStatus: StoreSelectionStatus.registration_pending,
				}),
			},
		},
	)
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

export default function RegistrationSent() {
	const { t } = useTranslation()
	const loaderData = useLoaderData<typeof loader>()

	return (
		<>
			<H1 className="card-title">{t('registrationSent.title', 'Your registration was sent')}</H1>
			<P>
				<Trans i18nKey="registrationSent.box.p1">
					Thank you for registering with Ne'Na'Na. Please check your email for further instructions.
					We will contact you within 1-2 business days.
				</Trans>
			</P>
			{loaderData.selectedStore?.forwardUrl ? (
				<a href={loaderData.selectedStore.forwardUrl} target="_blank" rel="noopener noreferrer">
					<Button>{t('registrationSent.box.button', 'Continue to the shop')}</Button>
				</a>
			) : (
				<Link to={href('/')}>
					<Button>{t('registrationSent.box.button', 'Continue to the shop')}</Button>
				</Link>
			)}
		</>
	)
}
