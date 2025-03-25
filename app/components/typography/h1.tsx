import React from 'react'
import { cn } from '~/lib/utils.ts'
import { cva, type VariantProps } from 'class-variance-authority'

const headingVariants = cva('scroll-m-20 font-extrabold tracking-tight', {
	variants: {
		variant: {
			default: 'text-4xl lg:text-5xl',
			sm: 'text-lg lg:text-xl',
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

export function H1({ children, variant, className }: HeadingProps) {
	return <h1 className={cn([headingVariants({ variant }), className])}>{children}</h1>
}
