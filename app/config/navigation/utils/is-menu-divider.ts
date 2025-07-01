import { type MenuDivider, MenuElements, type MenuItem } from '~/config/navigation/app-menus.tsx'

export const isMenuDivider = (item: MenuDivider | MenuItem): item is MenuDivider => {
	return item === MenuElements.divider
}
