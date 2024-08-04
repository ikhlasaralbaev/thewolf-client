import { apiURL } from '@/api/api.interceptor'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { IQuestion } from '@/features/tests/types'
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks'
import { FC } from 'react'
import { IAnswerType, onAnswer } from '../store/candidate.slice'

interface Props {
	question: IQuestion
	index: number
}

const QuestionItem: FC<Props> = ({ question, index }) => {
	const { answers } = useAppSelector(state => state.candidate)
	const dispatch = useAppDispatch()

	const handleAnswer = (data: (string | number)[]) => {
		const alreadyExist = answers.findIndex(
			item => item.question_id === question.id
		)

		if (alreadyExist === -1) {
			const newArr: IAnswerType[] = [
				...answers,
				{
					question_id: question.id,
					answers: data,
				},
			]
			dispatch(onAnswer(newArr))
		} else {
			dispatch(
				onAnswer(
					answers.map(item => {
						if (item.question_id === question.id) {
							return {
								...item,
								answers: data,
							}
						} else {
							return item
						}
					})
				)
			)
		}
	}

	return (
		<div className='mb-[20px] grid gap-[5px]'>
			<h2 className='text-[17px] font-semibold'>
				{index + 1}. {question?.title}
			</h2>

			{question.file_paths.length ? (
				<div className='relative grid w-full grid-cols-4 gap-2 mt-2 mb-4'>
					{question.file_paths.map(item => (
						<img
							className='h-[120px] w-full bg-grayBg object-contain '
							src={apiURL + item}
						/>
					))}
				</div>
			) : null}

			<div className='px-4'>
				{!question.isMultipleAnswers ? (
					<RadioGroup onValueChange={data => handleAnswer([data])}>
						{question.answers.map(item => (
							<div>
								<Label className='flex items-start space-x-2'>
									<RadioGroupItem value={String(item.id)}>
										{item.title}
									</RadioGroupItem>
									<div>
										<span>{item.title}</span>

										<div className='relative grid w-full grid-cols-3 mt-2'>
											{item.file_paths.map(item => (
												<img
													className='h-[100px] w-[120px] bg-grayBg object-cover '
													src={apiURL + item}
												/>
											))}
										</div>
									</div>
								</Label>
							</div>
						))}
					</RadioGroup>
				) : (
					<ul>
						{question.answers.map(item => (
							<li>
								<Label className='flex items-start space-x-2 mb-[9px]'>
									<Checkbox
										checked={answers
											.find(curr => curr.question_id === question.id)
											?.answers.includes(item.id)}
										onCheckedChange={e => {
											if (e) {
												if (
													answers.find(curr => curr.question_id === question.id)
														?.answers.length === question.correctAnswers
												) {
													const curr = answers.find(
														x =>
															x.question_id?.toString() ===
															question.id?.toString()
													)?.answers
													handleAnswer([...(curr?.slice(1) || []), item.id])
												} else {
													handleAnswer([
														...(answers.find(
															x =>
																x.question_id?.toString() ===
																question.id?.toString()
														)?.answers || []),
														item.id,
													])
												}
											} else {
												handleAnswer(
													answers
														.find(x => x.question_id === question.id)
														?.answers?.filter(
															(x: number | string) => x !== item?.id
														) || []
												)
											}
										}}
									/>
									<div>
										<span>{item.title}</span>
										<div className='relative grid w-full grid-cols-3 mt-2'>
											{item.file_paths.map(item => (
												<img
													className='h-[100px] w-[120px] bg-grayBg object-cover '
													src={apiURL + item}
												/>
											))}
										</div>
									</div>
								</Label>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	)
}

export default QuestionItem
