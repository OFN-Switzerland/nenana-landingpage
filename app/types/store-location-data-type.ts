interface StoreDataType {
	version: number
	date: string
	stores: Store[]
}

interface Address {
	street: string
	city: string
	state: string
	zip: string
	country: string
}

interface Contact {
	phone: string
	email: string
}

interface Store {
	id: number
	name: string
	description: string
	address: Address
	contact: Contact
	forwardUrl: string
}
