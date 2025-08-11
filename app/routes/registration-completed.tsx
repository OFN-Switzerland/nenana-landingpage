import React from 'react'
import { href, type LoaderFunctionArgs, redirect } from 'react-router'

import { Spinner } from '~/components/ui/spinner.tsx'
import { getUserPreferences } from '~/lib/cookies/store-selection/get-user-preferences.tsx'
import { userPreferencesCookie } from '~/lib/cookies/store-selection/store-selection-cookie.server.ts'
import { StoreSelectionStatus } from '~/lib/cookies/store-selection/store-selection-status.ts'
import { ErrorBoundaryShared } from '~/services/error-boundary-shared.tsx'

import { type Route as RootRoute } from '../../.react-router/types/app/+types/root.ts'

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const preferences = await getUserPreferences(request)

	if (!preferences || !preferences.preferences.storeId) {
		return redirect(href('/'))
	}

	return redirect(href('/'), {
		headers: {
			'Set-Cookie': await userPreferencesCookie.serialize({
				...preferences.preferences,
				storeSelectionStatus: StoreSelectionStatus.registration_completed,
			}),
		},
	})
}

export function ErrorBoundary(args: RootRoute.ErrorBoundaryProps) {
	return ErrorBoundaryShared(args)
}

export default function RegistrationCompleted() {
	return (
		<>
			<Spinner />
		</>
	)
}
