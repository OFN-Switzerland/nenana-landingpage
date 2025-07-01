import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'

import { cn } from '~/lib/utils'

const paragraphVariants = cva('my-6 ml-6 list-disc [&>li]:mt-2', {
	defaultVariants: {
		variant: 'default',
	},
	variants: {
		variant: {
			default: '',
			lead: 'text-lg font-light leading-8 md:text-xl',
			muted: 'text-sm text-muted-foreground',
			sm: 'text-sm font-light leading-6',
		},
	},
})

export interface ParagraphProps extends VariantProps<typeof paragraphVariants> {
	children: React.ReactNode
	className?: string
}

export function UL({ children, className, variant }: ParagraphProps) {
	return <ul className={cn([paragraphVariants({ variant }), className])}>{children}</ul>
}
