import { toNumber } from 'lodash-es'
import React from 'react'
import {
	data,
	href,
	type LoaderFunctionArgs,
	type MetaFunction,
	redirect,
	useRouteLoaderData,
} from 'react-router'
import { ClientOnly } from 'remix-utils/client-only'

import { DemoHub } from '~/components/home/demo-hub.tsx'
import { HomeInfo } from '~/components/home/info.tsx'
import { PwaInstallClient } from '~/components/pwa/pwa-install.client.tsx'
import { RedirectOverlay } from '~/components/store-selection/redirect-overlay.tsx'
import { SelectedStore } from '~/components/store-selection/selected-store.tsx'
import { StoreSelection } from '~/components/store-selection/store-selection.tsx'
import { getUserPreferences } from '~/lib/cookies/store-selection/get-user-preferences.tsx'
import { userPreferencesCookie } from '~/lib/cookies/store-selection/store-selection-cookie.server.ts'
import { StoreSelectionStatus } from '~/lib/cookies/store-selection/store-selection-status.ts'
import { getInstance } from '~/middleware/i18next.ts'
import { type RootRouteLoaderData } from '~/root.tsx'
import { type StoreData } from '~/schemas/store-location-schema.ts'
import { ErrorBoundaryShared } from '~/services/error-boundary-shared.tsx'
import { getStoreLocationData } from '~/services/get-store-location-data.ts'

import { type Route as RootRoute } from '../../.react-router/types/app/+types/root.ts'
import { type Route } from './+types/home.ts'

/**
 * Route Loader: Retrieves the store data based on the cookie or sets defaults
 * @param context
 * @param request
 */
export const loader = async ({ context, request }: LoaderFunctionArgs) => {
	const { language: lang, t } = getInstance(context as any)
	const userPreferences = await getUserPreferences(request)

	if (
		userPreferences.preferences.storeSelectionStatus === StoreSelectionStatus.registration_pending
	) {
		return redirect(href('/:lang/registration/pending', { lang }))
	}

	return data({
		description: t(
			'routes.home.description',
			'Choose a store to be forwarded to the next time you visit this site',
		),
		title: t('routes.home.title', "Ne'Na'Na"),
	})
}

export type HomeRouteLoaderData = typeof loader

/**
 * Route Action: Updates the cookie with the selected store
 * @param request
 */
export async function action({ context, request }: Route.ActionArgs) {
	const { language: lang } = getInstance(context as any)
	const cookieHeader = request.headers.get('Cookie')
	const userPrefsCookie = (await userPreferencesCookie.parse(cookieHeader)) || {}
	const bodyParams = await request.formData()
	const selectedStoreId = toNumber(bodyParams.get('selectedStoreId')) || undefined
	const storeData = await getStoreLocationData()

	if (selectedStoreId) {
		const { stores } = storeData as StoreData
		const selectedStore = stores.find((store) => store.id === selectedStoreId)
		userPrefsCookie.storeRedirectUrl = selectedStore?.forwardUrl
		userPrefsCookie.storeId = selectedStoreId.toString()
		userPrefsCookie.storeVersionDate = storeData.date
		userPrefsCookie.storeSelectionStatus = StoreSelectionStatus.registration_started
	}

	let pathname = new URL(request.url).pathname

	if (userPrefsCookie.storeSelectionStatus === StoreSelectionStatus.registration_started) {
		pathname = href('/:lang/registration', { lang })
	}

	return redirect(pathname, {
		headers: {
			'Set-Cookie': await userPreferencesCookie.serialize(userPrefsCookie),
		},
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

export default function Home() {
	const loaderData = useRouteLoaderData<RootRouteLoaderData>('root')
	return (
		<>
			{loaderData?.preferences?.storeRedirectUrl ? <SelectedStore /> : <HomeInfo />}
			<ClientOnly>{() => <PwaInstallClient />}</ClientOnly>
			<div className="w-full max-w-3xl px-3 md:px-0">
				<StoreSelection />
			</div>
			{loaderData?.isValidPreferences &&
				loaderData?.preferences?.storeRedirectUrl &&
				loaderData?.preferences?.storeSelectionStatus === StoreSelectionStatus.registration_completed && (
				<RedirectOverlay />
			)}
			<DemoHub />
		</>
	)
}
