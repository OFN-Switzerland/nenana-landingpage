export {}

declare global {
	interface Window {
		ENV: {
			INSTANCE_NAME: string
			NODE_ENV: string
			STORE_DATA_URL: string
			VERSION: string
		}
	}
}
