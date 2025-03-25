import { type PropsWithChildren } from 'react'

export function H3({ children }: PropsWithChildren) {
	return <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">{children}</h3>
}
