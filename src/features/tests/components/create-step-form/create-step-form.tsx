import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { createStepValidator } from '../../lib/validations'
import { createStepAction } from '../../store/tests.actions'

const CreateStepForm = ({ onComplete }: { onComplete: () => void }) => {
	const { isCreatingTest, selectedTestId } = useAppSelector(
		state => state.tests
	)

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(createStepValidator),
		defaultValues: {
			minute: 60,
			showTestsCount: 15,
		},
	})

	const dispatch = useAppDispatch()

	const { t } = useTranslation()

	const onSubmit = (data: any) => {
		dispatch(createStepAction({ ...data, test: Number(selectedTestId) })).then(
			res => {
				if (res.type === 'tests/step-create/fulfilled') {
					toast.success(t('step_created'))
					onComplete()
				} else {
					toast.error(t('step_error'))
				}
			}
		)
	}

	return (
		<form className='grid' onSubmit={handleSubmit(onSubmit)}>
			<div className='mb-[20px] grid'>
				<label className='mb-2'>{t('enter_step_title')}</label>
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
				<label className='mb-2'>{t('enter_step_minimum_percent')}</label>
				<Controller
					name='minPercent'
					control={control}
					render={({ field }) => <Input max={100} type='number' {...field} />}
				/>
				{errors.minPercent && (
					<p className='mt-1 text-sm text-red-500'>
						{errors.minPercent.message}
					</p>
				)}
			</div>

			<div className='mb-[20px] grid'>
				<label className='mb-2'>{t('enter_step_minute')}</label>
				<Controller
					name='minute'
					control={control}
					render={({ field }) => (
						<Input defaultValue={60} type='number' {...field} />
					)}
				/>
				{errors.minPercent && (
					<p className='mt-1 text-sm text-red-500'>{errors.minute?.message}</p>
				)}
			</div>

			<div className='mb-[20px] grid'>
				<label className='mb-2'>{t('enter_show_tests_count')}</label>
				<Controller
					name='showTestsCount'
					control={control}
					render={({ field }) => (
						<Input defaultValue={15} type='number' {...field} />
					)}
				/>
				{errors.minPercent && (
					<p className='mt-1 text-sm text-red-500'>{errors.minute?.message}</p>
				)}
			</div>

			<Button className='mx-auto' type='submit' isLoading={isCreatingTest}>
				{t('add')}
			</Button>
		</form>
	)
}

export default CreateStepForm
