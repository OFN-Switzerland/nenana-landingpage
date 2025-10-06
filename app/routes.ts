import { layout, prefix, route, type RouteConfig } from '@react-router/dev/routes'

export default [
	layout('./routes/layout.tsx', [
		route('*', './routes/error-404.tsx'),
		...prefix(':lang', [
			route('home', './routes/home.tsx'),
			route('embed', './routes/embed.tsx'), // Unused, poc for iframe embedding
			route('registration', './routes/registration-start.tsx'),
			route('registration/form', './routes/registration-form.tsx'),
			route('registration/sent', './routes/registration-sent.tsx'),
			route('registration/pending', './routes/registration-pending.tsx'),
			route('registration/completed', './routes/registration-completed.tsx'),
		]),
	]),
	route('robots.txt', './routes/files/robots.ts'),
	...prefix('api', [
		route('locales/:lang/:ns?', './routes/api/locales.ts'),
		route('health', './routes/api/healthcheck.ts'),
		route('event', './routes/api/event.ts'),
	]),
] satisfies RouteConfig
