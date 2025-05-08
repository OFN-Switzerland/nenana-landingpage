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
import { type Route } from './+types/root.ts'
import { plausibleClientEvent } from './lib/plausible/plausible-client-event.ts'
import versionFile from './version.json'
import { DevModeOverlay } from '~/components/devmode-overlay'
import { isClient } from '~/lib/is-client.ts'
import { logger } from '~/lib/logger.ts'
import { GenericAppEvents } from '~/lib/plausible/event-names.ts'
import { getHostname } from '~/lib/plausible/get-hostname.ts'
import { cn } from '~/lib/utils.ts'
import { ErrorBoundaryShared } from '~/services/error-boundary-shared.tsx'
import { getLocale } from '~/services/get-locale.ts'
import { getTheme } from '~/services/theme.server'
import { ServiceWorkerUpdater } from '~/components/pwa/service-worker-updater.client'
import './webfonts.css'
import './tailwind.css'

export const links: LinksFunction = () => [
	{ rel: 'icon', href: '/favicon.png', type: 'image/png' },
	{ rel: 'icon', href: '/favicon.ico', type: 'image/png' },
	{ rel: 'manifest', href: '/manifest.json', crossOrigin: 'use-credentials' },
]

export const headers: HeadersFunction = () => {
	return {
		'Cache-Control': 'public, max-age=0, s-maxage=0',
	}
}

export const loader = async ({ request, params }: Route.LoaderArgs) => {
	const locale = await getLocale(request)

	let response = {}

	if (!params.lang) {
		const url = new URL(request.url)
		logger.debug(`🔀 Redirecting to default locale ${locale} on ${url.pathname}`)
		const pathname = url.pathname === '/' ? '/home' : url.pathname
		// prevent redirect loop
		if (!pathname.startsWith(`/${locale}/`)) {
			response = {
				status: 301,
				headers: {
					Location: `/${locale}${pathname}`,
				},
			}
		}
	}

	return data(
		{
			locale,
			domain: getHostname(process.env.ORIGIN),
			version: versionFile.version,
			isDev: process.env.NODE_ENV !== 'production',
			ENV: {
				INSTANCE_NAME: process.env.INSTANCE_NAME,
				NODE_ENV: process.env.NODE_ENV,
				VERSION: versionFile.version,
			},
			requestInfo: {
				userPrefs: {
					theme: getTheme(request),
				},
			},
		},
		response,
	)
}

export type RootRouteLoaderData = typeof loader

export const handle = {
	i18n: 'common',
}

export function Layout({ children }: PropsWithChildren) {
	const location = useLocation()
	const { locale, version, ENV } = useLoaderData<typeof loader>()
	const { i18n } = useTranslation()
	useChangeLanguage(locale || i18n.language)

	useEffect(() => {
		plausibleClientEvent({ name: GenericAppEvents.PageView })
	}, [location.pathname])

	useEffect(() => {
		if (isClient() && window.ENV.VERSION !== version) {
			logger.error('🔄 Should reload page or clear cache due to version mismatch')
			// Force reload the page when a version mismatch is detected
			window.location.reload();
		}
	}, [version]);

	return (
		<html lang={locale} dir={i18n.dir()} className={cn(['h-svh'])}>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
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

export default function App() {
	return <Outlet />
}

export function ErrorBoundary(args: Route.ErrorBoundaryProps) {
	return ErrorBoundaryShared(args)
}
