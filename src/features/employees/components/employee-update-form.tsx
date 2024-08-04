import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { updateEmployeeValidator } from '../lib/validators'
import { createEmployee, getAllEmployees } from '../store/employees.action'
import { IEmployee } from '../types'

const UpdateEmployeeForm = ({
	onComplete,
	initialData,
}: {
	onComplete: () => void
	initialData: IEmployee
}) => {
	const { isCreatingTest } = useAppSelector(state => state.tests)

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(updateEmployeeValidator),
	})

	const dispatch = useAppDispatch()
	const { t } = useTranslation()

	useEffect(() => {
		reset({ ...initialData, password: '' })
	}, [initialData])

	const onSubmit = (data: any) => {
		dispatch(createEmployee({ ...data, id: initialData.id })).then(res => {
			if (res.type === 'employees/all/fulfilled') {
				toast.success(t('Employee updated successfull!'))
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
				{t('save')}
			</Button>
		</form>
	)
}

export default UpdateEmployeeForm
