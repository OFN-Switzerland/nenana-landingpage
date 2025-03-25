import { isEmpty } from 'lodash-es'
import { type MenuItem } from '~/config/navigation/app-menus.tsx'

export const hasMenuItemChildren = (item: MenuItem): boolean => {
	return !isEmpty(item.children)
}
