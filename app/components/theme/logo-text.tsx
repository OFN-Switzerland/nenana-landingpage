import { cva, type VariantProps } from 'class-variance-authority'

import { LogoTextSvg } from '~/components/theme/logos/text.tsx'
import { cn } from '~/lib/utils'

export const variants = cva(['object-contain'], {
	defaultVariants: {
		variant: 'md',
	},
	variants: {
		variant: {
			lg: 'h-12',
			md: 'h-10',
			sm: 'h-8',
			xl: 'h-16',
			xs: 'h-6',
		},
	},
})

interface Props extends VariantProps<typeof variants> {
	className?: string
}

export function LogoText({ className, variant }: Props) {
	return <LogoTextSvg className={cn([variants({ variant }), className])} />
}
