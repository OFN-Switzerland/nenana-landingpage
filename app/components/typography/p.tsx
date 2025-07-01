import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'

import { cn } from '~/lib/utils'

const paragraphVariants = cva('mb-6 leading-7', {
	defaultVariants: {
		variant: 'default',
	},
	variants: {
		variant: {
			default: '',
			lead: 'text-lg leading-8 font-light md:text-xl',
			muted: 'text-muted-foreground text-sm',
			sm: 'text-sm leading-6 font-light',
		},
	},
})

export interface ParagraphProps extends VariantProps<typeof paragraphVariants> {
	children: React.ReactNode
	className?: string
}

export function P({ children, className, variant }: ParagraphProps) {
	return <p className={cn([paragraphVariants({ variant }), className])}>{children}</p>
}
