import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import {
	type ActionFunctionArgs,
	data,
	Form,
	href,
	type LoaderFunctionArgs,
	type MetaFunction,
	redirect,
	useLoaderData,
	useNavigate,
} from 'react-router'
import { getValidatedFormData, useRemixForm } from 'remix-hook-form'
import { z } from 'zod'

import { LayoutContainer } from '~/components/layout/layout-container.tsx'
import { H1 } from '~/components/typography/h1.tsx'
import { H2 } from '~/components/typography/h2.tsx'
import { P } from '~/components/typography/p.tsx'
import { Alert } from '~/components/ui/alert.tsx'
import { Button } from '~/components/ui/button.tsx'
import { CheckboxCombo } from '~/components/ui/checkbox-combo.tsx'
import { Checkbox } from '~/components/ui/checkbox.tsx'
import { Input } from '~/components/ui/input.tsx'
import { getUserPreferences } from '~/lib/cookies/store-selection/get-user-preferences.tsx'
import { logger } from '~/lib/logger.ts'
import {
	type HubApplicationEmailsOptions,
	sendHubApplicationEmails,
} from '~/lib/mails/hub-application.tsx'
import { getInstance } from '~/middleware/i18next.ts'
import { ErrorBoundaryShared } from '~/services/error-boundary-shared.tsx'

import { type Route as RootRoute } from '../../.react-router/types/app/+types/root.ts'

// Define the form schema using Zod
const registrationSchema = z.object({
	email: z.string().email({ message: 'Please enter a valid email address' }),
	name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
	notificationsByEmail: z.boolean(),
	notificationsByTelegram: z.boolean(),
	phone: z
		.string()
		.min(5, { message: 'Phone number must be at least 5 characters long' })
		.regex(/^[0-9+\-\s()]*$/, { message: 'Please enter a valid phone number' }),
	registrationRecipientEmail: z.string().email({ message: 'Please enter a valid email address' }),
	storeId: z.string(),
	storeName: z.string(),
	termsAccepted: z.boolean().refine((val) => val === true, {
		message: 'You must accept the terms to register',
	}),
})

type RegistrationFormData = z.infer<typeof registrationSchema>
const resolver = zodResolver(registrationSchema)

export const loader = async ({ context, request }: LoaderFunctionArgs) => {
	const { t } = getInstance(context as any)
	const preferences = await getUserPreferences(request)

	logger.debug('preferences', preferences)

	if (!preferences) {
		return redirect(href('/'))
	}

	return data({
		...preferences,
		description: t(
			'routes.register.description',
			'Register with Ne\'Na\'Na to access a store directly via this website.',
		),
		title: t('routes.register.title', 'Ne\'Na\'Na Registration'),
	})
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	return [
		{ title: data?.title },
		{
			content: data?.description,
			name: 'description',
		},
	]
}

export async function action({ context, request }: ActionFunctionArgs) {
	const { language: lang } = getInstance(context as any)
	const {
		data,
		errors,
		receivedValues: defaultValues,
	} = await getValidatedFormData(request, resolver)

	if (errors) {
		return { defaultValues, errors }
	}

	// send data to a predefined POST endpoint
	if (!process.env.REGISTRATION_ENDPOINT_URL) {
		throw new Error('REGISTRATION_ENDPOINT_URL environment variable is not set')
	}

	if (!process.env.REGISTRATION_ENDPOINT_USER || !process.env.REGISTRATION_ENDPOINT_PW) {
		throw new Error(
			'REGISTRATION_ENDPOINT_USER or REGISTRATION_ENDPOINT_PW environment variable is not set',
		)
	}

	try {
		const authString = `${process.env.REGISTRATION_ENDPOINT_USER}:${process.env.REGISTRATION_ENDPOINT_PW}`
		const base64Auth = Buffer.from(authString).toString('base64')

		await fetch(process.env.REGISTRATION_ENDPOINT_URL, {
			body: JSON.stringify(data),
			headers: {
				Authorization: `Basic ${base64Auth}`,
				'Content-Type': 'application/json',
			},
			method: 'POST',
		})
	} catch (error) {
		console.error(error)
		return {
			defaultValues,
			errors: { registration: 'Registration failed to be sent to defined endpoint' },
		}
	}

	const customerData: HubApplicationEmailsOptions['customerData'] = {
		acceptedTerms: data.termsAccepted,
		email: data.email,
		name: data.name,
		notificationsByEmail: data.notificationsByEmail,
		notificationsByTelegram: data.notificationsByTelegram,
		phone: data.phone,
	}

	const hubData: HubApplicationEmailsOptions['hubData'] = {
		id: data.storeId,
		name: data.storeName,
	}

	await sendHubApplicationEmails({
		customerData,
		hubData,
		languageCode: lang,
		registrationRecipientEmail: data.registrationRecipientEmail,
	})

	logger.debug('Registration form submitted', data)
	return redirect(href('/:lang/registration/sent', { lang }))
}

