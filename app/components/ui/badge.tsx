import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'

import { cn } from '~/lib/utils'

const variants = cva('badge', {
	variants: {
		variant: {
			default: 'badge-md',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
})

interface Props extends VariantProps<typeof variants> {
	children: React.ReactNode
	className?: string
}

export function Badge({ children, variant, className }: Props) {
	return <div className={cn([variants({ variant }), className])}>{children}</div>
}
