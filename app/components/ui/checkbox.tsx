import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { useTranslation } from 'react-i18next'

import { cn } from '~/lib/utils'

const variants = cva('checkbox', {
	defaultVariants: {
		size: 'md',
		variant: 'default',
	},
	variants: {
		size: {
			lg: 'checkbox-lg',
			md: '',
			sm: 'checkbox-sm',
			xs: 'checkbox-xs',
		},
		variant: {
			accent: 'checkbox-accent',
			default: 'checkbox-bordered',
			error: 'checkbox-error',
			ghost: 'checkbox-ghost',
			info: 'checkbox-info',
			primary: 'checkbox-primary',
			secondary: 'checkbox-secondary',
			success: 'checkbox-success',
			warning: 'checkbox-warning',
		},
	},
})

interface CheckboxProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
		VariantProps<typeof variants> {
	description?: string
	error?: {
		message?: string
	}
	label: string
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
	({ className, description, error, label, size, variant, ...props }, ref) => {
		const generatedId = React.useId()
		const id = props.id || generatedId
		const { t } = useTranslation()

		return (
			<fieldset className="fieldset">
				<legend className="fieldset-legend">
					<label className="label cursor-pointer whitespace-break-spaces" htmlFor={id}>
						<input
							className={cn(
								variants({ className, size, variant: error?.message ? 'error' : variant }),
							)}
							id={id}
							ref={ref}
							type="checkbox"
							{...props}
						/>
						{label}
					</label>
				</legend>

				{(error?.message || description) && (
					<p className="fieldset-label">
						{error?.message && <span className="text-error">{t(error.message)}</span>}
						{description && !error && <span className="">{description}</span>}
					</p>
				)}
			</fieldset>
		)
	},
)
