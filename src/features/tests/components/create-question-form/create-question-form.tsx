import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
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
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { createQuestionValidator } from '../../lib/validations'
import {
	createAnswerAction,
	createQuestionAction,
	getStepDetails,
} from '../../store/tests.actions'
import FileUploader from '../file-uploader/file-uploader'

const CreateQuestionForm = ({ onComplete }: { onComplete: () => void }) => {
	const { isCreatingTest } = useAppSelector(state => state.tests)
	const params = useParams()
	const [isMultipleAnswers, setIsMultipleAnswers] = useState(true)

	const {
		control,
		handleSubmit,
		formState: { errors },

		setValue,
	} = useForm({
		resolver: yupResolver(createQuestionValidator),
		defaultValues: {
			answers: [
				{
					title: '',
					isCorrect: false,
				},
				{
					title: '',
					isCorrect: false,
				},
			],
			isMultipleAnswers: true,
		},
	})

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'answers',
	})

	const dispatch = useAppDispatch()

	const onSubmit = (data: any) => {
		dispatch(createQuestionAction({ ...data, step: Number(params.id) })).then(
			(res: any) => {
				if (res.type === 'tests/create-question/fulfilled') {
					const promises = data.answers.map((data: any) => {
						return dispatch(
							createAnswerAction({ ...data, question: res.payload?.id })
						)
					})

					Promise.all(promises).then(() => {
						toast.success('Step created successfully!')
						onComplete()
						dispatch(getStepDetails({ step_id: params.id! }))
					})
				} else {
					toast.error('Error with create step!')
				}
			}
		)
	}

	useEffect(() => {
		fields.map((_, index) => {
			setValue(`answers.${index}.isCorrect`, false)
		})
	}, [isMultipleAnswers])

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
								<SelectValue placeholder='Несколько ответов' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value={'true'}>Несколько ответов</SelectItem>
								<SelectItem value={'false'}>One answer</SelectItem>
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
				<label className='mb-2'>Введите текст вопроса.</label>
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
									<span>Напишите вариант ответа</span>{' '}
									<span
										onClick={() => remove(index)}
										className='text-sm text-red-500 underline cursor-pointer'
									>
										Delete
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
									<span>Напишите вариант ответа</span>{' '}
									<span
										onClick={() => remove(index)}
										className='text-sm text-red-500 underline cursor-pointer'
									>
										Delete
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
								{errors.answers && (
									<p className='mt-1 text-sm text-red-500'>
										{errors.answers.message}
									</p>
								)}
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
					+ Новый вариант ответа
				</span>
				{errors.answers && (
					<p className='mt-1 text-sm text-red-500'>{errors.answers.message}</p>
				)}
			</div>

			<div className='w-full mt-4 mb-6 border-b border-b-gray-300' />

			<Button className='mx-auto' type='submit' isLoading={isCreatingTest}>
				Добавить
			</Button>
		</form>
	)
}

export default CreateQuestionForm
