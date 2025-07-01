import { useEffect, useState } from 'react'

/**
 * Component that handles service worker registration and updates
 * This component should be included in your application's root component
 */
export const ServiceWorkerUpdater: React.FC = () => {
	const [updateAvailable, setUpdateAvailable] = useState(false)
	const [waitingWorker, setWaitingWorker] = useState<null | ServiceWorker>(null)

	// Handle update when user clicks the update button
	const handleUpdate = () => {
		if (waitingWorker) {
			// Send skip waiting message to the waiting service worker
			waitingWorker.postMessage({ type: 'SKIP_WAITING' })

			// Reload the page to activate the new service worker
			window.location.reload()
		}
	}

	useEffect(() => {
		// Only register service worker in production and if it's supported
		if (
			typeof window !== 'undefined' &&
			'serviceWorker' in navigator &&
			window.ENV.NODE_ENV === 'production'
		) {
			// Register the service worker
			navigator.serviceWorker
				.register('/sw.js')
				.then((registration) => {
					console.log('Service Worker registered with scope:', registration.scope)

					// Check for updates when the page loads
					void registration.update()

					// Add update listener
					registration.addEventListener('updatefound', () => {
						const newWorker = registration.installing

						if (newWorker) {
							newWorker.addEventListener('statechange', () => {
								// When the service worker is installed, inform the user an update is available
								if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
									console.log('New content is available; please refresh.')
									setUpdateAvailable(true)
									setWaitingWorker(registration.waiting)
								}
							})
						}
					})
				})
				.catch((error) => {
					console.error('Error during service worker registration:', error)
				})

			// Handle updates from other open tabs
			let refreshing = false
			navigator.serviceWorker.addEventListener('controllerchange', () => {
				if (!refreshing) {
					refreshing = true
					window.location.reload()
				}
			})
		}
	}, [])

	if (!updateAvailable) return null

	return (
		<div className="fixed bottom-0 z-50 flex w-full items-center justify-between bg-green-600 p-4 text-white">
			<div>
				<strong>Update Available!</strong> Reload for the latest version.
			</div>
			<button
				className="rounded-md bg-white px-4 py-2 font-medium text-green-600 hover:bg-gray-100"
				onClick={handleUpdate}>
				Update Now
			</button>
		</div>
	)
}
