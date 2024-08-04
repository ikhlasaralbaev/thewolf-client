import { AdminContentLayout } from '@/components'
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import EmployeeItem from './components/employee-item'
import EmployeesHeader from './components/employees-header'
import { getAllEmployees } from './store/employees.action'

const Employees = () => {
	const { employees } = useAppSelector(state => state.employees)
	const dispatch = useAppDispatch()
	const { t } = useTranslation()

	useEffect(() => {
		dispatch(getAllEmployees())
	}, [])

	return (
		<AdminContentLayout title={t('employees')}>
			<>
				<EmployeesHeader />

				<div className='grid gap-3 mt-4 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
					{employees?.map(item => (
						<EmployeeItem employee={item} key={item.id} />
					))}
				</div>
			</>
		</AdminContentLayout>
	)
}

export default Employees
