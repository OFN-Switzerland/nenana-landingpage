import { useTranslation } from 'react-i18next'
import { href, Link } from 'react-router'
import { Logo } from '~/components/theme/logo.tsx'

export const Footer: React.FC = () => {
	const { t } = useTranslation()
	return (
		<div className="flex flex-row items-center justify-between">
			<Link to={href('/')}>
				<Logo variant="sm" />
			</Link>
			<div className="flex items-center gap-2 text-xs">
				<div>
					{t('common.footerText', '{{year}} NeNaNA - All rights reserved', {
						year: new Date().getFullYear(),
					})}
				</div>
				{/*<div>*/}
				{/*	<Link to={href('/:lang?/information')}>*/}
				{/*		{t('common.footerLegalInformation', 'Legal information')}*/}
				{/*	</Link>*/}
				{/*</div>*/}
			</div>
		</div>
	)
}
