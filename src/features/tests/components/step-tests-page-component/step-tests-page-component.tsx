import { AdminContentLayout } from '@/components'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { getStepDetails } from '../../store/tests.actions'
import CreateQuestionForm from '../create-question-form/create-question-form'
import QuestionItem from '../question-item/question-item'

const StepTestsPageComponent = () => {
	const { questions, stepDetails } = useAppSelector(state => state.tests)
	const params = useParams()
	const dispatch = useAppDispatch()
	const [createQuestionModalIsOpen, setCreateQuestionModalIsOpen] =
		useState(false)

	const { t } = useTranslation()
	useEffect(() => {
		dispatch(getStepDetails({ step_id: params.id! }))
	}, [params.id])

	return (
		<AdminContentLayout title={t('questions')} backPath='/admin'>
			<>
				<div className='flex items-center justify-between mb-5'>
					<h2>{stepDetails?.title || ''}</h2>

					<Button onClick={() => setCreateQuestionModalIsOpen(true)}>
						{t('add_question')}
					</Button>
				</div>

				{questions.length === 0 ? (
					<div className='flex items-center justify-center w-full h-24 mt-6 text-xl text-gray-500 rounded-lg bg-stepBg'>
						{t('questions_not_found')}
					</div>
				) : (
					<div className='grid items-start justify-start'>
						{questions.map(item => (
							<QuestionItem question={item} />
						))}
					</div>
				)}

				<Dialog
					open={createQuestionModalIsOpen}
					onOpenChange={setCreateQuestionModalIsOpen}
				>
					<DialogContent className='sm:max-w-[425px]'>
						<DialogHeader>
							<DialogTitle>{t('add_question')}</DialogTitle>
						</DialogHeader>

						<CreateQuestionForm
							onComplete={() => setCreateQuestionModalIsOpen(false)}
						/>
					</DialogContent>
				</Dialog>
			</>
		</AdminContentLayout>
	)
}

export default StepTestsPageComponent
