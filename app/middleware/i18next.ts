import parser from 'accept-language-parser'
import { createI18nextMiddleware } from 'remix-i18next/middleware'

import { i18nConfig } from '~/i18n-config.ts'
import { i18nCookie } from '~/lib/cookies/i18next-cookie.server.ts'
import { logger } from '~/lib/logger.ts'

export const [i18nextMiddleware, getLocale, getInstance] = createI18nextMiddleware({
	detection: {
		cookie: i18nCookie,
		fallbackLanguage: i18nConfig.fallbackLng,
		async findLocale(request: Request) {
			let locale = i18nConfig.fallbackLng

			// First, check if locale is explicitly set in the URL path
			const firstPathSegment = new URL(request.url).pathname.split('/').at(1)
			if (firstPathSegment && i18nConfig.supportedLngs.includes(firstPathSegment)) {
				// URL locale takes precedence over everything else
				logger.debug({ localeSource: 'URL path', locale: firstPathSegment })
				return firstPathSegment
			}

			// Fallback to Accept-Language header if no locale in URL
			const acceptLanguageHeader = request.headers.get('Accept-Language')
			if (acceptLanguageHeader) {
				const preferredLanguages = parser.parse(acceptLanguageHeader)
				if (preferredLanguages.length > 0) {
					// Find the first language that matches your supported languages
					const match = preferredLanguages.find((lang) =>
						i18nConfig.supportedLngs.includes(lang.code),
					)
					if (match) {
						logger.debug({ localeSource: 'Accept-Language', locale: match.code })
						locale = match.code
					}
				}
			}

			logger.debug({ localeSource: 'fallback', locale })
			return locale
		},
		order: ['custom', 'header'],
		supportedLanguages: i18nConfig.supportedLngs,
	},
	i18next: {
		defaultNS: i18nConfig.defaultNS,
		resources: i18nConfig.resources,
	},
})
