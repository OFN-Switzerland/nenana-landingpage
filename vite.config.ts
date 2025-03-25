import { reactRouter } from '@react-router/dev/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import tailwindcss from '@tailwindcss/vite'
import vitePluginSvgr from 'vite-plugin-svgr'

export default defineConfig(() => ({
	plugins: [reactRouter(), tailwindcss(), tsconfigPaths(), ViteImageOptimizer(), vitePluginSvgr()],
	server: {
		host: true,
	},
	optimizeDeps: {
		esbuildOptions: {
			target: 'ES2022',
		},
	},
	build: {
		target: 'ES2022',
		commonjsOptions: {
			transformMixedEsModules: true,
		},
	},
}))
