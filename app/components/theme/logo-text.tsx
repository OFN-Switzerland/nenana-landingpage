import { cva, type VariantProps } from 'class-variance-authority'
import { LogoTextSvg } from '~/components/theme/logos/text.tsx'
import { cn } from '~/lib/utils'

export const variants = cva(['object-contain'], {
	variants: {
		variant: {
			sm: 'h-8',
			md: 'h-10',
			lg: 'h-12',
			xl: 'h-16',
		},
	},
	defaultVariants: {
		variant: 'md',
	},
})

interface Props extends VariantProps<typeof variants> {
	className?: string
}

export function LogoText({ variant, className }: Props) {
	return <LogoTextSvg className={cn([variants({ variant }), className])} />
}
