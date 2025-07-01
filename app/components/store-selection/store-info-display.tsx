import { useTranslation } from 'react-i18next'

import { H3 } from '~/components/typography/h3.tsx'
import { H4 } from '~/components/typography/h4.tsx'
import { P } from '~/components/typography/p.tsx'
import { type Store } from '~/schemas/store-location-schema.ts'

type Props = {
	data: Store
}
export const StoreInfoDisplay: React.FC<Props> = ({ data }) => {
	const { t } = useTranslation()
	return (
		<>
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
		</>
	)
}
