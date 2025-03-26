import { useTranslation } from 'react-i18next'
import { useRef } from 'react'
import { P } from '~/components/typography/p.tsx'
import { Button } from '~/components/ui/button.tsx'
import { InfoIcon } from 'lucide-react'
import { H3 } from '~/components/typography/h3.tsx'
import { H4 } from '~/components/typography/h4.tsx'

type Props = {
	data: StoreDataType['stores'][0]
}

export const StoreInfoOverlay: React.FC<Props> = ({ data }) => {
	const dialogRef = useRef<HTMLDialogElement>(null)
	const { t } = useTranslation()

	const openDialog = () => {
		dialogRef.current?.showModal()
	}

	const onCancelClick = () => {
		dialogRef.current?.close()
	}

	return (
		<>
			<Button
				variant={'ghost'}
				size={'xs'}
				onClick={openDialog}
				type={'button'}
				name={t('actions.info', 'More information')}>
				<InfoIcon />
			</Button>
			<dialog ref={dialogRef} className="modal modal-bottom sm:modal-middle">
				<div className="modal-box">
					<H3>{data.name}</H3>
					<P>{data.description}</P>
					<H4>{t('storeInfo.address', 'Address')}</H4>
					<P>
						{data.address.street}
						<br />
						{data.address.zip} {data.address.city}
						<br />
						{data.address.country}
					</P>
					<H4>{t('storeInfo.contact', 'Contact')}</H4>
					<P>
						<a href={`tel:${data.contact.phone}`}>{data.contact.phone}</a>
						<br />
						<a href={`mailto:${data.contact.email}`}>{data.contact.email}</a>
					</P>
					<div className="modal-action">
						<div className={'flex flex-row items-center gap-4'}>
							<Button type={'button'} onClick={onCancelClick}>
								{t('actions.cancel', 'Cancel')}
							</Button>
						</div>
					</div>
				</div>
			</dialog>
		</>
	)
}
