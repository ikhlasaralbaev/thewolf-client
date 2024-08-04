import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import CreateEmployeeForm from './employee-create-form'
const EmployeesHeader = () => {
	const [createTestModalIsOpen, setCreateTestModalIsOpen] = useState(false)
	const { t } = useTranslation()
	return (
		<div className='flex items-center justify-end'>
			<Button onClick={() => setCreateTestModalIsOpen(true)}>
				{' '}
				Add employee
			</Button>

			<Dialog
				open={createTestModalIsOpen}
				onOpenChange={setCreateTestModalIsOpen}
			>
				<DialogContent className='xs:w-full'>
					<DialogHeader>
						<DialogTitle>{t('create_test')}</DialogTitle>
					</DialogHeader>

					<CreateEmployeeForm
						onComplete={() => setCreateTestModalIsOpen(false)}
					/>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default EmployeesHeader
