export {}

declare global {
	interface Window {
		ENV: {
			INSTANCE_NAME: string
			NODE_ENV: string
			VERSION: string
			STORE_DATA_URL: string
		}
	}
}
