import React from 'react'

type AppRoute = {
	path: (...args: any) => string
	name: string
	icon?: React.ReactElement
}

export const MenuElements = {
	divider: 'divider',
}

export type MenuItem = AppRoute & {
	children?: MenuItem[]
}

export type MenuDivider = (typeof MenuElements)['divider']

export type MenuItems = (MenuItem | MenuDivider)[]

export type Menu = Record<string, MenuItems>

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
