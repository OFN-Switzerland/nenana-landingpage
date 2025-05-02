import { useTranslation } from 'react-i18next'
import { LogoText } from '~/components/theme/logo-text.tsx'
import { Logo } from '~/components/theme/logo.tsx'

export const HomeHero: React.FC = () => {
	const { t } = useTranslation()
	return (
		<div className="bg-primary text-primary-content relative w-full">
			<div className="mx-auto hidden flex-col items-center gap-2 p-8 md:flex">
				<Logo variant="xl" />
				<LogoText variant="sm" />
				<p className="text-lg">{t('home.hero.sub', 'Netzwerk Natürliche Nahrung')}</p>
			</div>
			<div className="mx-auto flex flex-col items-center gap-2 p-8 md:hidden">
				<Logo variant="md" />
				<LogoText variant="xs" />
				<p className="text-lg">{t('home.hero.sub', 'Netzwerk Natürliche Nahrung')}</p>
			</div>
		</div>
	)
}
