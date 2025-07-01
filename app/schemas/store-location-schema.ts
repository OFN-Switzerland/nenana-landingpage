import { z } from 'zod'

const coordinatesSchema = z.object({
	latitude: z.number(),
	longitude: z.number(),
})

// Address schema
export const addressSchema = z.object({
	city: z.string(),
	country: z.string(),
	position: coordinatesSchema,
	state: z.string(),
	street: z.string(),
	zip: z.string(),
})

// Contact schema
export const contactSchema = z.object({
	email: z.string().optional().nullable(),
	phone: z.string().optional().nullable(),
})

// Store schema
export const storeSchema = z.object({
	address: addressSchema,
	contact: contactSchema,
	description: z.string().nullable(),
	forwardUrl: z.string().nullable(),
	id: z.number(),
	name: z.string().min(1, { message: 'Store name is required' }),
	registrationRecipientEmail: z
		.string()
		.email({ message: 'A valid email address for registration recipients is required' }),
	status: z.enum(['active', 'hidden']).default('hidden'),
})

// Main store data schema
export const storeDataSchema = z.object({
	date: z.string().datetime({ message: 'Date must be in ISO format' }),
	stores: z.array(storeSchema),
	version: z.number(),
})

// Export type definitions derived from the schemas
export type Address = z.infer<typeof addressSchema>
export type Contact = z.infer<typeof contactSchema>
export type Store = z.infer<typeof storeSchema>
export type StoreData = z.infer<typeof storeDataSchema>
