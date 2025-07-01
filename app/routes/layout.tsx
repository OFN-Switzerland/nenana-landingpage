import React from 'react'
import { Outlet } from 'react-router'

import { HomeHero } from '~/components/home/hero.tsx'
import { Footer } from '~/components/layout/footer.tsx'
import { LayoutContainer } from '~/components/layout/layout-container.tsx'

export default function Layout() {
	return (
		<div className="flex grow flex-col items-center gap-8 pb-8">
			<HomeHero />
			<LayoutContainer>
				<Outlet />
			</LayoutContainer>
			<Footer />
		</div>
	)
}