export function ErrorBoundary(args: RootRoute.ErrorBoundaryProps) {
	return ErrorBoundaryShared(args)
}

export default function Register() {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const loaderData = useLoaderData<typeof loader>()
	const {
		formState: { errors, isLoading, isSubmitting, isValid },
		handleSubmit,
		register,
	} = useRemixForm<RegistrationFormData>({
		mode: 'onTouched',
		resolver,
	})

	const onCancelClick = async () => {
		await navigate(href('/'))
	}

	const disabled = !isValid || isSubmitting || isLoading

	return (
		<>
			<LayoutContainer>
				<H1 className="card-title">
					{t('register.title', 'Ne\'Na\'Na Box Registration')}
				</H1>
				<H2>{t('register.box.title', 'Registration instructions')}</H2>
				<Alert>
					<div>
						<Trans i18nKey="register.box.p1">
							In order to shop at this hub, Ne'Na'Na must register you as a customer.{' '}
							<strong>
								Only customers who registered using this form can make purchases on OpenFoodNetwork
							</strong>
							. To do so, fill out the form below and submit it.
						</Trans>
					</div>
				</Alert>
				<P>
					<Trans i18nKey="register.box.p2">
						After submitting the form, Ne'Na'Na will manually add you to your hub.{' '}
						<strong>
							Please note that you will not be able to make purchases until this has been done
						</strong>
						. Once you have been added as a customer, you will receive a welcome email from
						Ne'Na'Na. This email contains all the information you need to proceed, as well as
						information you will need for shopping (information about OFN, access to the depot,
						order cycle procedures, etc.).
					</Trans>
				</P>
			</LayoutContainer>
			<LayoutContainer>
				<div className="card bg-base-100 w-full shadow-xl">
					<div className="card-body flex flex-col gap-9">
						<Form className="space-y-6" method="POST" onSubmit={handleSubmit}>
							<Input
								{...register('name')}
								autoComplete="name"
								description={t('register.form.description.name', 'Your first and last name')}
								error={errors.name}
								label={t('register.form.label.name', 'Name')}
								required
								type="text"
							/>
							<Input
								{...register('email')}
								autoComplete="email"
								description={t(
									'register.form.description.email',
									'The email address we should use to contact you',
								)}
								error={errors.email}
								label={t('register.form.label.email', 'Email')}
								required
								type="email"
							/>
							<Input
								{...register('phone')}
								autoComplete="tel"
								description={t('register.form.description.phone', 'Your phone number')}
								error={errors.phone}
								label={t('register.form.label.phone', 'Phone')}
								required
								type="tel"
							/>
							<CheckboxCombo
								description={t(
									'register.form.description.communication',
									"Ne'Na'Na can send you reminders so you don't miss your weekly order cycle, as well as information about events and special offers. You can choose none, one or both.",
								)}
								error={errors}
								label={t(
									'register.form.label.communication',
									'Would you like to subscribe to the Ne\'Na\'Na newsletter?',
								)}
								options={[
									{
										fieldName: 'notificationsByEmail',
										label: t('register.form.label.notificationsByEmail', 'Yes, by Email'),
										value: true,
									},
								]}
								register={register as any}
							/>
							<Checkbox
								{...register('termsAccepted')}
								label={t(
									'register.form.label.termsAccepted',
									'I accept the terms of use: By submitting this form, I agree that Ne\'Na\'Na may contact me to welcome me and provide me with information on how to proceed. I agree that Ne\'Na\'Na may send me weekly order reminders. I can unsubscribe from these at any time.',
								)}
							/>
							{loaderData.selectedStore && (
								<>
									<input
										type="hidden"
										{...register('registrationRecipientEmail')}
										value={loaderData.selectedStore.registrationRecipientEmail}
									/>
									<input
										type="hidden"
										{...register('storeName')}
										value={loaderData.selectedStore.name}
									/>
									<input
										type="hidden"
										{...register('storeId')}
										value={loaderData.selectedStore.id}
									/>
								</>
							)}
							<div className="card-actions justify-between">
								<Button disabled={disabled} type="submit" variant="primary">
									{t('actions.register', 'Register')}
								</Button>
								<Button onClick={onCancelClick} type="button" variant="secondary">
									{t('actions.cancel', 'Cancel')}
								</Button>
							</div>
						</Form>
					</div>
				</div>
			</LayoutContainer>
		</>
	)
}
