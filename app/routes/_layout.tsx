import { href, Link, Outlet } from 'react-router'
import { LayoutContainer } from '~/components/layout/layout-container.tsx'
import { Logo } from '~/components/theme/logo.tsx'
import { Footer } from '~/components/layout/footer.tsx'

export function Layout() {
	return (
		<div className={'flex h-full grow flex-col'}>
			<div className={'navbar-desktop hidden flex-col items-center py-4 md:flex'}>
				<LayoutContainer>
					<div className={'flex flex-row items-center justify-between'}>
						<Link to={href('/')}>
							<Logo variant={'lg'} />
						</Link>
					</div>
				</LayoutContainer>
			</div>
			<div className={'flex grow flex-col items-center px-3 pt-16 pb-8 md:p-0'}>
				<LayoutContainer>
					<Outlet />
				</LayoutContainer>
			</div>
			<div
				className={
					'navbar-mobile bg-background/25 fixed top-0 right-0 bottom-auto left-0 flex items-center gap-2 px-3 py-2 backdrop-blur md:hidden'
				}>
				<div className={'flex flex-1'}>
					<div className={'mr-auto'}>
						<Link to={href('/')} className={'block w-16'}>
							<Logo variant={'sm'}></Logo>
						</Link>
					</div>
				</div>
			</div>
			<div className={'bg-secondary mt-8 hidden flex-col items-center py-2 md:flex'}>
				<Footer />
			</div>
		</div>
	)
}
