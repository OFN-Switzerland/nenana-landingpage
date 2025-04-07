import { toNumber } from 'lodash-es'
import React from 'react'
import { useTranslation } from 'react-i18next'
import {
	data,
	Link,
	type LoaderFunctionArgs,
	type MetaFunction,
	redirect,
	useLoaderData,
} from 'react-router'
import { type Route as RootRoute } from '../../.react-router/types/app/+types/root.ts'
import { type Route } from './+types/home.ts'
import { HomeHero } from '~/components/home/hero.tsx'
import { InfoIosInstall } from '~/components/home/info-ios-install.tsx'
import { HomeInfo } from '~/components/home/info.tsx'
import { RedirectOverlay } from '~/components/home/redirect-overlay.tsx'
import { StoreSelection } from '~/components/home/store-selection.tsx'
import { Button } from '~/components/ui/button.tsx'
import { useIsDevice } from '~/hooks/use-is-device.tsx'
import i18nextServer from '~/i18next.server.ts'
import { logger } from '~/lib/logger.ts'
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
		const { stores } = storeData as StoreDataType
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
	const { t } = useTranslation()
	const { isIOS } = useIsDevice()
	return (
		<div className="flex grow flex-col items-center gap-8 pb-8">
			<HomeHero />
			<div className="flex flex-col items-center gap-8 px-2 md:px-0">
				<HomeInfo />
				{isIOS && <InfoIosInstall />}
			</div>
			<div className="max-w-3xl">
				<StoreSelection />
			</div>
			<Link to={loaderData.storeRedirectUrl}>
				<Button variant="primary" disabled={!loaderData.storeRedirectUrl}>
					{t('userActions.goToStore', 'Go to store')}
				</Button>
			</Link>
			{loaderData?.isValidPreferences && loaderData?.storeRedirectUrl && <RedirectOverlay />}
		</div>
	)
}

export function ErrorBoundary(args: RootRoute.ErrorBoundaryProps) {
	return ErrorBoundaryShared(args)
}
