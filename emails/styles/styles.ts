import { type CSSProperties } from 'react'

const primaryColor = '#469344'
const primaryColorFg = '#fff'
export const headerLogoSize = [48, 48]

export const body: CSSProperties = {
	backgroundColor: '#f6f9fc',
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

export const container: CSSProperties = {
	backgroundColor: '#ffffff',
	margin: '0 auto',
	marginBottom: '64px',
	padding: '20px 0 48px',
}

export const section: CSSProperties = {
	padding: '0 48px',
}

export const header: CSSProperties = {
	alignItems: 'center',
	backgroundColor: primaryColor,
	color: primaryColorFg,
	display: 'flex',
	fontSize: '24px',
	fontWeight: 'bold',
	justifyContent: 'space-between',
	marginBottom: '48px',
	padding: '20px 48px',
}

export const headerLogo: CSSProperties = {
	height: `${headerLogoSize[1]}px`,
	marginRight: '8px',
	width: `${headerLogoSize[0]}px`,
}

export const headerTitle: CSSProperties = {
	color: primaryColorFg,
	fontSize: '24px',
	fontWeight: 'bold',
}

export const hr: CSSProperties = {
	borderColor: '#e6ebf1',
	margin: '20px 0',
}

export const paragraph: CSSProperties = {
	color: '#525f7f',
	fontSize: '16px',
	lineHeight: '24px',
	textAlign: 'left',
}

export const heading: CSSProperties = {
	color: '#1a202c',
	fontSize: '28px',
	fontWeight: 'bold',
	lineHeight: '36px',
	margin: '0',
	textAlign: 'left',
}

export const anchor: CSSProperties = {
	color: '#556cd6',
}

export const button: CSSProperties = {
	backgroundColor: primaryColor,
	borderRadius: '5px',
	color: primaryColorFg,
	display: 'block',
	fontSize: '16px',
	fontWeight: 'bold',
	padding: '10px',
	textAlign: 'center',
	textDecoration: 'none',
	width: '100%',
}

export const footer: CSSProperties = {
	color: '#8898aa',
	fontSize: '12px',
	lineHeight: '16px',
}

export const dataTable: CSSProperties = {
	border: '1px solid #eee',
	borderRadius: '4px',
	marginBottom: '12px',
	marginTop: '12px',
	padding: '0',
}

export const dataTableRow: CSSProperties = {
	borderBottom: '1px solid #eee',
}

export const dataTableLastRow: CSSProperties = {
	borderBottom: 'none',
}

export const dataTableCell: CSSProperties = {
	padding: '8px',
}

export const dataTableLabelCell: CSSProperties = {
	padding: '8px',
	width: '30%',
}
