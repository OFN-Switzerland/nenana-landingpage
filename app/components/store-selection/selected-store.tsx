import { useTranslation } from 'react-i18next'
import { href, Link, useRouteLoaderData } from 'react-router'

import { P } from '~/components/typography/p.tsx'
import { Button } from '~/components/ui/button.tsx'
import { plausibleClientEvent, RegistrationEvents, UserActionEvents } from '~/features/plausible'
import { StoreSelectionStatus } from '~/lib/cookies/store-selection/store-selection-status.ts'
import { type RootRouteLoaderData } from '~/root.tsx'

export const SelectedStore: React.FC = () => {
	const loaderData = useRouteLoaderData<RootRouteLoaderData>('root')
	const {
		i18n: { language: lang },
		t,
	} = useTranslation()

	const { preferences, selectedStore } = loaderData || {}

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
			{preferences?.storeSelectionStatus === StoreSelectionStatus.registration_started && (
				<Link to={href('/:lang/registration/form', { lang })}>
					<Button type="button" variant="neutral">
						{t('userActions.continueRegistration', 'Continue registration')}
					</Button>
				</Link>
			)}
			{preferences?.storeSelectionStatus === StoreSelectionStatus.registration_pending && (
				<Link className="w-full sm:w-auto" to={href('/:lang/registration/completed', { lang })}>
					<Button
						className="w-full"
						onClick={() => void plausibleClientEvent({ name: RegistrationEvents.Completed })}
						type="button"
						variant="primary">
						{t('userActions.finalizeRegistration', 'I received my registration info')}
					</Button>
				</Link>
			)}
			{preferences?.storeSelectionStatus === StoreSelectionStatus.registration_completed && (
				<Link
					className="w-full sm:w-auto"
					to={selectedStore?.forwardUrl || href('/:lang/home', { lang })}>
					<Button
						className="w-full"
						onClick={() =>
							void plausibleClientEvent({
								name: UserActionEvents.NavigateToStore,
								props: {
									storeId: selectedStore?.id?.toString() || '',
									storeName: selectedStore?.name || '',
								},
							})
						}
						type="button"
						variant="primary">
						{t('userActions.navigateToStore', 'To store')}
					</Button>
				</Link>
			)}
		</div>
	)
}
