import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { addAnswerValidator } from '../../lib/validations'
import { createAnswerAction, getStepDetails } from '../../store/tests.actions'
import { IAnswer, IQuestion } from '../../types'
import FileUploader from '../file-uploader/file-uploader'

const CreateOneAnswerForm = ({
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
	const {
		control,
		handleSubmit,
		formState: { errors },

		setValue,
	} = useForm({
		resolver: yupResolver(addAnswerValidator),
		defaultValues: {
			answers: [
				{
					title: '',
					isCorrect: false,
				},
			],
		},
	})

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'answers',
	})

	const dispatch = useAppDispatch()

	const onSubmit = (data: any) => {
		const promise = data.answers.map((item: IAnswer) => {
			return dispatch(createAnswerAction({ ...item, question: question.id! }))
		})

		Promise.all(promise).then((res: any) => {
			console.log(res)
			if (res[0].type === 'tests/create-answer/fulfilled') {
				toast.success(t('answer_created'))
				onComplete()
				dispatch(getStepDetails({ step_id: params.id! }))
			} else {
				toast.error(t('error'))
			}
		})
	}

	useEffect(() => {
		fields.map((_, index) => {
			setValue(`answers.${index}.isCorrect`, false)
		})
	}, [isMultipleAnswers])

	useEffect(() => {
		setIsMultipleAnswers(question.isMultipleAnswers)
	}, [])

	return (
		<form className='grid' onSubmit={handleSubmit(onSubmit)}>
			<div className='w-full mt-2 mb-6 border-b border-b-gray-300' />

			<div className=''>
				<RadioGroup
					onValueChange={e => {
						fields.map((_, index) => {
							setValue(`answers.${index}.isCorrect`, false)
						})

						setValue(`answers.${Number(e.split('.')[1])}.isCorrect`, true)
					}}
				>
					{fields.map((item, index) =>
						isMultipleAnswers ? (
							<div key={item.id} className='mb-[10px] grid'>
								<label className='flex items-center justify-between w-full mb-2'>
									<span>{t('answer_question')}</span>{' '}
									<span
										onClick={() => remove(index)}
										className='text-sm text-red-500 underline cursor-pointer'
									>
										{t('delete')}
									</span>
								</label>
								<Controller
									name={`answers.${index}.title`}
									control={control}
									render={({ field }) => (
										<div>
											<div className='flex items-center gap-2'>
												<Input {...field} />
												<Controller
													name={`answers.${index}.isCorrect`}
													control={control}
													render={({ field }) => {
														return (
															<div>
																<Checkbox
																	onCheckedChange={e => {
																		field.onChange(e)
																	}}
																/>
															</div>
														)
													}}
												/>
											</div>

											<Controller
												name={`answers.${index}.file_paths`}
												control={control}
												render={({ field }) => {
													return (
														<div>
															<FileUploader
																setFiles={files => field.onChange(files)}
																onRightButtonHandler={() => remove(index)}
															/>
														</div>
													)
												}}
											/>
										</div>
									)}
								/>
								{errors.answers && (
									<p className='mt-1 text-sm text-red-500'>
										{errors.answers.message}
									</p>
								)}
							</div>
						) : (
							<div key={item.id} className='mb-[10px] grid'>
								<label className='flex items-center justify-between w-full mb-2'>
									<span>{t('answer_question')}</span>{' '}
									<span
										onClick={() => remove(index)}
										className='text-sm text-red-500 underline cursor-pointer'
									>
										{t('delete')}
									</span>
								</label>
								<Controller
									name={`answers.${index}.title`}
									control={control}
									render={({ field }) => (
										<div>
											<div className='flex items-center gap-2'>
												<Input {...field} />

												<Controller
													name={`answers.${index}.isCorrect`}
													control={control}
													render={({}) => {
														return (
															<div>
																<RadioGroupItem
																	value={`answers.${index}.isCorrect`}
																	onChange={e => console.log(e)}
																/>
															</div>
														)
													}}
												/>
											</div>

											<Controller
												name={`answers.${index}.file_paths`}
												control={control}
												render={({ field }) => {
													return (
														<div>
															<FileUploader
																setFiles={files => field.onChange(files)}
																onRightButtonHandler={() => remove(index)}
															/>
														</div>
													)
												}}
											/>
										</div>
									)}
								/>
							</div>
						)
					)}
				</RadioGroup>
				<span
					onClick={() => {
						append({
							title: '',
							isCorrect: false,
							video_url: '',
							file_paths: [],
						})
					}}
					className='mb-4 text-blue-500 underline cursor-pointer text-md'
				>
					{t('add_answer')}
				</span>
			</div>
			{errors.answers && (
				<p className='mt-1 text-sm text-red-500'>{errors.answers.message}</p>
			)}

			<div className='w-full mt-4 mb-6 border-b border-b-gray-300' />

			<Button className='mx-auto' type='submit' isLoading={isCreatingTest}>
				{t('add')}
			</Button>
		</form>
	)
}

export default CreateOneAnswerForm
