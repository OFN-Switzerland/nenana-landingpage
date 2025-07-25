import { invariant } from '@epic-web/invariant'
import { useRouteLoaderData } from 'react-router'

import { type RootRouteLoaderData } from '~/root.tsx'

export function useOptionalRequestInfo() {
	const data = useRouteLoaderData<RootRouteLoaderData>('root')

	return data?.requestInfo
}

/**
 * @returns the request info from the root loader (throws an error if it does not exist)
 */
export function useRequestInfo() {
	const maybeRequestInfo = useOptionalRequestInfo()
	invariant(maybeRequestInfo, 'No requestInfo found in root loader')

	return maybeRequestInfo
}
