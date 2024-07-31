import { AdminContentLayout, LoadingOverlay } from '@/components'
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks'
import { useEffect } from 'react'
import ResultItem from './components/result-item'
import ResultsHeader from './components/results-header'
import { getAllResults } from './store/results.action'

const Results = () => {
	const { results, isLoadingResults, area, language, test, isPassed } =
		useAppSelector(state => state.results)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(
			getAllResults({
				area,
				language,
				isPassed,
				test,
			})
		)
	}, [area, language, isPassed, test])

	return (
		<AdminContentLayout title='Тесты' isBack={false}>
			<div className='relative h-full'>
				<ResultsHeader />
				{isLoadingResults ? (
					<LoadingOverlay />
				) : results.length ? (
					results.map(item => <ResultItem result={item} key={item.id} />)
				) : (
					<div className='flex items-center justify-center w-full h-24 mt-6 text-xl text-gray-500 rounded-lg bg-stepBg'>
						Candidates not found.
					</div>
				)}
			</div>
		</AdminContentLayout>
	)
}

export default Results
