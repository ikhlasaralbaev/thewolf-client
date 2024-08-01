import { LoadingOverlay } from '@/components'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { useAppSelector } from '@/hooks/store-hooks'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import CreateStepForm from '../create-step-form/create-step-form'
import StepItem from '../step-item/step-item'

const TestSteps = () => {
	const { steps, isLoadingSteps } = useAppSelector(state => state.tests)
	const [createStepModalIsOpen, setCreateStepModalIsOpen] = useState(false)
	const { t } = useTranslation()

	return (
		<div className='relative grid min-h-[200px]  items-start'>
			{!isLoadingSteps && steps.length === 0 ? (
				<div className='flex items-center justify-center w-full h-24 px-3 mt-6 text-xl text-center text-gray-500 rounded-lg bg-stepBg'>
					{t('test_steps_not')}
				</div>
			) : isLoadingSteps ? (
				<LoadingOverlay />
			) : (
				<div className='grid items-start gap-4 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
					{steps.map(item => (
						<StepItem step={item} key={item.id} />
					))}
				</div>
			)}

			<span
				onClick={() => setCreateStepModalIsOpen(true)}
				className='mt-4 font-light text-blue-500 underline cursor-pointer'
			>
				+ {t('new_step')}
			</span>

			<Dialog
				open={createStepModalIsOpen}
				onOpenChange={setCreateStepModalIsOpen}
			>
				<DialogContent className='sm:max-w-[425px]'>
					<DialogHeader>
						<DialogTitle>{t('new_step')}</DialogTitle>
					</DialogHeader>

					<CreateStepForm onComplete={() => setCreateStepModalIsOpen(false)} />
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default TestSteps
