import { type defaultNS } from '~/app/i18n.ts'
import resources from '~/public/locales/en/common.json'

declare module 'i18next' {
	interface CustomTypeOptions {
		defaultNS: typeof defaultNS
		resources: typeof resources
	}
}
