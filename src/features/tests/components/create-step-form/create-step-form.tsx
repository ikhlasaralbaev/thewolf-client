import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { createStepValidator } from '../../lib/validations'
import { createStepAction } from '../../store/tests.actions'

const CreateStepForm = ({ onComplete }: { onComplete: () => void }) => {
	const { isCreatingTest } = useAppSelector(state => state.tests)
	const params = useParams()

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(createStepValidator),
	})

	const dispatch = useAppDispatch()

	const onSubmit = (data: any) => {
		dispatch(createStepAction({ ...data, test: Number(params.id) })).then(
			res => {
				if (res.type === 'tests/step-create/fulfilled') {
					toast.success('Step created successfully!')
					onComplete()
				} else {
					toast.error('Error with create step!')
				}
			}
		)
	}

	return (
		<form className='grid' onSubmit={handleSubmit(onSubmit)}>
			<div className='mb-[20px] grid'>
				<label className='mb-2'>Напишите название этапа</label>
				<Controller
					name='title'
					control={control}
					render={({ field }) => <Input {...field} />}
				/>
				{errors.title && (
					<p className='mt-1 text-sm text-red-500'>{errors.title.message}</p>
				)}
			</div>

			<div className='mb-[20px] grid'>
				<label className='mb-2'>Напишите min percent этапа</label>
				<Controller
					name='minPercent'
					control={control}
					render={({ field }) => <Input type='number' {...field} />}
				/>
				{errors.minPercent && (
					<p className='mt-1 text-sm text-red-500'>
						{errors.minPercent.message}
					</p>
				)}
			</div>

			<Button className='mx-auto' type='submit' isLoading={isCreatingTest}>
				Добавить
			</Button>
		</form>
	)
}

export default CreateStepForm
