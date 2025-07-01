import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { type FieldValues, type UseFormRegister } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { cn } from '~/lib/utils.ts'

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

interface CheckboxCombo
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
		VariantProps<typeof variants> {
	defaultValues?: Record<string, any>
	description?: string
	error?: Record<string, { message?: string }>
	label?: string
	options: CheckboxOption[]
	register?: UseFormRegister<FieldValues>
}

interface CheckboxOption {
	description?: string
	fieldName: string
	label: string
	value?: boolean
}

export const CheckboxCombo: React.FC<CheckboxCombo> = ({
	className,
	defaultValues,
	description,
	error,
	label,
	onChange,
	options = [],
	register,
	size,
	variant,
	...props
}) => {
	const generatedId = React.useId()
	const groupId = props.id || generatedId
	const { t } = useTranslation()

	// Create a memoized defaultValues object that combines explicitly passed defaultValues
	// with any values provided in the options array
	const mergedDefaultValues = React.useMemo(() => {
		const valuesFromOptions: Record<string, boolean> = {}
		options.forEach((option) => {
			if (option.value !== undefined) {
				valuesFromOptions[option.fieldName] = option.value
			}
		})

		return {
			...valuesFromOptions,
			...(defaultValues || {}),
		}
	}, [options, defaultValues])

	return (
		<fieldset className="fieldset">
			{label && (
				<legend className="fieldset-legend">
					<span className="label-text">{label}</span>
				</legend>
			)}

			<div className="flex flex-col gap-2">
				{options.map((option) => {
					const optionId = `${groupId}-${option.fieldName}`
					const fieldName = option.fieldName
					const fieldError = error?.[fieldName]

					// Get the register props with default value if available
					const registerProps = register
						? register(fieldName, {
								value: mergedDefaultValues[fieldName],
							})
						: {}

					// Get initial checked state from merged default values
					const isChecked = mergedDefaultValues[fieldName] === true

					return (
						<div className="flex flex-col gap-1" key={optionId}>
							<div className="">
								<label className="label" htmlFor={optionId}>
									<input
										className={cn(
											'checkbox',
											variants({
												className,
												size,
												variant: fieldError?.message ? 'error' : variant,
											}),
										)}
										defaultChecked={isChecked}
										id={optionId}
										type="checkbox"
										{...registerProps}
										onChange={(e) => {
											// Make sure the react-hook-form onChange handler is called
											;(registerProps as any)?.onChange?.(e)
											// Then call any additional onChange handler passed to the component
											if (onChange) {
												onChange(e)
											}
										}}
										{...props}
									/>
									{option.label}
								</label>
							</div>

							{option.description && (
								<p className="ml-7 text-sm opacity-70">{option.description}</p>
							)}

							{fieldError?.message && (
								<p className="text-error ml-7 text-sm">{t(fieldError.message)}</p>
							)}
						</div>
					)
				})}
			</div>

			{description && (
				<p className="fieldset-label mt-2">
					<span>{description}</span>
				</p>
			)}
		</fieldset>
	)
}

// Display name for React DevTools
CheckboxCombo.displayName = 'CheckboxCombo'
