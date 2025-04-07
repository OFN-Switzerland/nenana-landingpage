import { useTranslation } from 'react-i18next'
import { LogoText } from '~/components/theme/logo-text.tsx'
import { Logo } from '~/components/theme/logo.tsx'

export const HomeHero: React.FC = () => {
	const { t } = useTranslation()
	return (
		<div className="bg-primary text-primary-content relative w-full">
			<div className="mx-auto flex flex-col items-center gap-2 p-8">
				<Logo variant="xl" />
				<LogoText variant="sm" />
				<p className="text-lg">{t('home.hero.sub', 'Netzwerk Natürliche Nahrung')}</p>
			</div>
		</div>
	)
}
