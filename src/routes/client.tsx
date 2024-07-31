import NoPassed from '@/features/candidate/components/no-passed'
import Passed from '@/features/candidate/components/passed'
import ToNextStep from '@/features/candidate/components/to-next-step'
import CandidateAuthPage from '@/pages/candidate/candidate-auth'
import CandidateStepTests from '@/pages/candidate/candidate-step-tests'
import { Navigate } from 'react-router-dom'

export const clientRoutes = ({ candidate }: { candidate: any }) => {
	return [
		{
			path: '/',
			element: <CandidateAuthPage />,
		},
		{
			path: '/tests',
			element: <CandidateStepTests />,
		},
		{
			path: '/no-passed',
			element: candidate ? <NoPassed /> : <Navigate to={'/'} replace />,
		},
		{
			path: '/passed',
			element: candidate ? <Passed /> : <Navigate to={'/'} replace />,
		},
		{
			path: '/next-step',
			element: candidate ? <ToNextStep /> : <Navigate to={'/'} replace />,
		},
	]
}
