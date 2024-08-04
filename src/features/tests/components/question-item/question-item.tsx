import { apiURL } from '@/api/api.interceptor'
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
import { FileWarningIcon, Trash } from 'lucide-react'
import { FC, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import {
	deleteAnswerAction,
	deleteQuestionAction,
	getStepDetails,
} from '../../store/tests.actions'
import { IAnswer, IQuestion } from '../../types'
import CreateOneAnswerForm from '../create-one-answer/create-one-answer'
import UpdateOneAnswerForm from '../update-one-answer/update-one-answer'
import UpdateQuestionForm from '../update-question-form/update-question-form'

interface Props {
	question: IQuestion
}

const QuestionItem: FC<Props> = ({ question }) => {
	const dispatch = useAppDispatch()
	const params = useParams()
	const [dialog, setDialog] = useState(false)
	const [updateModal, setUpdateModal] = useState(false)
	const [addAnswerModal, setAddAnserModal] = useState(false)
	const [updateAnswerModal, setUpdateAnswerModal] = useState(false)
	const [selectedAnswer, setSelectedAnswer] = useState<IAnswer | null>(null)
	const [deleteAnswerDialog, setDeleteAnswerDialog] = useState(false)
	const { t } = useTranslation()

	const deleteItem = () => {
		dispatch(deleteQuestionAction({ question_id: question.id })).then(res => {
			if (res.type === 'tests/delete-question/fulfilled') {
				dispatch(getStepDetails({ step_id: params.id! }))
				toast.success(t('question_deleted'))
				setDialog(false)
			}
		})
	}

	const deleteAns = () => {
		dispatch(deleteAnswerAction({ answer_id: selectedAnswer?.id! })).then(
			res => {
				if (res.type === 'tests/delete-answer/fulfilled') {
					dispatch(getStepDetails({ step_id: params.id! }))
					toast.success(t('answer_deleted'))
					setDeleteAnswerDialog(false)
					setSelectedAnswer(null)
				}
			}
		)
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
					</div>
				</div>
				{question.file_paths.length ? (
					<div className='relative grid w-full grid-cols-4 gap-2 mt-2 mb-4'>
						{question.file_paths.map(item => (
							<img
								className='h-[120px] w-[120px] bg-grayBg object-cover '
								src={apiURL + item}
							/>
						))}
					</div>
				) : null}
			</div>

			{question.answers.find(item => item.isCorrect) ? null : (
				<div className='flex gap-2 p-2 text-sm text-red-500 rounded-md bg-amber-100'>
					<FileWarningIcon />
					<span>
						Bu savolda tog'ri javoblar yo'q, <br /> va shu sababdan kandidatga
						ko'rsatilmaydi!
					</span>
				</div>
			)}

			<div className='w-full my-2 mb-4 border-t'></div>

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
								<Label htmlFor='option-one' className='w-full'>
									<div className='flex items-center justify-between w-full'>
										<span>{item.title}</span>
										<div className='flex '>
											<span
												onClick={() => {
													setSelectedAnswer(item)
													setUpdateAnswerModal(true)
												}}
												className='inline-flex items-center px-3 text-sm font-light underline cursor-pointer text-primary'
											>
												{t('update')}
											</span>
											<span
												onClick={() => {
													setSelectedAnswer(item)
													setDeleteAnswerDialog(true)
												}}
												className='inline-flex items-center px-3 text-sm font-light text-red-500 underline cursor-pointer'
											>
												{t('delete')}
											</span>
										</div>
									</div>

									<div className='relative grid w-full grid-cols-3 mt-2'>
										{item.file_paths.map(item => (
											<img
												className='h-[100px] w-[120px] bg-grayBg object-cover '
												src={apiURL + item}
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
						<div
							className={`flex ${
								!item.file_paths.length ? 'items-center' : 'items-start'
							} space-x-4`}
						>
							<Checkbox disabled checked={item.isCorrect} />
							<Label htmlFor='option-one' className='w-full '>
								<div className='flex items-center justify-between w-full '>
									<span>{item.title}</span>
									<div className='flex'>
										<span
											onClick={() => {
												setSelectedAnswer(item)
												setUpdateAnswerModal(true)
											}}
											className='inline-flex items-center px-3 text-sm font-light underline cursor-pointer text-primary'
										>
											{t('update')}
										</span>
										<span
											onClick={() => {
												setSelectedAnswer(item)
												setDeleteAnswerDialog(true)
											}}
											className='inline-flex items-center px-3 text-sm font-light text-red-500 underline cursor-pointer'
										>
											{t('delete')}
										</span>
									</div>
								</div>
								{item.file_paths.length ? (
									<div className='grid grid-cols-3 py-2'>
										{item.file_paths.map(item => (
											<div className='relative'>
												<img
													className='h-[100px] bg-grayBg object-cover w-full'
													src={apiURL + item}
												/>
											</div>
										))}
									</div>
								) : null}
							</Label>
						</div>
					))}
				</div>
			)}

			<div className='w-full my-2 mt-4 border-t'></div>

			<span
				onClick={() => setAddAnserModal(true)}
				className='inline-flex items-center px-3 text-sm font-light underline cursor-pointer text-primary'
			>
				{t('add_answer')}
			</span>

			<Dialog open={dialog} onOpenChange={setDialog}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{t('want_delete_question')}</DialogTitle>
					</DialogHeader>
					<DialogFooter>
						<Button type='submit' onClick={deleteItem}>
							{t('yes')}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<Dialog open={updateModal} onOpenChange={setUpdateModal}>
				<DialogContent className='xs:w-full'>
					<DialogHeader>
						<DialogTitle>{t('update_question')}</DialogTitle>
					</DialogHeader>

					<UpdateQuestionForm
						onComplete={() => setUpdateModal(false)}
						question={question}
					/>
				</DialogContent>
			</Dialog>
			<Dialog open={addAnswerModal} onOpenChange={setAddAnserModal}>
				<DialogContent className='xs:w-full'>
					<DialogHeader>
						<DialogTitle>{t('add_answer')}</DialogTitle>
					</DialogHeader>

					<CreateOneAnswerForm
						onComplete={() => setAddAnserModal(false)}
						question={question}
					/>
				</DialogContent>
			</Dialog>
			<Dialog open={updateAnswerModal} onOpenChange={setUpdateAnswerModal}>
				<DialogContent className='xs:w-full'>
					<DialogHeader>
						<DialogTitle>{t('update_answer')}</DialogTitle>
					</DialogHeader>

					<UpdateOneAnswerForm
						onComplete={() => setUpdateAnswerModal(false)}
						question={question}
						answer={selectedAnswer!}
					/>
				</DialogContent>
			</Dialog>
			<Dialog open={deleteAnswerDialog} onOpenChange={setDeleteAnswerDialog}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{t('want_delete_answer')}</DialogTitle>
					</DialogHeader>
					<DialogFooter>
						<Button type='submit' onClick={deleteAns}>
							{t('yes')}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default QuestionItem
