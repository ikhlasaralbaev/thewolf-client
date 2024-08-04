import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks'
import classNames from 'classnames'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { deleteTestAction, getAllTestsAction } from '../../store/tests.actions'
import { setSelectedTestId } from '../../store/tests.slice'
import CreateTestForm from '../create-test-form/create-test-form'
const tabs = [
	{ name: 'Applied', href: '#', current: false },
	{ name: 'Phone Screening', href: '#', current: false },
	{ name: 'Interview', href: '#', current: true },
	{ name: 'Offer', href: '#', current: false },
	{ name: 'Hired', href: '#', current: false },
]
const TestsPageHeader = () => {
	const { tests, selectedTestId } = useAppSelector(state => state.tests)
	const [createTestModalIsOpen, setCreateTestModalIsOpen] = useState(false)
	const [dialog, setDialog] = useState(false)
	const dispatch = useAppDispatch()
	const { t } = useTranslation()

	const deleteItem = () => {
		dispatch(deleteTestAction({ test_id: selectedTestId! })).then(res => {
			if (res.type === 'tests/delete-test/fulfilled') {
				toast.success('Test deleted successfully!')
				dispatch(getAllTestsAction({}))
				dispatch(setSelectedTestId(tests[0]?.id || null))
			}
			setDialog(false)
		})
	}

	return (
		<div className='relative flex items-center justify-between w-full'>
			<div className='relative w-full pb-5 border-gray-200 sm:pb-0'>
				<div className='mt-4 '>
					<div className='sm:hidden'>
						<label htmlFor='current-tab' className='sr-only'>
							{t('select')}
						</label>
						<select
							id='current-tab'
							name='current-tab'
							defaultValue={tabs.find(tab => tab.current)?.name}
							className='block w-full rounded-md border-0 py-1.5 pl-3 pr-10 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
							onChange={e => {
								dispatch(setSelectedTestId(e.target.value))
								console.log(e.target.value)
							}}
						>
							{tests.map(tab => (
								<option value={tab.id} key={tab.id}>
									{tab.title}
								</option>
							))}
						</select>
					</div>
					<div className='hidden sm:block'>
						<nav className='flex -mb-px space-x-8 overflow-x-auto scrollbar-hide xs:w-full lg:w-[75%]'>
							{tests.map(tab => (
								<button
									key={tab.id}
									onClick={() => dispatch(setSelectedTestId(tab.id))}
									aria-current={tab.id ? 'page' : undefined}
									className={classNames(
										'flex flex-col',
										selectedTestId! === tab.id
											? 'border-indigo-500 text-indigo-600'
											: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
										'whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium'
									)}
								>
									<span>{tab.title}</span>
									<span>
										{t('language')}: {tab.language}
									</span>
								</button>
							))}
						</nav>
					</div>
				</div>

				<div className='z-10 md:flex md:items-center md:justify-between'>
					<div className='flex gap-2 pb-2 mt-3 bg-white sm:flex-col md:flex-row md:absolute md:right-0 md:top-3 md:mt-0 '>
						{selectedTestId && (
							<span
								onClick={() => setDialog(true)}
								className='inline-flex items-center px-3 py-2 text-sm font-light text-red-500 underline cursor-pointer'
							>
								{t('delete')}
							</span>
						)}
						<Button
							type='button'
							onClick={() => setCreateTestModalIsOpen(true)}
						>
							{t('create_test')}
						</Button>
					</div>
				</div>
			</div>

			<Dialog
				open={createTestModalIsOpen}
				onOpenChange={setCreateTestModalIsOpen}
			>
				<DialogContent className='xs:w-full'>
					<DialogHeader>
						<DialogTitle>{t('create_test')}</DialogTitle>
					</DialogHeader>

					<CreateTestForm onComplete={() => setCreateTestModalIsOpen(false)} />
				</DialogContent>
			</Dialog>

			<Dialog open={dialog} onOpenChange={setDialog}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{t('want_delete_question')}</DialogTitle>
					</DialogHeader>
					<DialogFooter>
						<Button type='submit' onClick={deleteItem}>
							{t('yes')}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default TestsPageHeader
