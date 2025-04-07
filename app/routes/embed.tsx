import React from 'react'
import { useTranslation } from 'react-i18next'
import {
	data,
	href,
	type LoaderFunctionArgs,
	redirect,
	useLoaderData,
	useNavigate,
} from 'react-router'
import { type Route as RootRoute } from '../../.react-router/types/app/+types/root.ts'
import { Button } from '~/components/ui/button.tsx'
import userPreferencesCookieSchema, {
	type UserPreferencesCookie,
	userPreferencesCookie,
} from '~/services/cookies/store-selection-cookie.server.ts'
import { ErrorBoundaryShared } from '~/services/error-boundary-shared.tsx'
import { getStoreLocationData } from '~/services/get-store-location-data.ts'

export const loader = async ({ request }: LoaderFunctionArgs) => {
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
		<div className="flex size-full grow flex-col">
			<div className="bg-primary">
				<Button type="button" onClick={onGoToSelection} size="xs">
					{t('userActions.goToSelection', 'Go to selection')}
				</Button>
			</div>
			<iframe className="grow" src={loaderData.storeRedirectUrl} />
		</div>
	)
}

export function ErrorBoundary(args: RootRoute.ErrorBoundaryProps) {
	return ErrorBoundaryShared(args)
}
