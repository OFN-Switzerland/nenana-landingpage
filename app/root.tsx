import React, { type PropsWithChildren, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
	data,
	type HeadersFunction,
	Links,
	type LinksFunction,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
	useLocation,
} from 'react-router'
import { useChangeLanguage } from 'remix-i18next/react'

import { DevModeOverlay } from '~/components/devmode-overlay'
import { ServiceWorkerUpdater } from '~/components/pwa/service-worker-updater.client'
import { getUserPreferences } from '~/lib/cookies/store-selection/get-user-preferences.tsx'
import { userPreferencesCookie } from '~/lib/cookies/store-selection/store-selection-cookie.server.ts'
import { isClient } from '~/lib/is-client.ts'
import { logger } from '~/lib/logger.ts'
import { GenericAppEvents } from '~/lib/plausible/event-names.ts'
import { getHostname } from '~/lib/plausible/get-hostname.ts'
import { cn } from '~/lib/utils.ts'
import { getLocale, i18nextMiddleware } from '~/middleware/i18next.ts'
import { performanceMiddleware } from '~/middleware/performance.ts'

import './webfonts.css'
import './tailwind.css'
import { ErrorBoundaryShared } from '~/services/error-boundary-shared.tsx'
import { getTheme } from '~/services/theme.server'

import { type Route } from './+types/root.ts'
import { plausibleClientEvent } from './lib/plausible/plausible-client-event.ts'
import versionFile from './version.json'

export const links: LinksFunction = () => [
	{ href: '/favicon.png', rel: 'icon', type: 'image/png' },
	{ href: '/favicon.ico', rel: 'icon', type: 'image/png' },
	{ crossOrigin: 'use-credentials', href: '/manifest.json', rel: 'manifest' },
]

export const headers: HeadersFunction = () => {
	return {
		'Cache-Control': 'public, max-age=0, s-maxage=0',
	}
}

export const loader = async ({ context, params, request }: Route.LoaderArgs) => {
	const locale = getLocale(context)
	const userPreferences = await getUserPreferences(request)

	logger.debug(`User language is ${locale}`)

	let response = {}

	if (!params.lang) {
		const url = new URL(request.url)
		logger.debug(`🔀 Redirecting to default locale ${locale} on ${url.pathname}`)
		const pathname = url.pathname === '/' ? '/home' : url.pathname
		// prevent redirect loop
		if (!pathname.startsWith(`/${locale}/`)) {
			response = {
				headers: {
					Location: `/${locale}${pathname}`,
				},
				status: 301,
			}
		}
	}

	if (!userPreferences.isValidPreferences) {
		console.log({ userPreferences })
		const headers = new Headers()
		headers.append('Set-Cookie', await userPreferencesCookie.serialize(userPreferences.preferences))
	}

	return data(
		{
			...userPreferences,
			domain: getHostname(process.env.ORIGIN),
			ENV: {
				INSTANCE_NAME: process.env.INSTANCE_NAME,
				NODE_ENV: process.env.NODE_ENV,
				VERSION: versionFile.version,
			},
			isDev: process.env.NODE_ENV !== 'production',
			locale,
			requestInfo: {
				userPrefs: {
					theme: getTheme(request),
				},
			},
			version: versionFile.version,
		},
		response,
	)
}

export type RootRouteLoaderData = typeof loader

export const unstable_middleware = [i18nextMiddleware, performanceMiddleware]

export const handle = {
	i18n: 'common',
}

export default function App() {
	return <Outlet />
}

export function ErrorBoundary(args: Route.ErrorBoundaryProps) {
	return ErrorBoundaryShared(args)
}

export function Layout({ children }: PropsWithChildren) {
	const location = useLocation()
	const { ENV, locale, version } = useLoaderData<typeof loader>()
	const { i18n } = useTranslation()
	useChangeLanguage(locale || i18n.language)

	useEffect(() => {
		plausibleClientEvent({ name: GenericAppEvents.PageView })
	}, [location.pathname])

	useEffect(() => {
		if (isClient() && window.ENV.VERSION !== version) {
			logger.error('🔄 Should reload page or clear cache due to version mismatch')
			// Force reload the page when a version mismatch is detected
			window.location.reload()
		}
	}, [version])

	return (
		<html className={cn(['h-svh'])} dir={i18n.dir()} lang={locale}>
			<head>
				<meta charSet="utf-8" />
				<meta content="width=device-width, initial-scale=1" name="viewport" />
				<Meta />
				<Links />
			</head>
			<body className="h-svh">
				{children}
				<ScrollRestoration />
				<Scripts />
				<DevModeOverlay />
				{/* Service Worker Updater Component - manages PWA updates */}
				{isClient() && <ServiceWorkerUpdater />}
				<script
					dangerouslySetInnerHTML={{
						__html: `window.ENV = ${JSON.stringify(ENV)}`,
					}}
				/>
			</body>
		</html>
	)
}
