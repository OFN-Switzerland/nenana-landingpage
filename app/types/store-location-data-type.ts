interface StoreDataType {
	version: number
	date: string
	stores: Store[]
}

interface Store {
	id: number
	name: string
	description: string
	forwardUrl: string
}
