import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { StoreInfoDisplay } from '~/components/store-selection/store-info-display.tsx'
import { Button } from '~/components/ui/button.tsx'
import { plausibleClientEvent, StoreSelectionEvents } from '~/features/plausible'
import { type Store } from '~/schemas/store-location-schema.ts'

type Props = {
	data: Store
}

export const StoreInfoOverlay: React.FC<Props> = ({ data }) => {
	const dialogRef = useRef<HTMLDialogElement>(null)
	const { t } = useTranslation()

	const openDialog = () => {
		void plausibleClientEvent({
			name: StoreSelectionEvents.ViewInfo,
			props: { storeId: data.id.toString(), storeName: data.name },
		})
		dialogRef.current?.showModal()
	}

	const onCancelClick = () => {
		dialogRef.current?.close()
	}

	return (
		<>
			<Button
				name={t('actions.info', 'More information')}
				onClick={openDialog}
				size="sm"
				type="button"
				variant="outline">
				{t('actions.hubInfo', 'Information')}
			</Button>
			<dialog className="modal modal-bottom sm:modal-middle" ref={dialogRef}>
				<div className="modal-box">
					<StoreInfoDisplay data={data} />
					<div className="modal-action">
						<div className="flex flex-row items-center gap-4">
							<Button onClick={onCancelClick} type="button">
								{t('actions.cancel', 'Cancel')}
							</Button>
						</div>
					</div>
				</div>
			</dialog>
		</>
	)
}
