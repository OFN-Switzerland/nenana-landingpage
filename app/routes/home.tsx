import { data, LoaderFunctionArgs, type MetaFunction } from 'react-router'
import React from 'react'
import { ErrorBoundaryShared } from '~/services/error-boundary-shared.tsx'
import { Route as RootRoute } from '../../.react-router/types/app/+types/root.ts'
import { HomeHero } from '~/components/home/hero.tsx'

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
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

export default function Home() {
	return (
		<div className={'flex grow flex-col gap-8'}>
			<HomeHero />
		</div>
	)
}

export function ErrorBoundary(args: RootRoute.ErrorBoundaryProps) {
	return ErrorBoundaryShared(args)
}
