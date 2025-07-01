import { useTranslation } from 'react-i18next'
import { data, href, Link, type LoaderFunctionArgs } from 'react-router'

import { H1 } from '~/components/typography/h1.tsx'
import { P } from '~/components/typography/p.tsx'
import { Button } from '~/components/ui/button.tsx'

export default function Error404() {
	const { t } = useTranslation()
	return (
		<div className="flex flex-col items-center justify-center gap-8 py-24">
			<H1>{t('common.404.title', 'Page not found')}</H1>
			<P>{t('common.404.message', 'The page you were looking for does not exist.')}</P>
			<Link to={href('/')}>
				<Button>{t('common.404.goBack', 'Go back')}</Button>
			</Link>
		</div>
	)
}

export async function loader({}: LoaderFunctionArgs) {
	return data(null, {
		status: 404,
		statusText: 'Not Found',
	})
}
