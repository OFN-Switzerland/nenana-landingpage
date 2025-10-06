import { prefix, route, type RouteConfig } from '@react-router/dev/routes'

export const plausibleEventsRoutes = [
	...prefix('api', [route('event', './features/plausible/routes/event.ts')]),
] satisfies RouteConfig
