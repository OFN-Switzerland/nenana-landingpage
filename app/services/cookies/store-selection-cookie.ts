import { createCookie } from 'react-router'

export const StoreSelectionCookie = createCookie('store-selection', {
	httpOnly: true,
	secure: process.env.NODE_ENV === 'production',
	sameSite: 'lax',
})
