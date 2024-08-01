import ResultDetails from '@/features/results/result-details/result-details'
import Home from '@/pages/admin/home/home'
import StepTests from '@/pages/admin/step-tests/step-tests'
import ResultsPage from '@/pages/results/results'
import { Navigate } from 'react-router-dom'

export const adminRoutes = ({ user }: { user: any }) => {
	return [
		{
			path: '/admin',
			element: user ? <Home /> : <Navigate to={'/login'} replace />,
		},
		{
			path: '/admin/:id',
			element: user ? <Home /> : <Navigate to={'/login'} replace />,
		},
		{
			path: '/admin/candidates',
			element: user ? <ResultsPage /> : <Navigate to={'/login'} replace />,
		},
		{
			path: '/admin/step-tests/:id',
			element: user ? <StepTests /> : <Navigate to={'/login'} replace />,
		},
		{
			path: '/admin/result/:id',
			element: user ? <ResultDetails /> : <Navigate to={'/login'} replace />,
		},
	]
}
