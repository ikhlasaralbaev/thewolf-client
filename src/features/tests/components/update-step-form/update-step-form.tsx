import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { createStepValidator } from '../../lib/validations'
import { getTestStepsAction, updateStepAction } from '../../store/tests.actions'
import { IStep } from '../../types'

const UpdateStepForm = ({
	onComplete,
	initialData,
}: {
	onComplete: () => void
	initialData: IStep
}) => {
	const { isCreatingTest, selectedTestId } = useAppSelector(
		state => state.tests
	)
	const { t } = useTranslation()

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(createStepValidator),
	})

	const dispatch = useAppDispatch()

	const onSubmit = (data: any) => {
		dispatch(updateStepAction({ data, id: initialData.id })).then(res => {
			if (res.type === 'tests/step-update/fulfilled') {
				toast.success(t('step_updated'))
				onComplete()
				dispatch(getTestStepsAction({ test_id: selectedTestId! }))
			} else {
				toast.error(t('step_error'))
			}
		})
	}

	useEffect(() => {
		reset({
			title: initialData?.title,
			minPercent: initialData.minPercent,
			minute: initialData?.minute,
			showTestsCount: initialData?.showTestsCount,
		})
	}, [initialData])

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
					render={({ field }) => (
						<Input placeholder='%' type='number' {...field} />
					)}
				/>
				{errors.minPercent && (
					<p className='mt-1 text-sm text-red-500'>
						{errors.minPercent.message}
					</p>
				)}
			</div>

			<div className='mb-[20px] grid'>
				<label className='mb-2'>{t('minute')}</label>
				<Controller
					name='minute'
					control={control}
					render={({ field }) => (
						<Input placeholder={t('minute')} type='number' {...field} />
					)}
				/>
				{errors.minPercent && (
					<p className='mt-1 text-sm text-red-500'>
						{errors.minPercent.message}
					</p>
				)}
			</div>

			<div className='mb-[20px] grid'>
				<label className='mb-2'>{t('enter_show_tests_count')}</label>
				<Controller
					name='showTestsCount'
					control={control}
					render={({ field }) => (
						<Input placeholder={t('minute')} type='number' {...field} />
					)}
				/>
				{errors.showTestsCount && (
					<p className='mt-1 text-sm text-red-500'>
						{errors.showTestsCount?.message}
					</p>
				)}
			</div>

			<Button className='mx-auto' type='submit' isLoading={isCreatingTest}>
				{t('save')}
			</Button>
		</form>
	)
}

export default UpdateStepForm
