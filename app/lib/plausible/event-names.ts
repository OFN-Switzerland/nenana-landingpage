export enum AlbumEvents {
	Create = 'album.create',
	Delete = 'album.delete',
	Update = 'album.update',
}

export enum DiaryEvents {
	Create = 'diary.create',
	Deleted = 'diary.delete',
	Update = 'diary.update',
}

export enum FeedbackEvents {
	Create = 'feedback.create',
	CreateFailed = 'feedback.createFailed',
}

export enum GenericAppEvents {
	Error = 'app.error',
	OnboardingCompleted = 'app.onboardingCompleted',
	PageView = 'pageview',
	SessionTimedOut = 'app.sessionTimedOut',
}

export enum InvitationEvents {
	Accept = 'invitation.accept',
	Create = 'invitation.create',
	CreateFailed = 'invitation.createFailed',
	Reject = 'invitation.reject',
}

export enum JourneyEvents {
	Create = 'journey.create',
	CreateFailed = 'journey.createFailed',
	Delete = 'journey.delete',
	Update = 'journey.update',
	UpdateFailed = 'journey.updateFailed',
}

export enum JourneyLinkEvents {
	Create = 'journeyLink.create',
	CreateFailed = 'journeyLink.createFailed',
	Delete = 'journeyLink.delete',
	View = 'journeyLink.view',
	ViewFailed = 'journeyLink.viewFailed',
}

export enum NoteEvents {
	Create = 'note.create',
	Delete = 'note.delete',
	Update = 'note.update',
}

export enum StepEvents {
	Create = 'step.create',
	CreateFailed = 'step.createFailed',
	Delete = 'step.delete',
	Update = 'step.update',
	UpdateFailed = 'step.updateFailed',
}

export enum TaskEvents {
	Create = 'task.create',
	CreateFailed = 'task.createFailed',
	Delete = 'task.delete',
	Update = 'task.update',
	UpdateFailed = 'task.updateFailed',
}

export enum UserActionEvents {
	PasswordChange = 'user.passwordChange',
	PasswordChangeFailed = 'user.passwordChangeFailed',
	PasswordResetComplete = 'user.passwordResetComplete',
	PasswordResetFailed = 'user.passwordResetFailed',
	PasswordResetInitiate = 'user.passwordResetInitiate',
	SignIn = 'user.signIn',
	SignInFailed = 'user.signInFailed',
	SignInFailedLocked = 'user.signInFailedLocked',
	SignOut = 'user.signOut',
	SignUp = 'user.signUp',
	SignUpFailed = 'user.signUpFailed',
}

export type PlausibleEventNames =
	| AlbumEventNames
	| DiaryEventNames
	| FeedbackEventNames
	| GenericAppEventNames
	| InvitationEventNames
	| JourneyEventNames
	| JourneyLinkEventNames
	| NoteEventNames
	| StepEventNames
	| TaskEventNames
	| UserActionEventNames
type AlbumEventNames = (typeof AlbumEvents)[keyof typeof AlbumEvents]
type DiaryEventNames = (typeof DiaryEvents)[keyof typeof DiaryEvents]
type FeedbackEventNames = (typeof FeedbackEvents)[keyof typeof FeedbackEvents]
type GenericAppEventNames = (typeof GenericAppEvents)[keyof typeof GenericAppEvents]
type InvitationEventNames = (typeof InvitationEvents)[keyof typeof InvitationEvents]
type JourneyEventNames = (typeof JourneyEvents)[keyof typeof JourneyEvents]
type JourneyLinkEventNames = (typeof JourneyLinkEvents)[keyof typeof JourneyLinkEvents]
type NoteEventNames = (typeof NoteEvents)[keyof typeof NoteEvents]
type StepEventNames = (typeof StepEvents)[keyof typeof StepEvents]
type TaskEventNames = (typeof TaskEvents)[keyof typeof TaskEvents]

type UserActionEventNames = (typeof UserActionEvents)[keyof typeof UserActionEvents]
