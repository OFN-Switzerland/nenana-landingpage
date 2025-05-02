import { useTranslation } from 'react-i18next'
import { StoreCard } from '~/components/store-selection/store-card.tsx'
import { type StoreData } from '~/schemas/store-location-schema.ts'

type StoreResultsProps = {
	stores: StoreData['stores']
}

export const StoreResults = ({ stores }: StoreResultsProps) => {
	const { t } = useTranslation()

	if (stores.length === 0) {
		return (
			<div className="alert alert-warning">
				<div>
					<span>{t('storeSelection.noResults', 'No stores match your search')}</span>
				</div>
			</div>
		)
	}

	return (
		<div className="flex flex-col gap-2">
			<div className="text-sm">
				{t('storeSelection.resultsCount', 'Showing {{count}} results', { count: stores.length })}
			</div>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
				{stores.map((store) => (
					<StoreCard data={store} key={store.id} />
				))}
			</div>
		</div>
	)
}
