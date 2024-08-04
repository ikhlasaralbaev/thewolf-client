import { MenuDotsSvg } from '@/assets'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks'
import {
	Button,
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
} from '@headlessui/react'
import { FC, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { deleteStepAction, getTestStepsAction } from '../../store/tests.actions'
import { IStep } from '../../types'
import UpdateStepForm from '../update-step-form/update-step-form'
interface Props {
	step: IStep
}

const StepItem: FC<Props> = ({ step }) => {
	const navigation = useNavigate()
	const [dialog, setDialog] = useState(false)
	const [updateDialog, setUpdateDialog] = useState(false)
	const dispatch = useAppDispatch()
	const { selectedTestId } = useAppSelector(state => state.tests)
	const { t } = useTranslation()

	const deleteItem = () => {
		dispatch(deleteStepAction({ step_id: step.id })).then(res => {
			if (res.type === 'tests/delete-step/fulfilled') {
				toast.success(t('step_deleted'))
				dispatch(getTestStepsAction({ test_id: selectedTestId! }))
			}
		})
	}

	return (
		<div
			onClick={() => {
				navigation(`/admin/step-tests/${step.id}`, { replace: true })
			}}
			className='bg-stepBg px-3 py-[14px] flex items-start justify-between rounded-[8px] cursor-pointer'
		>
			<div className='grid w-full'>
				<h2 className='text-gray-500 text-[16px] font-semibold'>
					{step.title}
				</h2>
				<div className='w-full my-2 border-t border-t-gray-200' />
				<span className='text-primary text-[14px] font-semibold'>
					{t('min')} {step.minPercent}%
				</span>
				<span className='text-primary text-[14px] font-semibold'>
					{t('minute')}: {step.minute}
				</span>
				<span className='text-primary text-[14px] font-semibold'>
					{t('show_tests_count')}: {step.showTestsCount}
				</span>
			</div>

			<Menu as='div' className='relative'>
				<MenuButton
					onClick={e => e.stopPropagation()}
					className='-m-1.5 flex items-center p-1.5'
				>
					<span className='sr-only'>Open user menu</span>
					<Button>
						<img src={MenuDotsSvg} />
					</Button>
				</MenuButton>
				<MenuItems
					transition
					className='absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in'
				>
					<MenuItem>
						<button
							onClick={e => {
								e.stopPropagation()
								setUpdateDialog(true)
							}}
							className='flex gap-2 items-center px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50 w-full'
						>
							{t('update')}
						</button>
					</MenuItem>
					<MenuItem>
						<button
							onClick={e => {
								e.stopPropagation()

								setDialog(true)
							}}
							className='flex gap-2 items-center px-3 py-1 text-sm leading-6 text-red-600 data-[focus]:bg-gray-50 w-full'
						>
							{t('delete')}
						</button>
					</MenuItem>
				</MenuItems>
			</Menu>

			<Dialog open={dialog} onOpenChange={setDialog}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{t('want_delete_question')}</DialogTitle>
					</DialogHeader>
					<DialogFooter>
						<Button
							type='submit'
							onClick={e => {
								e.stopPropagation()
								deleteItem()
							}}
						>
							{t('yes')}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<Dialog open={updateDialog} onOpenChange={setUpdateDialog}>
				<DialogContent onClick={e => e.stopPropagation()}>
					<DialogHeader onClick={e => e.stopPropagation()}>
						<DialogTitle>{t('update_step')}</DialogTitle>
					</DialogHeader>
					<UpdateStepForm initialData={step} onComplete={() => {}} />
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default StepItem
