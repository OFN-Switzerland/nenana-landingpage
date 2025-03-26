import { useTranslation } from 'react-i18next'
import { Button } from '~/components/ui/button.tsx'
import { Form, href, useRouteLoaderData } from 'react-router'
import { HomeRouteLoaderData } from '~/routes/home.tsx'
import { useMemo } from 'react'
import { useLang } from '~/hooks/use-lang.tsx'
import { toNumber } from 'lodash-es'
import { cn } from '~/lib/utils.ts'
import { CheckCircle2Icon } from 'lucide-react'

type Props = {
	data: StoreDataType['stores'][0]
}

export const StoreCard: React.FC<Props> = ({ data }) => {
	const { t } = useTranslation()
	const { lang } = useLang()
	const loaderData = useRouteLoaderData<HomeRouteLoaderData>('routes/home')

	const isSelected = useMemo(() => {
		return toNumber(loaderData?.storeId) === data.id
	}, [loaderData, data.id])

	return (
		<Form action={href('/:lang?/home', { lang })} method="post">
			<input type="hidden" name="selectedStoreId" value={data.id} />
			<div className={cn('card card-border bg-base-100 h-full drop-shadow-xl')}>
				<div className="card-body">
					<h2 className="card-title">{data.name}</h2>
					<p>{data.description}</p>
					<div className="card-actions items-center justify-end">
						{isSelected ? (
							<div className={'text-success'}>
								<CheckCircle2Icon size={32} />
							</div>
						) : (
							<Button type="submit" variant={'outline'}>
								{t('userActions.select', 'Select')}
							</Button>
						)}
					</div>
				</div>
			</div>
		</Form>
	)
}
