import { cva, type VariantProps } from 'class-variance-authority'
import { type PropsWithChildren } from 'react'

const layoutContainerVariants = cva(
	'container flex max-w-[1280px] grow px-0 md:px-4 lg:px-4 xl:px-0',
	{
		variants: {
			variant: {
				default: 'flex-col gap-8',
				row: 'flex-row gap-8',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
)

type Props = PropsWithChildren<VariantProps<typeof layoutContainerVariants>>

export const LayoutContainer: React.FC<Props> = ({ children, variant }) => {
	return <div className={layoutContainerVariants({ variant })}>{children}</div>
}
