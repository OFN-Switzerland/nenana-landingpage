import { SearchIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { type StoreData } from '~/schemas/store-location-schema.ts'

type StoreSearchFilterProps = {
	searchQuery: string
	setSearchQuery: (query: string) => void
}

export const StoreSearchFilter = ({ searchQuery, setSearchQuery }: StoreSearchFilterProps) => {
	const { t } = useTranslation()

	return (
		<div className="w-full max-w-xs">
			<div className="form-control flex items-center">
				<div className="flex items-center px-3">
					<SearchIcon size={20} />
				</div>
				<input
					className="input input-bordered w-full"
					onChange={(e) => setSearchQuery(e.target.value)}
					placeholder={t('storeSelection.searchPlaceholder', 'Search stores...')}
					type="text"
					value={searchQuery}
				/>
			</div>
		</div>
	)
}

// Utility function to filter stores based on search query and state
export const filterStores = (
	stores: StoreData['stores'],
	options: {
		searchQuery?: string
		state?: string
	},
) => {
	let filteredStores = [...stores]
	const { searchQuery = '', state = '' } = options

	// Filter by state if selected
	if (state) {
		filteredStores = filteredStores.filter((store) => store.address.state === state)
	}

	// Filter by search query if present
	if (searchQuery.trim()) {
		const normalizedQuery = searchQuery.toLowerCase().trim()

		filteredStores = filteredStores.filter((store) => {
			// Check all store properties for matches
			return (
				// Check name and description
				store.name.toLowerCase().includes(normalizedQuery) ||
				store.description?.toLowerCase().includes(normalizedQuery) ||
				// Check address fields
				store.address.street.toLowerCase().includes(normalizedQuery) ||
				store.address.city.toLowerCase().includes(normalizedQuery) ||
				store.address.state.toLowerCase().includes(normalizedQuery) ||
				store.address.zip.toLowerCase().includes(normalizedQuery) ||
				store.address.country.toLowerCase().includes(normalizedQuery) ||
				// Check contact fields
				store.contact.phone?.toLowerCase().includes(normalizedQuery) ||
				store.contact.email?.toLowerCase().includes(normalizedQuery)
			)
		})
	}

	return filteredStores
}
