import { index, layout, prefix, route, type RouteConfig } from '@react-router/dev/routes'

export default [
	layout('./routes/_layout.tsx', [
		index('./routes/_index.tsx'),
		route('*', './routes/$.tsx'),
		...prefix(':lang?', [
			route('home', './routes/home.tsx'),
			...prefix('information', [index('./routes/information.tsx')]),
		]),
		route('robots.txt', './routes/robots.tsx'),
		route('healthcheck', './routes/healthcheck.tsx'),
	]),
] satisfies RouteConfig
