import { AdminContentLayout, LoadingOverlay } from '@/components'
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
	getAllDirectionsAction,
	getAllTestsAction,
	getTestStepsAction,
} from '../../store/tests.actions'
import TestSteps from '../test-steps/test-steps'
import TestsPageHeader from '../tests-page-header/tests-page-header'

const TestsPageComponent = () => {
	const { isLoadingTests } = useAppSelector(state => state.tests)
	const dispatch = useAppDispatch()
	const params = useParams()

	useEffect(() => {
		dispatch(getAllTestsAction({ lang: '' }))
		dispatch(getAllDirectionsAction())
	}, [])

	useEffect(() => {
		dispatch(getTestStepsAction({ test_id: params.id! }))
	}, [params.id])

	return (
		<AdminContentLayout title='Тесты' isBack={false}>
			<div className='relative w-full h-full'>
				{isLoadingTests ? <LoadingOverlay /> : ''}
				<TestsPageHeader />
				<br />
				{params.id ? (
					<TestSteps />
				) : (
					<>
						<br />

						<div className='flex items-center justify-center w-full h-24 mt-6 text-xl text-gray-500 rounded-lg bg-stepBg'>
							Please choose test.
						</div>
					</>
				)}
			</div>
		</AdminContentLayout>
	)
}

export default TestsPageComponent
