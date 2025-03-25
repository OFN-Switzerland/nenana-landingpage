// Extract function to check if an item is a MenuDivider
import { type MenuDivider, type MenuItem } from '~/config/navigation/app-menus.tsx'

export const isMenuItem = (item: MenuItem | MenuDivider): item is MenuItem => {
	return typeof item === 'object' && 'path' in item && 'name' in item
}
