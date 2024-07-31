import CandidateContentLayout from '@/components/common/candidate-content-layout/candidate-content-layout'
import useAuth from '@/features/auth/hooks/use-auth'
import { refreshTokenAction } from '@/features/auth/store/auth.actions'
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks'
import AdminLayout from '@/layouts/admin/components/sidebar'
import Auth from '@/pages/admin/auth/auth'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { adminRoutes } from './admin'
import { clientRoutes } from './client'

export const AppRoutes = () => {
	// user from store, authorization validate
	const { user } = useAuth()
	const { candidate, isCreatingCandidate } = useAppSelector(
		state => state.candidate
	)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(refreshTokenAction())
	}, [])

	// combine all routes
	// const routes = [...adminRoutes({ user }), ...clientRoutes({ user })]

	// create element

	return (
		<>
			<Routes>
				<Route path='/admin' element={<AdminLayout />}>
					{adminRoutes({ user }).map(item => (
						<Route path={item.path} element={item.element} />
					))}
				</Route>
				<Route path='/' element={<CandidateContentLayout />}>
					{clientRoutes({
						candidate: isCreatingCandidate ? true : candidate,
					}).map(item => (
						<Route path={item.path} element={item.element} />
					))}
				</Route>
				<Route path='/login' element={<Auth />} />
			</Routes>
		</>
	)
}
