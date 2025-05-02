import { useTranslation } from 'react-i18next'
import { type StoreData } from '~/schemas/store-location-schema.ts'

type StoreStateFilterProps = {
	stores: StoreData['stores']
	selectedState: string
	setSelectedState: (state: string) => void
}

export const StoreStateFilter = ({
	stores,
	selectedState,
	setSelectedState,
}: StoreStateFilterProps) => {
	const { t } = useTranslation()

	const uniqueStates = Array.from(new Set(stores.map((store) => store.address.state)))
		.filter(Boolean)
		.sort()

	return (
		<div className="form-control w-full max-w-xs">
			<select
				className="select select-bordered"
				value={selectedState}
				onChange={(e) => setSelectedState(e.target.value)}>
				<option value="">{t('storeSelection.allStates', 'All States')}</option>
				{uniqueStates.map((state) => (
					<option key={state} value={state}>
						{state}
					</option>
				))}
			</select>
		</div>
	)
}
