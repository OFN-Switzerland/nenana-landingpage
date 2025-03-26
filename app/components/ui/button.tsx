import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'

import { cn } from '~/lib/utils'

const variants = cva('btn', {
	variants: {
		variant: {
			primary: 'btn-primary',
			secondary: 'btn-secondary',
			warning: 'btn-warning',
			success: 'btn-success',
			outline: 'btn-outline',
			neutral: 'btn-neutral',
		},
		size: {
			sm: 'btn-sm',
			md: 'btn-md',
			lg: 'btn-lg',
		},
	},
	defaultVariants: {
		variant: 'neutral',
		size: 'md',
	},
})

interface Props
	extends VariantProps<typeof variants>,
		React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode
	className?: string
}

export function Button({ children, variant, className, ...rest }: Props) {
	return (
		<button className={cn([variants({ variant }), className])} {...rest}>
			{children}
		</button>
	)
}
