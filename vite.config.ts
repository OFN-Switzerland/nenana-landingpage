import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import vitePluginSvgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

// Generate a unique build ID
const generateBuildId = () => {
  // Use timestamp and random string for uniqueness
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, '');
  const randomStr = Math.random().toString(36).substring(2, 10);
  return `${timestamp}-${randomStr}`;
};

export default defineConfig(({ mode }) => {
  // Load env variables
  const env = loadEnv(mode, process.cwd(), '');
  
  // Create a unique build ID for this build
  const BUILD_ID = generateBuildId();
  
  return {
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
    // Define environment variables that will be available in your client-side code
    define: {
      'process.env.BUILD_ID': JSON.stringify(BUILD_ID),
      'process.env.BUILD_TIMESTAMP': JSON.stringify(new Date().toISOString()),
      // Preserve existing env variables
      ...Object.fromEntries(
        Object.entries(env).map(([key, val]) => [`process.env.${key}`, JSON.stringify(val)])
      ),
    },
  };
})
