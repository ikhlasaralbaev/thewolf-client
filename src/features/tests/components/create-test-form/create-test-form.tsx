import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { createTestValidator } from '../../lib/validations'
import { createTestAction } from '../../store/tests.actions'

const CreateTestForm = ({ onComplete }: { onComplete: () => void }) => {
	const { isCreatingTest } = useAppSelector(state => state.tests)

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(createTestValidator),
	})

	const dispatch = useAppDispatch()
	const { t } = useTranslation()

	const onSubmit = (data: any) => {
		dispatch(createTestAction({ ...data })).then(res => {
			if (res.type === 'tests/create/fulfilled') {
				toast.success(t('test_created'))
				onComplete()
			} else {
				toast.error('Error with create test!')
			}
		})
	}

	return (
		<form className='grid' onSubmit={handleSubmit(onSubmit)}>
			<div className='mb-[20px] grid'>
				<label className='mb-2'>{t('enter_test_title')}</label>
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
				<label className='mb-2'>{t('language')}</label>
				<Controller
					name='language'
					control={control}
					render={({ field }) => (
						<Select onValueChange={e => field.onChange(e)}>
							<SelectTrigger className='w-full'>
								<SelectValue placeholder={t('language')} />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value={'uz'}>{t('uz')}</SelectItem>
								<SelectItem value={'ru'}>{t('ru')}</SelectItem>
								<SelectItem value={'en'}>{t('en')}</SelectItem>
							</SelectContent>
						</Select>
					)}
				/>
				{errors.language && (
					<p className='mt-1 text-sm text-red-500'>{errors.language.message}</p>
				)}
			</div>

			<Button className='mx-auto' type='submit' isLoading={isCreatingTest}>
				{t('add')}
			</Button>
		</form>
	)
}

export default CreateTestForm
