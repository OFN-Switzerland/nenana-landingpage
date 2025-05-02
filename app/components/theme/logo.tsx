import { cva, type VariantProps } from 'class-variance-authority'
import image from './logos/logo_300.png'
import { cn } from '~/lib/utils'

export const variants = cva(['object-contain'], {
	variants: {
		variant: {
			sm: 'w-8',
			md: 'w-20',
			lg: 'w-32',
			xl: 'w-48',
		},
	},
	defaultVariants: {
		variant: 'md',
	},
})

interface Props extends VariantProps<typeof variants> {
	className?: string
}

export function Logo({ variant, className }: Props) {
	return <img src={image} className={cn([variants({ variant }), className])} alt="" />
}
