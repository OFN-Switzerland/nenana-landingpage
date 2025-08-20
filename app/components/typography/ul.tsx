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

export function UL({ children, className, variant }: ParagraphProps) {
	return <ul className={cn([paragraphVariants({ variant }), className])}>{children}</ul>
}
