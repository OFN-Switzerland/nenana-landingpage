import { useTranslation } from 'react-i18next'
import { ClientOnly } from 'remix-utils/client-only'
import {
	MapImplementationClient,
	type StoreMapProps,
} from '~/components/home/map-implementation.client.tsx'
import { Spinner } from '~/components/ui/spinner.tsx'

// Main component that wraps the map implementation with ClientOnly
export const StoreMap = ({ stores }: StoreMapProps) => {
	const { t } = useTranslation()

	// If no stores, show a message instead of loading the map
	if (stores.length === 0) {
		return (
			<div className="bg-base-200 rounded-lg p-4 text-center">
				{t('storeMap.noStores', 'No stores found to display on map')}
			</div>
		)
	}

	return (
		<div className="store-map-container h-96 w-full overflow-hidden rounded-lg">
			<ClientOnly fallback={<Spinner />}>
				{() => <MapImplementationClient stores={stores} />}
			</ClientOnly>
		</div>
	)
}
