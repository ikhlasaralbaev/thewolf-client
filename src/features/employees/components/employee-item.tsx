import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { useAppDispatch } from '@/hooks/store-hooks'
import { Edit2, Trash2 } from 'lucide-react'
import { FC, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { deleteEmployee, getAllEmployees } from '../store/employees.action'
import { IEmployee } from '../types'
import UpdateEmployeeForm from './employee-update-form'
interface Props {
	employee: IEmployee
}

const EmployeeItem: FC<Props> = ({ employee }) => {
	const [dialog, setDialog] = useState(false)
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const [update, setUpdate] = useState(false)

	const deleteItem = () => {
		dispatch(deleteEmployee({ id: String(employee.id)! })).then(res => {
			if (res.type === 'employees/delete/fulfilled') {
				dispatch(getAllEmployees())
				toast.success('Employee deleted successfully!')
				setDialog(false)
			}
		})
	}

	return (
		<div className='flex items-center justify-between px-4 py-2 rounded-md bg-grayBg'>
			<h2>{employee.email}</h2>

			<div className='flex items-center gap-2'>
				<button
					className='cursor-pointer text-primary-500'
					onClick={() => setUpdate(true)}
				>
					<Edit2 />
				</button>
				<button
					className='text-red-500 cursor-pointer'
					onClick={() => setDialog(true)}
				>
					<Trash2 />
				</button>
			</div>

			<Dialog open={dialog} onOpenChange={setDialog}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{t('want_delete_employee')}</DialogTitle>
					</DialogHeader>
					<DialogFooter>
						<Button type='submit' onClick={deleteItem}>
							{t('yes')}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
			<Dialog open={update} onOpenChange={setUpdate}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{t('want_update_employee')}</DialogTitle>
					</DialogHeader>
					<UpdateEmployeeForm
						initialData={employee}
						onComplete={() => setUpdate(false)}
					/>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default EmployeeItem
