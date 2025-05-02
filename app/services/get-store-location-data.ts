import { type StoreData, storeDataSchema } from '~/schemas/store-location-schema.ts'

export const getStoreLocationData = async () => {
	let url = ''

	if (typeof window === 'undefined') {
		url = process.env.STORE_DATA_URL || ''
	} else {
		url = window.ENV.STORE_DATA_URL || ''
	}

	if (!url) {
		throw new Error('STORE_DATA_URL is not defined')
	}

	const response = await fetch(url)
	const data = await response.json()
	// Parse and validate data
	const result = storeDataSchema.safeParse(data)
	if (result.success) {
		const stores = result.data.stores.filter((store) => store.status === 'active')

		return { stores, date: result.data.date } as StoreData
	} else {
		throw new Error(result.error.message)
	}
}
