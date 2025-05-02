import { X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouteLoaderData, useSearchParams } from 'react-router'
import { StoreMap } from '~/components/home/store-map.tsx'
import { StoreResults } from '~/components/home/store-results.tsx'
import { filterStores, StoreSearchFilter } from '~/components/home/store-search-filter.tsx'
import { StoreStateFilter } from '~/components/home/store-state-filter.tsx'
import { Alert } from '~/components/ui/alert.tsx'
import { type HomeRouteLoaderData } from '~/routes/home.tsx'

export const StoreSelection = () => {
	const loaderData = useRouteLoaderData<HomeRouteLoaderData>('routes/home')
	const { t } = useTranslation()
	const [searchParams, setSearchParams] = useSearchParams()
	const [showMap, setShowMap] = useState(true)

	// Get search query and state from URL
	const searchQuery = searchParams.get('q') || ''
	const selectedState = searchParams.get('state') || ''

	// Check if any filters are active
	const hasActiveFilters = searchQuery || selectedState

	// Function to update the search query in the URL
	const setSearchQuery = (query: string) => {
		const newParams = new URLSearchParams(searchParams)
		if (query) {
			newParams.set('q', query)
		} else {
			newParams.delete('q')
		}
		setSearchParams(newParams, { replace: true })
	}

	// Function to update the selected state in the URL
	const setSelectedState = (state: string) => {
		const newParams = new URLSearchParams(searchParams)
		if (state) {
			newParams.set('state', state)
		} else {
			newParams.delete('state')
		}
		setSearchParams(newParams, { replace: true })
	}

	// Function to clear all filters
	const clearAllFilters = () => {
		setSearchParams({}, { replace: true })
	}

	const filteredStores = useMemo(() => {
		if (!loaderData?.storeData) return []
		return filterStores(loaderData?.storeData.stores, {
			searchQuery,
			state: selectedState,
		})
	}, [loaderData?.storeData, searchQuery, selectedState])

	if (!loaderData?.storeData) {
		return (
			<Alert variant="error">
				{t('storeSelection.error', 'There was an error loading the store data')}
			</Alert>
		)
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-start gap-4">
				<StoreSearchFilter searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
				<StoreStateFilter
					stores={loaderData.storeData.stores}
					selectedState={selectedState}
					setSelectedState={setSelectedState}
				/>
				{hasActiveFilters && (
					<button
						className="btn btn-outline"
						type="button"
						aria-label={t('storeSelection.clearFilters', 'Clear filters')}
						onClick={clearAllFilters}>
						<X />
					</button>
				)}
				<button className="btn btn-outline ml-auto" onClick={() => setShowMap(!showMap)}>
					{showMap
						? t('storeSelection.showList', 'Show List')
						: t('storeSelection.showMap', 'Show Map')}
				</button>
			</div>

			{showMap ? <StoreMap stores={filteredStores} /> : <StoreResults stores={filteredStores} />}
		</div>
	)
}
