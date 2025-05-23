import { resolve } from 'node:path'
import Backend from 'i18next-fs-backend'
import { RemixI18Next } from 'remix-i18next/server'
import i18n from '~/i18n'
import { i18nextCookie } from '~/services/cookies/i18next-cookie.server.ts'

const i18nextServer = new RemixI18Next({
	detection: {
		supportedLanguages: i18n.supportedLngs,
		fallbackLanguage: i18n.fallbackLng,
		cookie: i18nextCookie,
		order: ['cookie', 'header', 'session'],
	},
	// This is the configuration for i18next used
	// when translating messages server-side only
	i18next: {
		...i18n,
		backend: {
			loadPath: resolve(`./public/locales/${i18n.jsonFileSchema}`),
		},
	},
	// The i18next plugins you want RemixI18next to use for `i18n.getFixedT` inside loaders and actions.
	// E.g. The Backend plugin for loading translations from the file system
	// Tip: You could pass `resources` to the `i18next` configuration and avoid a backend here
	plugins: [Backend],
})

export default i18nextServer
