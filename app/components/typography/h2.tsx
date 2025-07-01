import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'

import { cn } from '~/lib/utils.ts'

const headingVariants = cva(
	'w-full scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0',
	{
		defaultVariants: {
			variant: 'default',
		},
		variants: {
			variant: {
				default: '',
				md: 'text-md leading-5',
				sm: 'text-sm leading-6',
			},
		},
	},
)

export interface HeadingProps extends VariantProps<typeof headingVariants> {
	children: React.ReactNode
	className?: string
}

export function H2({ children, className, variant }: HeadingProps) {
	return <h2 className={cn([headingVariants({ variant }), className])}>{children}</h2>
}
