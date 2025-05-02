import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { P } from '~/components/typography/p.tsx'
import { Button } from '~/components/ui/button.tsx'
import { type Store } from '~/schemas/store-location-schema.ts'

interface SelectedStoreProps {
	storeId: string
	storeRedirectUrl: string
	stores: Store[]
}

export const SelectedStore: React.FC<SelectedStoreProps> = ({
	storeId,
	storeRedirectUrl,
	stores,
}) => {
	const { t } = useTranslation()

	// Find the selected store
	const selectedStore = stores.find((store) => store.id.toString() === storeId)

	return (
		<div className="bg-base-200 flex w-full flex-col items-center justify-between gap-4 rounded-lg p-4 sm:flex-row">
			<div className="text-center sm:text-left">
				<P className="m-0 text-xs">{t('store.selectedStore', 'Selected store')}:</P>
				<P className="m-0 text-xl font-bold">
					{selectedStore?.name || t('store.unknown', 'Unknown store')}
				</P>
				{selectedStore?.address && (
					<P className="m-0 text-sm text-gray-600">
						{selectedStore.address.city}, {selectedStore.address.state}
					</P>
				)}
			</div>

			<Link to={storeRedirectUrl} className="w-full sm:w-auto">
				<Button variant="primary" type="button" className="w-full">
					{t('userActions.goToStore', 'Go to selected store')}
				</Button>
			</Link>
		</div>
	)
}
