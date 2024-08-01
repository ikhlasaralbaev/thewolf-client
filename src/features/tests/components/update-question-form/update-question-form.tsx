import { Button } from '@/components/ui/button'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { updateQuestionValidator } from '../../lib/validations'
import { getStepDetails, updateQuestionAction } from '../../store/tests.actions'
import { IQuestion } from '../../types'
import FileUploader from '../file-uploader/file-uploader'

const UpdateQuestionForm = ({
	onComplete,
	question,
}: {
	onComplete: () => void
	question: IQuestion
}) => {
	const { isCreatingTest } = useAppSelector(state => state.tests)
	const params = useParams()
	const [isMultipleAnswers, setIsMultipleAnswers] = useState(true)
	const { t } = useTranslation()
	console.log(question)

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm({
		resolver: yupResolver(updateQuestionValidator),
		defaultValues: {
			isMultipleAnswers: true,
		},
	})

	const dispatch = useAppDispatch()

	useEffect(() => {
		reset({
			file_paths: question.file_paths,
			isMultipleAnswers: question.isMultipleAnswers,
			title: question.title,
			video_url: question.video_url || '',
			answers: question.answers.map(item => ({
				title: item.title,
				isCorrect: item.isCorrect,
				id: item.id,
				file_paths: item.file_paths || [],
			})),
		})
		setIsMultipleAnswers(question.isMultipleAnswers)
	}, [question])

	const onSubmit = (data: any) => {
		dispatch(
			updateQuestionAction({
				id: question.id,
				data: {
					title: data.title,
					file_paths: data.file_paths,
					video_url: data?.video_url,
				},
			})
		).then((res: any) => {
			if (res.type === 'tests/update-question/fulfilled') {
				toast.success(t('test_updated'))
				onComplete()
				dispatch(getStepDetails({ step_id: params.id! }))
			} else {
				toast.error('Error with create step!')
			}
		})
	}

	return (
		<form className='grid' onSubmit={handleSubmit(onSubmit)}>
			<div className='mb-[20px] grid'>
				<label className='mb-2'>Language</label>
				<Controller
					name='isMultipleAnswers'
					control={control}
					render={({ field }) => (
						<Select
							value={field.value ? 'true' : 'false'}
							onValueChange={e => {
								setIsMultipleAnswers(e === 'false' ? false : true)
								field.onChange(e === 'false' ? false : true)
							}}
						>
							<SelectTrigger className='w-full'>
								<SelectValue placeholder={t('multi_answers')} />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value={'true'}>{t('multi_answers')}</SelectItem>
								<SelectItem value={'false'}>{t('single_answer')}</SelectItem>
							</SelectContent>
						</Select>
					)}
				/>
				{errors.isMultipleAnswers && (
					<p className='mt-1 text-sm text-red-500'>
						{errors.isMultipleAnswers.message}
					</p>
				)}
			</div>
			<div className='mb-[20px] grid'>
				<label className='mb-2'>{t('question_title')}</label>
				<Controller
					name='title'
					control={control}
					render={({ field }) => <Textarea {...field} />}
				/>
				{errors.title && (
					<p className='mt-1 text-sm text-red-500'>{errors.title.message}</p>
				)}
			</div>

			<div className='mb-[20px] grid'>
				<Controller
					name={`file_paths`}
					control={control}
					render={({ field }) => {
						return (
							<div>
								<FileUploader
									defaultFiles={question.file_paths as string[]}
									files={field.value as string[]}
									isVideo
									setUrl={url => setValue('video_url', url)}
									setFiles={files => field.onChange(files)}
								/>
							</div>
						)
					}}
				/>
			</div>

			<div className='w-full mt-2 mb-6 border-b border-b-gray-300' />

			<Button className='mx-auto' type='submit' isLoading={isCreatingTest}>
				{t('save')}
			</Button>
		</form>
	)
}

export default UpdateQuestionForm
