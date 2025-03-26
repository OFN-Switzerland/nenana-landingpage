import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'

import { cn } from '~/lib/utils'

const paragraphVariants = cva('mb-6 leading-7', {
	variants: {
		variant: {
			default: '',
			sm: 'text-sm leading-6 font-light',
			lead: 'text-lg leading-8 font-light md:text-xl',
			muted: 'text-muted-foreground text-sm',
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
