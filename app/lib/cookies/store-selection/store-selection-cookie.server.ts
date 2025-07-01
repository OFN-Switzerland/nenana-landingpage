import { createCookie } from 'react-router'
import { z } from 'zod'

import { StoreSelectionStatus } from '~/lib/cookies/store-selection/store-selection-status.ts'

export const userPreferencesCookie = createCookie('store-selection', {
	httpOnly: true,
	maxAge: 60 * 60 * 24 * 365,
	sameSite: 'lax',
	secure: process.env.NODE_ENV === 'production',
})

const userPreferencesCookieSchema = z.object({
	storeId: z.string(),
	storeRedirectUrl: z.string(),
	storeSelectionStatus: z
		.enum([
			StoreSelectionStatus.none_selected,
			StoreSelectionStatus.registration_completed,
			StoreSelectionStatus.registration_pending,
			StoreSelectionStatus.registration_started,
		])
		.nullable()
		.optional(),
	storeVersionDate: z.string(),
})

export default userPreferencesCookieSchema
export type UserPreferencesCookie = z.infer<typeof userPreferencesCookieSchema>

export const emptyUserPreferencesCookie: UserPreferencesCookie = {
	storeId: '',
	storeRedirectUrl: '',
	storeSelectionStatus: StoreSelectionStatus.none_selected,
	storeVersionDate: '',
}
