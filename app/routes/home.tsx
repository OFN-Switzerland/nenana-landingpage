import { toNumber } from 'lodash-es'
import React from 'react'
import {
	data,
	type LoaderFunctionArgs,
	type MetaFunction,
	redirect,
	useLoaderData,
} from 'react-router'
import { ClientOnly } from 'remix-utils/client-only'
import { type Route as RootRoute } from '../../.react-router/types/app/+types/root.ts'
import { type Route } from './+types/home.ts'
import { HomeHero } from '~/components/home/hero.tsx'
import { HomeInfo } from '~/components/home/info.tsx'
import { Footer } from '~/components/layout/footer.tsx'
import { PwaInstallClient } from '~/components/pwa/pwa-install.client.tsx'
import { RedirectOverlay } from '~/components/store-selection/redirect-overlay.tsx'
import { SelectedStore } from '~/components/store-selection/selected-store.tsx'
import { StoreSelection } from '~/components/store-selection/store-selection.tsx'
import i18nextServer from '~/i18next.server.ts'
import { logger } from '~/lib/logger.ts'
import { type StoreData } from '~/schemas/store-location-schema.ts'
import userPreferencesCookieSchema, {
	type UserPreferencesCookie,
	userPreferencesCookie,
} from '~/services/cookies/store-selection-cookie.server.ts'
import { ErrorBoundaryShared } from '~/services/error-boundary-shared.tsx'
import { getStoreLocationData } from '~/services/get-store-location-data.ts'

export const loader = async ({ request }: LoaderFunctionArgs) => {
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

	logger.debug({ userPrefsCookie, isValidPreferences })

	if (!isValidPreferences) {
		userPrefsCookie.storeRedirectUrl = ''
		userPrefsCookie.storeId = ''
		userPrefsCookie.storeVersionDate = storeData.date
		headers.append('Set-Cookie', await userPreferencesCookie.serialize(userPrefsCookie))
	}

	return data(
		{
			...userPrefsCookie,
			isValidPreferences,
			storeData,
			title: t('routes.home.title', 'NeNaNa'),
			description: t(
				'routes.home.description',
				'Choose a store to be forwarded to the next time you visit this site',
			),
		},
		{ headers },
	)
}

export type HomeRouteLoaderData = typeof loader

export async function action({ request }: Route.ActionArgs) {
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
	}

	const pathname = new URL(request.url).pathname

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
			name: 'description',
			content: data?.description,
		},
	]
}

export default function Home() {
	const loaderData = useLoaderData<HomeRouteLoaderData>()
	return (
		<div className="flex grow flex-col items-center gap-8 pb-8">
			<HomeHero />
			<div className="flex w-full max-w-3xl flex-col items-center gap-8 px-3 md:px-0">
				{loaderData?.storeRedirectUrl ? (
					<SelectedStore
						storeId={loaderData.storeId}
						storeRedirectUrl={loaderData.storeRedirectUrl}
						stores={loaderData.storeData?.stores || []}
					/>
				) : (
					<HomeInfo />
				)}
				<ClientOnly>{() => <PwaInstallClient />}</ClientOnly>
			</div>
			<div className="w-full max-w-3xl px-3 md:px-0">
				<StoreSelection />
			</div>
			{loaderData?.isValidPreferences && loaderData?.storeRedirectUrl && <RedirectOverlay />}
			<Footer />
		</div>
	)
}

export function ErrorBoundary(args: RootRoute.ErrorBoundaryProps) {
	return ErrorBoundaryShared(args)
}
