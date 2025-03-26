import { Logo } from '~/components/theme/logo.tsx'
import { useTranslation } from 'react-i18next'
import { H1 } from '~/components/typography/h1.tsx'
import { P } from '~/components/typography/p.tsx'

export const HomeHero: React.FC = () => {
	const { t } = useTranslation()
	return (
		<div className={'bg-primary text-primary-content relative w-full'}>
			<div className={'mx-auto flex flex-col items-center gap-2 p-8'}>
				<Logo variant={'xl'} />
				<H1>{t('home.hero.title', 'NeNaNa')}</H1>
				<P>{t('home.hero.sub', 'Netzwerk Natürliche Nahrung')}</P>
			</div>
		</div>
	)
}
