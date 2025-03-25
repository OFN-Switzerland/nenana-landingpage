import { Logo } from '~/components/theme/logo.tsx'
import { P } from '~/components/typography/p.tsx'
import { useTranslation } from 'react-i18next'

export const HomeHero: React.FC = () => {
	const { t } = useTranslation()
	return (
		<div className={'relative overflow-hidden rounded bg-gray-100'}>
			<div className={'absolute inset-0 top-auto bg-black/25 text-white backdrop-blur-sm'}>
				<div className={'mx-auto flex flex-col items-center gap-2 p-8'}>
					<Logo variant={'xl'} />
					<P>{t('home.hero.sub', 'Welcome to NeNaNa')}</P>
				</div>
			</div>
		</div>
	)
}
