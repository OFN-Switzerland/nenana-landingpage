import { useTranslation } from 'react-i18next'
import { href, Link } from 'react-router'

import { Logo } from '~/components/theme/logo.tsx'

export const Footer: React.FC = () => {
	const { t } = useTranslation()
	return (
		<div className="mt-6 flex flex-row items-center justify-between md:mt-16">
			<Link to={href('/')}>
				<Logo variant="sm" />
			</Link>
			<div className="flex items-center gap-2 text-xs">
				<div>
					{t('common.footerText', '{{year}} NeNaNA - All rights reserved', {
						year: new Date().getFullYear(),
					})}
				</div>
				<div>
					<Link to="https://nenana.ch">nenana.ch</Link>
				</div>
				<div>
					<Link to="https://tegonal.com">Made with ❤️ by Tegonal</Link>
				</div>
			</div>
		</div>
	)
}
