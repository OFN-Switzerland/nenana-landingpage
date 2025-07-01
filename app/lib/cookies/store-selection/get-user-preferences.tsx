import { toNumber } from 'lodash-es'

import userPreferencesCookieSchema, {
	emptyUserPreferencesCookie,
	userPreferencesCookie,
	type UserPreferencesCookie,
} from '~/lib/cookies/store-selection/store-selection-cookie.server.ts'
import { logger } from '~/lib/logger.ts'
import { type StoreData } from '~/schemas/store-location-schema.ts'
import { getStoreLocationData } from '~/services/get-store-location-data.ts'

export async function getUserPreferences(request: Request): Promise<{
	isValidPreferences: boolean
	preferences: UserPreferencesCookie
	selectedStore: StoreData['stores'][number] | undefined
	storeData: StoreData
}> {
	const storeData = await getStoreLocationData()
	const cookieHeader = request.headers.get('Cookie')
	const cookie = await userPreferencesCookie.parse(cookieHeader)

	const isValidPreferences =
		userPreferencesCookieSchema.safeParse(cookie).success &&
		cookie.storeVersionDate === storeData.date

	const selectedStore = storeData.stores.find((store) => store.id === toNumber(cookie?.storeId))

	if (!isValidPreferences) {
		logger.debug('Invalid user preferences cookie', { cookie })
		return {
			isValidPreferences,
			preferences: { ...emptyUserPreferencesCookie, storeVersionDate: storeData.date },
			selectedStore,
			storeData,
		}
	}

	logger.debug('Valid user preferences cookie', { cookie })

	return {
		isValidPreferences,
		preferences: cookie,
		selectedStore,
		storeData,
	}
}
