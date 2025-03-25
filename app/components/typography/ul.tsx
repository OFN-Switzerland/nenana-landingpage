import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'

import { cn } from '~/lib/utils'

const paragraphVariants = cva('my-6 ml-6 list-disc [&>li]:mt-2', {
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

export function UL({ children, variant, className }: ParagraphProps) {
	return <ul className={cn([paragraphVariants({ variant }), className])}>{children}</ul>
}
