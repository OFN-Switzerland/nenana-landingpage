import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'

import { cn } from '~/lib/utils.ts'

const headingVariants = cva('w-full scroll-m-20 font-extrabold tracking-tight', {
	defaultVariants: {
		variant: 'default',
	},
	variants: {
		variant: {
			default: 'text-3xl lg:text-4xl',
			md: 'text-md leading-5',
			sm: 'text-lg lg:text-xl',
		},
	},
})

export interface HeadingProps extends VariantProps<typeof headingVariants> {
	children: React.ReactNode
	className?: string
}

export function H1({ children, className, variant }: HeadingProps) {
	return <h1 className={cn([headingVariants({ variant }), className])}>{children}</h1>
}
