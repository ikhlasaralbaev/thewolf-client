import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { useAppSelector } from '@/hooks/store-hooks'
import classNames from 'classnames'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CreateTestForm from '../create-test-form/create-test-form'
const tabs = [
	{ name: 'Applied', href: '#', current: false },
	{ name: 'Phone Screening', href: '#', current: false },
	{ name: 'Interview', href: '#', current: true },
	{ name: 'Offer', href: '#', current: false },
	{ name: 'Hired', href: '#', current: false },
]
const TestsPageHeader = () => {
	const { tests } = useAppSelector(state => state.tests)
	const params = useParams()
	const [createTestModalIsOpen, setCreateTestModalIsOpen] = useState(false)

	return (
		<div className='relative flex items-center justify-between w-full'>
			<div className='relative w-full pb-5 border-gray-200 sm:pb-0'>
				<div className='z-10 md:flex md:items-center md:justify-between'>
					<div className='flex gap-2 pb-2 mt-3 bg-white sm:flex-col md:flex-row md:absolute md:right-0 md:top-3 md:mt-0 '>
						<span className='inline-flex items-center px-3 py-2 text-sm font-light text-red-500 underline cursor-pointer'>
							Удалить тест
						</span>
						<Button
							type='button'
							onClick={() => setCreateTestModalIsOpen(true)}
						>
							Создать новый тест
						</Button>
					</div>
				</div>
				<div className='mt-4 overflow-x-auto scrollbar-hide'>
					<div className='sm:hidden'>
						<label htmlFor='current-tab' className='sr-only'>
							Select a tab
						</label>
						<select
							id='current-tab'
							name='current-tab'
							defaultValue={tabs.find(tab => tab.current)?.name}
							className='block w-full rounded-md border-0 py-1.5 pl-3 pr-10 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
						>
							{tabs.map(tab => (
								<option key={tab.name}>{tab.name}</option>
							))}
						</select>
					</div>
					<div className='hidden sm:block'>
						<nav className='flex -mb-px space-x-8'>
							{tests.map(tab => (
								<Link
									key={tab.id}
									to={`/admin/${tab.id}`}
									aria-current={tab.id ? 'page' : undefined}
									className={classNames(
										params.id! === String(tab.id)
											? 'border-indigo-500 text-indigo-600'
											: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
										'whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium'
									)}
								>
									{tab.title}
								</Link>
							))}
						</nav>
					</div>
				</div>
			</div>

			<Dialog
				open={createTestModalIsOpen}
				onOpenChange={setCreateTestModalIsOpen}
			>
				<DialogContent className='xs:w-full'>
					<DialogHeader>
						<DialogTitle>Create test</DialogTitle>
					</DialogHeader>

					<CreateTestForm onComplete={() => setCreateTestModalIsOpen(false)} />
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default TestsPageHeader
