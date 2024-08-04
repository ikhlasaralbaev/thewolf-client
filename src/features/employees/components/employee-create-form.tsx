import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { createEmployeeValidator } from '../lib/validators'
import { createEmployee, getAllEmployees } from '../store/employees.action'

const CreateEmployeeForm = ({ onComplete }: { onComplete: () => void }) => {
	const { isCreatingTest } = useAppSelector(state => state.tests)

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(createEmployeeValidator),
	})

	const dispatch = useAppDispatch()
	const { t } = useTranslation()

	const onSubmit = (data: any) => {
		dispatch(createEmployee({ ...data })).then(res => {
			if (res.type === 'employees/all/fulfilled') {
				toast.success(t('Employee created successfull!'))
				onComplete()
				dispatch(getAllEmployees())
			} else {
				toast.error('Employee with that email already exist!')
			}
		})
	}

	return (
		<form className='grid' onSubmit={handleSubmit(onSubmit)}>
			<div className='mb-[20px] grid'>
				<label className='mb-2'>{t('enter_email')}</label>
				<Controller
					name='email'
					control={control}
					render={({ field }) => <Input {...field} />}
				/>
				{errors.email && (
					<p className='mt-1 text-sm text-red-500'>{errors.email.message}</p>
				)}
			</div>

			<div className='mb-[20px] grid'>
				<label className='mb-2'>{t('password')}</label>
				<Controller
					name='password'
					control={control}
					render={({ field }) => <Input {...field} />}
				/>
				{errors.password && (
					<p className='mt-1 text-sm text-red-500'>{errors.password.message}</p>
				)}
			</div>

			<Button className='mx-auto' type='submit' isLoading={isCreatingTest}>
				{t('add')}
			</Button>
		</form>
	)
}

export default CreateEmployeeForm
