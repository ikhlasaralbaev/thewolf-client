import CandidateStepTestsPageComponent from '@/features/candidate/candidate-step-tests/candidate-step-tests'
import { useAppSelector } from '@/hooks/store-hooks'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const CandidateStepTests = () => {
	const { test, candidate, isCreatingCandidate } = useAppSelector(
		state => state.candidate
	)
	const navigate = useNavigate()

	useEffect(() => {
		const unloadCallback = (event: any) => {
			event.preventDefault()
			event.returnValue = ''
			return ''
		}

		window.addEventListener('beforeunload', unloadCallback)
		return () => window.removeEventListener('beforeunload', unloadCallback)
	}, [])

	useEffect(() => {
		if (isCreatingCandidate && (!candidate || !test)) {
			navigate('/', { replace: true })
		}
	}, [candidate, test])

	return <CandidateStepTestsPageComponent />
}

export default CandidateStepTests
