import { memo, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { routeConfig } from '../config/routeConfig'
import PageLoader from 'features/PageLoader'

const AppRouter = memo(() => {
	return (
		<Routes>
			{Object.values(routeConfig).map(({ path, element }) => (
				<Route
					key={path}
					path={path}
					element={
						<main className='main'>
							<Suspense fallback={<PageLoader />}>{element}</Suspense>
						</main>
					}
				/>
			))}
			;
		</Routes>
	)
})

export default AppRouter
