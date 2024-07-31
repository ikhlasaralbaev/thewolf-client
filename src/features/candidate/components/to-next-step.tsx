import { DoneSvg } from '@/assets'
import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks'
import { useNavigate } from 'react-router-dom'
import { setStep } from '../store/candidate.slice'

const ToNextStep = () => {
	const { currentStep } = useAppSelector(state => state.candidate)
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const handleNextStep = () => {
		dispatch(setStep(currentStep! + 1))
		navigate('/tests', { replace: true })
	}

	return (
		<div className='w-full min-h-[500px] flex items-center justify-center flex-col'>
			<img className='mb-[16px]' src={DoneSvg} />

			<h1 className='text-[35px] mb-1 font-semibold'>Отлично!</h1>
			<h2 className='mb-1 text-[20px]'>
				Вы успешно прошли {currentStep! + 1} этапы
			</h2>
			<p className='mb-5 font-light'>
				нажмите Продолжить чтобы перейти на новый этап
			</p>

			<Button onClick={handleNextStep}>Продолжить тест</Button>
		</div>
	)
}

export default ToNextStep
