import { z } from 'zod'

const coordinatesSchema = z.object({
	latitude: z.number(),
	longitude: z.number(),
})

// Address schema
export const addressSchema = z.object({
	street: z.string(),
	city: z.string(),
	state: z.string(),
	zip: z.string(),
	country: z.string(),
	position: coordinatesSchema,
})

// Contact schema
export const contactSchema = z.object({
	phone: z.string().optional().nullable(),
	email: z.string().optional().nullable(),
})

// Store schema
export const storeSchema = z.object({
	id: z.number(),
	name: z.string().min(1, { message: 'Store name is required' }),
	description: z.string().nullable(),
	address: addressSchema,
	contact: contactSchema,
	forwardUrl: z.string().url({ message: 'Forward URL must be a valid URL' }),
})

// Main store data schema
export const storeDataSchema = z.object({
	version: z.number(),
	date: z.string().datetime({ message: 'Date must be in ISO format' }),
	stores: z.array(storeSchema),
})

// Export type definitions derived from the schemas
export type Address = z.infer<typeof addressSchema>
export type Contact = z.infer<typeof contactSchema>
export type Store = z.infer<typeof storeSchema>
export type StoreData = z.infer<typeof storeDataSchema>
