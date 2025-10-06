export enum GenericAppEvents {
	Error = 'app.error',
	PageView = 'pageview',
}

export enum RegistrationEvents {
	Completed = 'registration.completed',
	FormCancel = 'registration.formCancel',
	FormStart = 'registration.formStart',
	FormSubmit = 'registration.formSubmit',
	OptInEmail = 'registration.optInEmail',
	SkipRegistration = 'registration.skipRegistration',
	ViewInstructions = 'registration.viewInstructions',
}

export enum StoreSelectionEvents {
	CancelRedirect = 'store.cancelRedirect',
	FilterStores = 'store.filterStores',
	MapToggle = 'store.mapToggle',
	Select = 'store.select',
	ViewInfo = 'store.viewInfo',
}

export enum UserActionEvents {
	ContinueToShop = 'user.continueToShop',
	NavigateToStore = 'user.navigateToStore',
}

export type PlausibleEventNames =
	| GenericAppEventNames
	| RegistrationEventNames
	| StoreSelectionEventNames
	| UserActionEventNames

type GenericAppEventNames = (typeof GenericAppEvents)[keyof typeof GenericAppEvents]

type RegistrationEventNames = (typeof RegistrationEvents)[keyof typeof RegistrationEvents]

type StoreSelectionEventNames = (typeof StoreSelectionEvents)[keyof typeof StoreSelectionEvents]

type UserActionEventNames = (typeof UserActionEvents)[keyof typeof UserActionEvents]
