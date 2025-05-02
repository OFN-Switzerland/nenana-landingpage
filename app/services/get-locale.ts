import { type Params } from 'react-router'
import i18n from '~/i18n.ts'
import i18nextServer from '~/i18next.server.ts'

export const getLocale = async (request: Request, params?: Params<string>): Promise<string> => {
	if (!params) {
		const url = new URL(request.url)
		for (const lang of i18n.supportedLngs) {
			if (url.pathname.startsWith(`/${lang}`)) {
				return lang as string
			}
		}
	}
	const requestLang = await i18nextServer.getLocale(request)
	const urlLocale = requestLang || params?.lang || i18n.fallbackLng
	return (i18n.supportedLngs.includes(urlLocale) ? urlLocale : i18n.fallbackLng) as string
}
