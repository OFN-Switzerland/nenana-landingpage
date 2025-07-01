import { toNumber } from 'lodash-es'
import { CheckCircle2Icon } from 'lucide-react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Form, href, useRevalidator, useRouteLoaderData } from 'react-router'

import { StoreInfoOverlay } from '~/components/store-selection/store-info-overlay.tsx'
import { Alert } from '~/components/ui/alert.tsx'
import { Button } from '~/components/ui/button.tsx'
import { useLang } from '~/hooks/use-lang.tsx'
import { cn } from '~/lib/utils.ts'
import { type RootRouteLoaderData } from '~/root.tsx'
import { type Store } from '~/schemas/store-location-schema.ts'

type Props = {
	data: Store
	embedded?: boolean
}

export const StoreCard: React.FC<Props> = ({ data, embedded }) => {
	const { t } = useTranslation()
	const { lang } = useLang()
	const loaderData = useRouteLoaderData<RootRouteLoaderData>('root')
	const revalidate = useRevalidator().revalidate

	const isSelected = useMemo(() => {
		return toNumber(loaderData?.preferences?.storeId) === data.id
	}, [loaderData, data.id])

	const handleSelect = async () => {
		await revalidate()
	}

	return (
		<Form action={href('/:lang?/home', { lang })} method="post" onSubmit={handleSelect}>
			<input name="selectedStoreId" type="hidden" value={data.id} />
			<div
				className={cn(
					embedded
						? 'card card-compact min-w-48'
						: 'card card-border bg-base-100 h-full drop-shadow-xl',
				)}>
				<div className={cn('card-body', embedded ? 'px-0 py-2' : '')}>
					<h2 className="card-title">{data.name}</h2>
					{data.description && <p>{data.description}</p>}
					<p>
						{data.address.street}
						<br />
						{data.address.zip} {data.address.city}
					</p>
					<div className="card-actions items-center justify-between">
						<StoreInfoOverlay data={data} />
						{data.forwardUrl ? (
							<>
								{isSelected ? (
									<div className="text-success flex flex-row items-center gap-1">
										<CheckCircle2Icon size={16} /> {t('store.selected', 'Selected')}
									</div>
								) : (
									<Button size="sm" type="submit" variant="primary">
										{t('userActions.select', 'Select')}
									</Button>
								)}
							</>
						) : (
							<Alert className="" size="sm" variant="warning">
								{t('store.notAvailable', 'Location link is not available')}
							</Alert>
						)}
					</div>
				</div>
			</div>
		</Form>
	)
}
