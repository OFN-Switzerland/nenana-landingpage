import type { Config } from '@react-router/dev/config'
// import { ReactRouterPreset } from '@vite-pwa/remix'

export default {
	ssr: true,
	future: {
		unstable_optimizeDeps: true,
	},
	// presets: [ReactRouterPreset],
} satisfies Config
