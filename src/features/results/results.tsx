import { AdminContentLayout, LoadingOverlay } from '@/components'
import { TablePagination } from '@/components/common/pagination'
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import ResultItem from './components/result-item'
import ResultsHeader from './components/results-header'
import { getAllResults } from './store/results.action'
import { setResultsPage } from './store/results.slice'

const Results = () => {
	const {
		results,
		isLoadingResults,
		totalPages,
		resultsPage: page,
		filter,
	} = useAppSelector(state => state.results)
	const dispatch = useAppDispatch()
	const { t } = useTranslation()

	useEffect(() => {
		dispatch(
			getAllResults({
				area: filter.area === 'all' ? '' : filter.area,
				language: filter.language === 'all' ? '' : filter.language,
				isPassed: filter.isPassed === 'all' ? '' : filter.isPassed,
				test: filter.test === 'all' ? '' : filter.test,
				page,
			})
		)
	}, [filter, page])

	return (
		<AdminContentLayout title={t('results')} isBack={false}>
			<div className='relative h-full'>
				<ResultsHeader />
				{isLoadingResults ? (
					<LoadingOverlay />
				) : results.length ? (
					results.map(item => <ResultItem result={item} key={item.id} />)
				) : (
					<div className='flex items-center justify-center w-full h-24 mt-6 text-xl text-gray-500 rounded-lg bg-stepBg'>
						{t('candidates_not_found')}
					</div>
				)}
				<TablePagination
					totalCount={totalPages}
					current={page}
					setCurrent={page => {
						dispatch(setResultsPage(page))
					}}
				/>
			</div>
		</AdminContentLayout>
	)
}

export default Results
