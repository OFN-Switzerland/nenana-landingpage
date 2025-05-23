/**
 * By default, Remix will handle generating the HTTP Response for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.server
 */

import { resolve } from 'node:path'
import { PassThrough } from 'node:stream'

import { createReadableStreamFromReadable } from '@react-router/node'
import { createInstance } from 'i18next'
import Backend from 'i18next-fs-backend'
import { isbot } from 'isbot'
import { renderToPipeableStream } from 'react-dom/server'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { type AppLoadContext, type EntryContext, ServerRouter } from 'react-router'
import i18n from './i18n' // your i18n configuration file
import i18nextServer from './i18next.server'
import { getLocale } from '~/services/get-locale.ts'

const ABORT_DELAY = 5000

export default async function handleRequest(
	request: Request,
	responseStatusCode: number,
	responseHeaders: Headers,
	reactRouterContext: EntryContext,
	// This is ignored so we can keep it in the template for visibility.  Feel
	// free to delete this parameter in your app if you're not using it!
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	loadContext: AppLoadContext,
) {
	return isbot(request.headers.get('user-agent') || '')
		? handleBotRequest(request, responseStatusCode, responseHeaders, reactRouterContext)
		: handleBrowserRequest(request, responseStatusCode, responseHeaders, reactRouterContext)
}

async function handleBotRequest(
	request: Request,
	responseStatusCode: number,
	responseHeaders: Headers,
	reactRouterContext: EntryContext,
) {
	const instance = createInstance()
	const lng = await getLocale(request)
	const ns = i18nextServer.getRouteNamespaces(reactRouterContext)

	await instance
		.use(initReactI18next)
		.use(Backend)
		.init({
			...i18n,
			lng,
			ns, // The namespaces the routes about to render wants to use
			backend: { loadPath: resolve(`./public/locales/${i18n.jsonFileSchema}`) },
		})

	return new Promise((resolve, reject) => {
		let shellRendered = false
		const { pipe, abort } = renderToPipeableStream(
			<I18nextProvider i18n={instance}>
				<ServerRouter context={reactRouterContext} url={request.url} />
			</I18nextProvider>,
			{
				onAllReady() {
					shellRendered = true
					const body = new PassThrough()
					const stream = createReadableStreamFromReadable(body)

					responseHeaders.set('Content-Type', 'text/html')

					resolve(
						new Response(stream, {
							headers: responseHeaders,
							status: responseStatusCode,
						}),
					)

					pipe(body)
				},
				onShellError(error: unknown) {
					reject(error)
				},
				onError(error: unknown) {
					responseStatusCode = 500
					// Log streaming rendering errors from inside the shell.  Don't log
					// errors encountered during initial shell rendering since they'll
					// reject and get logged in handleDocumentRequest.
					if (shellRendered) {
						console.error(error)
					}
				},
			},
		)

		setTimeout(abort, ABORT_DELAY)
	})
}

async function handleBrowserRequest(
	request: Request,
	responseStatusCode: number,
	responseHeaders: Headers,
	reactRouterContext: EntryContext,
) {
	const instance = createInstance()
	const lng = await getLocale(request)
	const ns = i18nextServer.getRouteNamespaces(reactRouterContext)

	await instance
		.use(initReactI18next) // Tell our instance to use react-i18next
		.use(Backend) // Setup our backend
		.init({
			...i18n, // spread the configuration
			lng, // The locale we detected above
			ns, // The namespaces the routes about to render wants to use
			backend: { loadPath: resolve('./public/locales/{{ns}}.{{lng}}.json') },
		})

	return new Promise((resolve, reject) => {
		let shellRendered = false
		const { pipe, abort } = renderToPipeableStream(
			<I18nextProvider i18n={instance}>
				<ServerRouter context={reactRouterContext} url={request.url} />
			</I18nextProvider>,
			{
				onShellReady() {
					shellRendered = true
					const body = new PassThrough()
					const stream = createReadableStreamFromReadable(body)

					responseHeaders.set('Content-Type', 'text/html')

					resolve(
						new Response(stream, {
							headers: responseHeaders,
							status: responseStatusCode,
						}),
					)

					pipe(body)
				},
				onShellError(error: unknown) {
					reject(error)
				},
				onError(error: unknown) {
					responseStatusCode = 500
					// Log streaming rendering errors from inside the shell.  Don't log
					// errors encountered during initial shell rendering since they'll
					// reject and get logged in handleDocumentRequest.
					if (shellRendered) {
						console.error(error)
					}
				},
			},
		)

		setTimeout(abort, ABORT_DELAY)
	})
}
