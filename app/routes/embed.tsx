import { data, href, LoaderFunctionArgs, redirect, useLoaderData, useNavigate } from 'react-router'
import React from 'react'
import { ErrorBoundaryShared } from '~/services/error-boundary-shared.tsx'
import { Route as RootRoute } from '../../.react-router/types/app/+types/root.ts'
import userPreferencesCookieSchema, {
	UserPreferencesCookie,
	userPreferencesCookie,
} from '~/services/cookies/store-selection-cookie.server.ts'
import i18nextServer from '~/i18next.server.ts'
import { getStoreLocationData } from '~/services/get-store-location-data.ts'
import { Button } from '~/components/ui/button.tsx'
import { useTranslation } from 'react-i18next'

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
	const t = await i18nextServer.getFixedT(request)
	const cookieHeader = request.headers.get('Cookie')
	const userPrefsCookie = ((await userPreferencesCookie.parse(cookieHeader)) || {
		storeRedirectUrl: '',
		storeId: '',
		storeVersionDate: '',
	}) as UserPreferencesCookie
	const storeData = await getStoreLocationData()
	let headers = new Headers()

	const isValidPreferences =
		userPreferencesCookieSchema.safeParse(userPrefsCookie).success &&
		userPrefsCookie.storeVersionDate === storeData.date

	if (!isValidPreferences) {
		return redirect(href('/'))
	}

	return data(
		{
			...userPrefsCookie,
			isValidPreferences,
		},
		{ headers },
	)
}

export type EmbedRouteLoaderData = typeof loader

export default function Embed() {
	const loaderData = useLoaderData<EmbedRouteLoaderData>()
	const { t } = useTranslation()
	const navigate = useNavigate()

	const onGoToSelection = async () => {
		await navigate(href('/'))
	}
	return (
		<div className={'flex size-full grow flex-col'}>
			<div className={'bg-primary'}>
				<Button type={'button'} onClick={onGoToSelection} size={'xs'}>
					{t('userActions.goToSelection', 'Go to selection')}
				</Button>
			</div>
			<iframe className={'grow'} src={loaderData.storeRedirectUrl} />
		</div>
	)
}

export function ErrorBoundary(args: RootRoute.ErrorBoundaryProps) {
	return ErrorBoundaryShared(args)
}
