import { toNumber } from 'lodash-es'
import { CheckCircle2Icon } from 'lucide-react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Form, href, useRouteLoaderData } from 'react-router'
import { StoreInfoOverlay } from '~/components/home/store-info-overlay.tsx'
import { Button } from '~/components/ui/button.tsx'
import { useLang } from '~/hooks/use-lang.tsx'
import { cn } from '~/lib/utils.ts'
import { type HomeRouteLoaderData } from '~/routes/home.tsx'
import { type Store } from '~/schemas/store-location-schema.ts'

type Props = {
	data: Store
	embedded?: boolean
}

export const StoreCard: React.FC<Props> = ({ data, embedded }) => {
	const { t } = useTranslation()
	const { lang } = useLang()
	const loaderData = useRouteLoaderData<HomeRouteLoaderData>('routes/home')

	const isSelected = useMemo(() => {
		return toNumber(loaderData?.storeId) === data.id
	}, [loaderData, data.id])

	return (
		<Form action={href('/:lang?/home', { lang })} method="post">
			<input type="hidden" name="selectedStoreId" value={data.id} />
			<div
				className={cn(
					embedded
						? 'card card-compact min-w-48'
						: 'card card-border bg-base-100 h-full drop-shadow-xl',
				)}>
				<div className={cn('card-body', embedded ? 'px-0 py-2' : '')}>
					<h2 className="card-title">{data.name}</h2>
					<p>{data.description}</p>
					<p>
						{data.address.street}
						<br />
						{data.address.zip} {data.address.city}
					</p>
					<div className="card-actions items-center justify-between">
						<StoreInfoOverlay data={data} />
						{isSelected ? (
							<div className="text-success">
								<CheckCircle2Icon size={32} />
							</div>
						) : (
							<Button type="submit" variant="outline" size="sm">
								{t('userActions.select', 'Select')}
							</Button>
						)}
					</div>
				</div>
			</div>
		</Form>
	)
}
