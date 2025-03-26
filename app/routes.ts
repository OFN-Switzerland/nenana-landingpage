import { index, prefix, route, type RouteConfig } from '@react-router/dev/routes'

export default [
	route('*', './routes/$.tsx'),
	...prefix(':lang?', [
		route('home', './routes/home.tsx'),
		route('embed', './routes/embed.tsx'),
		...prefix('information', [index('./routes/information.tsx')]),
	]),
	route('robots.txt', './routes/robots.tsx'),
	route('healthcheck', './routes/healthcheck.tsx'),
] satisfies RouteConfig
