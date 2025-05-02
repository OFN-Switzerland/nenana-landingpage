// Inner component that contains the actual map implementation
import { useTranslation } from 'react-i18next'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { StoreCard } from '~/components/store-selection/store-card.tsx'
import { type Store } from '~/schemas/store-location-schema.ts'

// Imports for leaflet styling
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css' // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility'

export type StoreMapProps = {
	stores: Store[]
}
export const MapImplementationClient: React.FC<StoreMapProps> = ({ stores }) => {
	const { t } = useTranslation()

	// Find center point for the map (average of all store positions)
	const calculateMapCenter = (): [number, number] => {
		if (stores.length === 0) {
			// Default to a central location if no stores
			return [47.4245, 9.3767] // Default to St. Gallen, Switzerland
		}

		// Average all latitudes and longitudes
		const sumLat = stores.reduce((sum, store) => sum + store.address.position.latitude, 0)
		const sumLng = stores.reduce((sum, store) => sum + store.address.position.longitude, 0)

		return [sumLat / stores.length, sumLng / stores.length]
	}

	// Calculate appropriate zoom level based on store distribution
	const calculateZoomLevel = (): number => {
		if (stores.length <= 1) return 13 // Closer zoom for single store
		if (stores.length <= 3) return 10 // Medium zoom for a few stores
		return 9 // Wider view for many stores
	}

	const center: [number, number] = calculateMapCenter()
	const zoom: number = calculateZoomLevel()

	// If no stores, show a message
	if (stores.length === 0) {
		return (
			<div className="bg-base-200 rounded-lg p-4 text-center">
				{t('storeMap.noStores', 'No stores found to display on map')}
			</div>
		)
	}

	return (
		<MapContainer center={center} zoom={zoom} className="h-full w-full">
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{stores.map((store) => (
				<Marker
					key={store.id}
					position={
						[store.address.position.latitude, store.address.position.longitude] as [number, number]
					}>
					<Popup>
						<StoreCard data={store} embedded={true} />
					</Popup>
				</Marker>
			))}
		</MapContainer>
	)
}
