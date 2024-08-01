import { AdminContentLayout, LoadingOverlay } from '@/components'
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
	getAllDirectionsAction,
	getAllTestsAction,
	getTestStepsAction,
} from '../../store/tests.actions'
import { setSelectedTestId } from '../../store/tests.slice'
import TestSteps from '../test-steps/test-steps'
import TestsPageHeader from '../tests-page-header/tests-page-header'

const TestsPageComponent = () => {
	const { isLoadingTests, selectedTestId, tests } = useAppSelector(
		state => state.tests
	)
	const dispatch = useAppDispatch()

	const { t } = useTranslation()

	useEffect(() => {
		dispatch(getAllTestsAction({ lang: '' }))
		dispatch(getAllDirectionsAction())
	}, [])

	useEffect(() => {
		if (!selectedTestId) {
			if (tests.length) {
				dispatch(setSelectedTestId(tests[0].id))
			}
		}

		dispatch(getTestStepsAction({ test_id: selectedTestId! }))
	}, [selectedTestId, tests])

	return (
		<AdminContentLayout title={t('tests')} isBack={false}>
			<div className='relative w-full h-full'>
				{isLoadingTests ? <LoadingOverlay /> : ''}
				<TestsPageHeader />
				<br />
				{selectedTestId ? (
					<TestSteps />
				) : (
					<>
						<br />

						<div className='flex items-center justify-center w-full h-24 mt-6 text-xl text-gray-500 rounded-lg bg-stepBg'>
							{t('choose_test')}
						</div>
					</>
				)}
			</div>
		</AdminContentLayout>
	)
}

export default TestsPageComponent
