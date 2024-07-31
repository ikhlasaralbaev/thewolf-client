import { NoPassedSvg } from '@/assets'
import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks'
import { useNavigate } from 'react-router-dom'
import { backToRegister } from '../store/candidate.slice'

const NoPassed = () => {
	const { currentStep } = useAppSelector(state => state.candidate)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const handleBackTo = () => {
		dispatch(backToRegister())
		navigate('/', { replace: true })
	}

	return (
		<div className='w-full min-h-[500px] flex items-center justify-center flex-col'>
			<img className='mb-[16px]' src={NoPassedSvg} />

			<h1 className='text-[35px] mb-1 font-semibold'>Увы</h1>
			<h2 className='mb-1 text-[20px]'>Вы не прошли {currentStep! + 1} этап</h2>
			<p className='mb-5 font-light'>Спасибо за уделенное время</p>

			<Button onClick={handleBackTo}>Закончить тестирование</Button>
		</div>
	)
}

export default NoPassed
