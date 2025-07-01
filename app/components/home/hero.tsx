import { useTranslation } from 'react-i18next'
import { href, Link } from 'react-router'

import { LogoText } from '~/components/theme/logo-text.tsx'
import { Logo } from '~/components/theme/logo.tsx'

export const HomeHero: React.FC = () => {
	const { t } = useTranslation()
	return (
		<div className="bg-primary text-primary-content relative w-full">
			<div className="mx-auto hidden flex-col items-center gap-2 p-8 md:flex">
				<Link to={href('/')}>
					<Logo variant="xl" />
				</Link>
				<LogoText variant="sm" />
				<p className="text-lg">{t('home.hero.sub', 'Netzwerk Natürliche Nahrung')}</p>
			</div>
			<div className="mx-auto flex flex-col items-center gap-2 p-8 md:hidden">
				<Link to={href('/')}>
					<Logo variant="md" />
				</Link>
				<LogoText variant="xs" />
				<p className="text-lg">{t('home.hero.sub', 'Netzwerk Natürliche Nahrung')}</p>
			</div>
		</div>
	)
}
