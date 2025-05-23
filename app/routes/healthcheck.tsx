import { data, type LoaderFunctionArgs } from 'react-router'

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const host = request.headers.get('X-Forwarded-Host') ?? request.headers.get('host')
	return data({ status: `ok ${host}` }, { status: 200 })
}
