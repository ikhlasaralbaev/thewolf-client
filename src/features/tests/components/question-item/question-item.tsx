import { EditSvg } from '@/assets'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useAppDispatch } from '@/hooks/store-hooks'
import { Trash } from 'lucide-react'
import { FC, useState } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { deleteQuestionAction, getStepDetails } from '../../store/tests.actions'
import { IQuestion } from '../../types'
import UpdateQuestionForm from '../update-question-form/update-question-form'

interface Props {
	question: IQuestion
}

const QuestionItem: FC<Props> = ({ question }) => {
	const dispatch = useAppDispatch()
	const params = useParams()
	const [dialog, setDialog] = useState(false)
	const [updateModal, setUpdateModal] = useState(false)

	const deleteItem = () => {
		dispatch(deleteQuestionAction({ question_id: question.id })).then(res => {
			if (res.type === 'tests/delete-question/fulfilled') {
				dispatch(getStepDetails({ step_id: params.id! }))
				toast.success('Question deleted successful!')
				setDialog(false)
			}
		})
	}

	return (
		<div className='bg-grayBg rounded-[12px] p-[20px] w-auto mb-4 min-w-[300px]'>
			<div>
				<div className='flex items-center justify-between w-full'>
					<h2>{question.title}</h2>

					<div className='flex items-center gap-2'>
						<Button
							onClick={() => setUpdateModal(true)}
							className='p-0'
							variant={'ghost'}
						>
							<img src={EditSvg} />
						</Button>
						<Button
							onClick={() => setDialog(true)}
							className='p-0'
							variant={'ghost'}
						>
							<Trash className='text-red-500 tex-xs' />
						</Button>

						<Dialog open={dialog} onOpenChange={setDialog}>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Do you want delete question?</DialogTitle>
								</DialogHeader>
								<DialogFooter>
									<Button type='submit' onClick={deleteItem}>
										Yes
									</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div>
				</div>
				{question.file_paths.length ? (
					<div className='relative grid w-full grid-cols-4 gap-2 mt-2 mb-4'>
						{question.file_paths.map(item => (
							<img
								className='h-[120px] w-[120px] bg-grayBg object-cover '
								src={'http://localhost:8000' + item}
							/>
						))}
					</div>
				) : null}
			</div>

			{!question.isMultipleAnswers ? (
				<RadioGroup
					defaultValue={question.answers
						.find(item => item.isCorrect)
						?.id?.toString()}
				>
					{question.answers.map(item => (
						<div>
							<div className='flex items-start space-x-2'>
								<RadioGroupItem
									disabled
									value={String(item.id)}
									id='option-one'
								/>
								<Label htmlFor='option-one'>
									<span>{item.title}</span>

									<div className='relative grid w-full grid-cols-3 mt-2'>
										{item.file_paths.map(item => (
											<img
												className='h-[100px] w-[120px] bg-grayBg object-cover '
												src={'http://localhost:8000' + item}
											/>
										))}
									</div>
								</Label>
							</div>
						</div>
					))}
				</RadioGroup>
			) : (
				<div className='grid gap-2'>
					{question.answers.map(item => (
						<div className='flex items-center space-x-2'>
							<Checkbox disabled checked={item.isCorrect} />
							<Label htmlFor='option-one'>{item.title}</Label>

							{item.file_paths.map(item => (
								<div className='relative'>
									<img
										className='h-[100px] bg-grayBg object-cover w-full'
										src={'http://localhost:8000' + item}
									/>
								</div>
							))}
						</div>
					))}
				</div>
			)}

			<Dialog open={updateModal} onOpenChange={setUpdateModal}>
				<DialogContent className='xs:w-full'>
					<DialogHeader>
						<DialogTitle>Create test</DialogTitle>
					</DialogHeader>

					<UpdateQuestionForm
						onComplete={() => setUpdateModal(false)}
						question={question}
					/>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default QuestionItem
