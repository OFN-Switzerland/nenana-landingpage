/**
 * Awaited type for Promise or async function return type of loader functions
 * Helpful for sharing loader data over multiple routes
 * @example
 * type MyRouteLoaderData = TypedRouteLoaderData<typeof loader>
 */
export type TypedRouteLoaderData<T extends (...args: any) => any> = Awaited<ReturnType<T>>
