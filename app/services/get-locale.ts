import i18n from '~/i18n.ts'
import i18nextServer from '~/i18next.server.ts'
import { Params } from 'react-router'

export const getLocale = async (request: Request, params?: Params<string>): Promise<string> => {
	if (!params) {
		const url = new URL(request.url)
		for (const lang of i18n.supportedLngs) {
			if (url.pathname.startsWith(`/${lang}`)) {
				return lang as string
			}
		}
	}
	const urlLocale = params?.lang || i18n.fallbackLng
	return (
		i18n.supportedLngs.includes(urlLocale) ? urlLocale : await i18nextServer.getLocale(request)
	) as string
}
