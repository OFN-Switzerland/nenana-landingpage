import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'

import { cn } from '~/lib/utils'

const paragraphVariants = cva('leading-7 [&:not(:first-child)]:mt-6', {
	variants: {
		variant: {
			default: '',
			sm: 'text-sm font-light leading-6',
			lead: 'text-lg font-light leading-8 md:text-xl',
			muted: 'text-sm text-muted-foreground',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
})

export interface ParagraphProps extends VariantProps<typeof paragraphVariants> {
	children: React.ReactNode
	className?: string
}

export function P({ children, variant, className }: ParagraphProps) {
	return <p className={cn([paragraphVariants({ variant }), className])}>{children}</p>
}
