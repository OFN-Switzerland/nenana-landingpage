import type React from 'react'

type AppRoute = {
	icon?: React.ReactElement
	name: string
	path: (...args: any) => string
}

export const MenuElements = {
	divider: 'divider',
}

export type Menu = Record<string, MenuItems>

export type MenuDivider = (typeof MenuElements)['divider']

export type MenuItem = AppRoute & {
	children?: MenuItem[]
}

export type MenuItems = (MenuDivider | MenuItem)[]

export const AppMenus: Menu = {
	app: [
		// {
		// 	path: (lang: string) => href('/:lang?/products', { lang }),
		// 	name: t('route.products.name', 'Online Shop'),
		// },
		// {
		// 	path: (lang: string) => href('/:lang?/showroom-store', { lang }),
		// 	name: t('route.store.name', 'Showroom & Store'),
		// },
	],
}
