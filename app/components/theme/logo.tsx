import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '~/lib/utils'

import image from './logos/logo_300.png'

export const variants = cva(['object-contain'], {
	defaultVariants: {
		variant: 'md',
	},
	variants: {
		variant: {
			lg: 'w-32',
			md: 'w-20',
			sm: 'w-8',
			xl: 'w-48',
		},
	},
})

interface Props extends VariantProps<typeof variants> {
	className?: string
}

export function Logo({ className, variant }: Props) {
	return <img alt="" className={cn([variants({ variant }), className])} src={image} />
}
