import React from 'react'
import { data, type LoaderFunctionArgs, type MetaFunction } from 'react-router'
import { type Route as RootRoute } from '../../.react-router/types/app/+types/root.ts'
import { ErrorBoundaryShared } from '~/services/error-boundary-shared.tsx'

export const loader = async ({}: LoaderFunctionArgs) => {
	return data({
		title: 'Home',
		description: 'Home',
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

export default function Information() {
	return <div className="flex grow flex-col gap-8">infos</div>
}

export function ErrorBoundary(args: RootRoute.ErrorBoundaryProps) {
	return ErrorBoundaryShared(args)
}
