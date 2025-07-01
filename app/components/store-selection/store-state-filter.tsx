import { useTranslation } from 'react-i18next'

import { type StoreData } from '~/schemas/store-location-schema.ts'

type StoreStateFilterProps = {
	selectedState: string
	setSelectedState: (state: string) => void
	stores: StoreData['stores']
}

export const StoreStateFilter = ({
	selectedState,
	setSelectedState,
	stores,
}: StoreStateFilterProps) => {
	const { t } = useTranslation()

	const uniqueStates = Array.from(new Set(stores.map((store) => store.address.state)))
		.filter(Boolean)
		.sort()

	return (
		<div className="form-control w-full max-w-xs">
			<select
				className="select select-bordered"
				onChange={(e) => setSelectedState(e.target.value)}
				value={selectedState}>
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
