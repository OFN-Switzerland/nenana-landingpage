import { cva, type VariantProps } from 'class-variance-authority'
import { type PropsWithChildren } from 'react'

const layoutContainerVariants = cva('flex w-full max-w-3xl items-center px-3 md:px-0', {
	defaultVariants: {
		variant: 'default',
	},
	variants: {
		variant: {
			default: 'flex-col gap-8',
			row: 'flex-row gap-8',
		},
	},
})

type Props = PropsWithChildren<VariantProps<typeof layoutContainerVariants>>

export const LayoutContainer: React.FC<Props> = ({ children, variant }) => {
	return <div className={layoutContainerVariants({ variant })}>{children}</div>
}
