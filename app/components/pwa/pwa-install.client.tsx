import '@khmyznikov/pwa-install'
import { useRef } from 'react'

import { Button } from '~/components/ui/button.tsx'

export const PwaInstallClient: React.FC = () => {
	const pwaInstallRef = useRef<any>(null)

	return (
		<>
			{window.ENV.NODE_ENV !== 'production' && (
				<div className="flex gap-2">
					<Button onClick={() => pwaInstallRef.current?.showDialog(true)}>
						Show PWA install dialog
					</Button>
					<Button onClick={() => pwaInstallRef.current?.hideDialog()}>
						Hide PWA install dialog
					</Button>
				</div>
			)}
			{/*// @ts-ignore*/}
			<pwa-install ref={pwaInstallRef} />
		</>
	)
}
