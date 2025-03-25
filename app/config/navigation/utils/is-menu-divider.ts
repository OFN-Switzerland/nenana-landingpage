import { type MenuDivider, MenuElements, type MenuItem } from '~/config/navigation/app-menus.tsx'

export const isMenuDivider = (item: MenuItem | MenuDivider): item is MenuDivider => {
	return item === MenuElements.divider
}
