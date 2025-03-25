import React from 'react'
import { cn } from '~/lib/utils.ts'
import { cva, type VariantProps } from 'class-variance-authority'

const headingVariants = cva('scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0', {
	variants: {
		variant: {
			default: '',
			sm: 'text-sm leading-6',
			md: 'text-md leading-5',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
})

export interface HeadingProps extends VariantProps<typeof headingVariants> {
	children: React.ReactNode
	className?: string
}

export function H2({ children, variant, className }: HeadingProps) {
	return <h2 className={cn([headingVariants({ variant }), className])}>{children}</h2>
}
