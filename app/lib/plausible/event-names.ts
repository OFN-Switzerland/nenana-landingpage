export enum GenericAppEvents {
	OnboardingCompleted = 'app.onboardingCompleted',
	SessionTimedOut = 'app.sessionTimedOut',
	Error = 'app.error',
	PageView = 'pageview',
}

export enum UserActionEvents {
	SignUp = 'user.signUp',
	SignIn = 'user.signIn',
	SignInFailed = 'user.signInFailed',
	SignInFailedLocked = 'user.signInFailedLocked',
	SignOut = 'user.signOut',
	SignUpFailed = 'user.signUpFailed',
	PasswordResetInitiate = 'user.passwordResetInitiate',
	PasswordResetFailed = 'user.passwordResetFailed',
	PasswordResetComplete = 'user.passwordResetComplete',
	PasswordChange = 'user.passwordChange',
	PasswordChangeFailed = 'user.passwordChangeFailed',
}

export enum JourneyEvents {
	Create = 'journey.create',
	CreateFailed = 'journey.createFailed',
	Update = 'journey.update',
	UpdateFailed = 'journey.updateFailed',
	Delete = 'journey.delete',
}

export enum StepEvents {
	Create = 'step.create',
	CreateFailed = 'step.createFailed',
	Update = 'step.update',
	UpdateFailed = 'step.updateFailed',
	Delete = 'step.delete',
}

export enum TaskEvents {
	Create = 'task.create',
	CreateFailed = 'task.createFailed',
	Update = 'task.update',
	UpdateFailed = 'task.updateFailed',
	Delete = 'task.delete',
}

export enum DiaryEvents {
	Create = 'diary.create',
	Update = 'diary.update',
	Deleted = 'diary.delete',
}

export enum NoteEvents {
	Create = 'note.create',
	Update = 'note.update',
	Delete = 'note.delete',
}

export enum AlbumEvents {
	Create = 'album.create',
	Update = 'album.update',
	Delete = 'album.delete',
}

export enum InvitationEvents {
	Create = 'invitation.create',
	CreateFailed = 'invitation.createFailed',
	Accept = 'invitation.accept',
	Reject = 'invitation.reject',
}

export enum JourneyLinkEvents {
	Create = 'journeyLink.create',
	CreateFailed = 'journeyLink.createFailed',
	Delete = 'journeyLink.delete',
	View = 'journeyLink.view',
	ViewFailed = 'journeyLink.viewFailed',
}

export enum FeedbackEvents {
	Create = 'feedback.create',
	CreateFailed = 'feedback.createFailed',
}

type GenericAppEventNames = (typeof GenericAppEvents)[keyof typeof GenericAppEvents]
type UserActionEventNames = (typeof UserActionEvents)[keyof typeof UserActionEvents]
type JourneyEventNames = (typeof JourneyEvents)[keyof typeof JourneyEvents]
type StepEventNames = (typeof StepEvents)[keyof typeof StepEvents]
type TaskEventNames = (typeof TaskEvents)[keyof typeof TaskEvents]
type DiaryEventNames = (typeof DiaryEvents)[keyof typeof DiaryEvents]
type NoteEventNames = (typeof NoteEvents)[keyof typeof NoteEvents]
type AlbumEventNames = (typeof AlbumEvents)[keyof typeof AlbumEvents]
type InvitationEventNames = (typeof InvitationEvents)[keyof typeof InvitationEvents]
type JourneyLinkEventNames = (typeof JourneyLinkEvents)[keyof typeof JourneyLinkEvents]
type FeedbackEventNames = (typeof FeedbackEvents)[keyof typeof FeedbackEvents]

export type PlausibleEventNames =
	| GenericAppEventNames
	| UserActionEventNames
	| JourneyEventNames
	| StepEventNames
	| TaskEventNames
	| DiaryEventNames
	| NoteEventNames
	| AlbumEventNames
	| InvitationEventNames
	| JourneyLinkEventNames
	| FeedbackEventNames
