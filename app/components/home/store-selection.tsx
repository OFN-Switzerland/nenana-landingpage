import { useTranslation } from 'react-i18next'
import { StoreCard } from '~/components/home/store-card.tsx'
import { useRouteLoaderData } from 'react-router'
import { HomeRouteLoaderData } from '~/routes/home.tsx'
import { Alert } from '~/components/ui/alert.tsx'

export const StoreSelection = () => {
	const loaderData = useRouteLoaderData<HomeRouteLoaderData>('routes/home')
	const { t } = useTranslation()

	if (!loaderData?.storeData) {
		return (
			<Alert variant={'error'}>
				{t('storeSelection.error', 'There was an error loading the store data')}
			</Alert>
		)
	}

	return (
		<div className={'grid grid-cols-3 gap-4'}>
			{loaderData?.storeData.stores.map((store) => <StoreCard data={store} key={store.id} />)}
		</div>
	)
}
