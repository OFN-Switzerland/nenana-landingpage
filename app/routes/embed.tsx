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

import { Button } from '~/components/ui/button.tsx'
import { getUserPreferences } from '~/lib/cookies/store-selection/get-user-preferences.tsx'
import { ErrorBoundaryShared } from '~/services/error-boundary-shared.tsx'

import { type Route as RootRoute } from '../../.react-router/types/app/+types/root.ts'

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const preferences = await getUserPreferences(request)
	let headers = new Headers()

	if (!preferences) {
		return redirect(href('/'))
	}

	return data(
		{
			...preferences,
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
				<Button onClick={onGoToSelection} size="xs" type="button">
					{t('userActions.goToSelection', 'Go to selection')}
				</Button>
			</div>
			<iframe className="grow" src={loaderData.preferences.storeRedirectUrl} />
		</div>
	)
}

export function ErrorBoundary(args: RootRoute.ErrorBoundaryProps) {
	return ErrorBoundaryShared(args)
}
