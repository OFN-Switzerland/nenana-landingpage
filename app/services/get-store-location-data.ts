import { type StoreDataType } from '~/types/store-location-data-type.ts'

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
	return data as StoreDataType
}
