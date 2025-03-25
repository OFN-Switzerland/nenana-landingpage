import { index, layout, prefix, route, type RouteConfig } from '@react-router/dev/routes'

export default [
	route('*', './routes/$.tsx'),
	...prefix(':lang?', [
		layout('./routes/_layout.tsx', [
			route('home', './routes/home.tsx'),
			...prefix('information', [index('./routes/information.tsx')]),
		]),
	]),
	route('robots.txt', './routes/robots.tsx'),
	route('healthcheck', './routes/healthcheck.tsx'),
] satisfies RouteConfig
