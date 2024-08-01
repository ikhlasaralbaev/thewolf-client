import { Button } from '@/components/ui/button'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { regions } from '@/features/candidate/lib/data'
import { getAllTestsAction } from '@/features/tests/store/tests.actions'
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks'
import { FilterIcon } from 'lucide-react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { setResultFilter } from '../store/results.slice'

const ResultsHeader = () => {
	const { tests } = useAppSelector(state => state.tests)
	const { language } = useAppSelector(state => state.results)
	const dispatch = useAppDispatch()
	const { t } = useTranslation()

	useEffect(() => {
		dispatch(getAllTestsAction({ lang: language }))
	}, [language])

	return (
		<div className='flex justify-end gap-2 mb-4'>
			<Popover>
				<PopoverTrigger asChild>
					<Button variant='outline'>
						<FilterIcon /> {t('filter')}
					</Button>
				</PopoverTrigger>
				<PopoverContent className='w-80'>
					<div className='grid gap-2'>
						<Select
							onValueChange={e =>
								dispatch(
									setResultFilter({
										language: e,
									})
								)
							}
						>
							<SelectTrigger className='w-full'>
								<SelectValue placeholder={t('language')} />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value={'all'}>{t('all_languages')}</SelectItem>
								<SelectItem value={'uz'}>{t('uz')}</SelectItem>
								<SelectItem value={'ru'}>{t('ru')}</SelectItem>
								<SelectItem value={'en'}>{t('en')}</SelectItem>
							</SelectContent>
						</Select>
						<Select
							onValueChange={e =>
								dispatch(
									setResultFilter({
										isPassed: e,
									})
								)
							}
						>
							<SelectTrigger className='w-full'>
								<SelectValue placeholder={t('status')} />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value={'all'}>{t('all_statuses')}</SelectItem>
								<SelectItem value={'1'}>{t('is_passed')}</SelectItem>
								<SelectItem value={'0'}>{t('no_passed')}</SelectItem>
							</SelectContent>
						</Select>
						<Select
							onValueChange={e =>
								dispatch(
									setResultFilter({
										test: e,
									})
								)
							}
						>
							<SelectTrigger className='w-full'>
								<SelectValue placeholder={t('direction')} />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value={'all'}>{t('all_directions')}</SelectItem>
								{tests.map(item => (
									<SelectItem value={String(item.id)}>{item.title}</SelectItem>
								))}
							</SelectContent>
						</Select>
						<Select
							onValueChange={e =>
								dispatch(
									setResultFilter({
										area: e,
									})
								)
							}
						>
							<SelectTrigger className='w-full'>
								<SelectValue placeholder='Region' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value={'all'}>{t('all_regions')}</SelectItem>
								{regions.map(item => (
									<SelectItem value={item.code}>{item.ru}</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	)
}

export default ResultsHeader
