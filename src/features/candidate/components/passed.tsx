import { PassedSvg, TelegramSvg } from '@/assets'
import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/hooks/store-hooks'
import { useNavigate } from 'react-router-dom'
import { backToRegister } from '../store/candidate.slice'

const Passed = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const handleBackTo = () => {
		dispatch(backToRegister())
		navigate('/', { replace: true })
	}

	return (
		<div className='w-full min-h-[500px] flex items-center justify-center flex-col'>
			<img className='mb-[16px]' src={PassedSvg} />

			<h1 className='text-[35px] mb-1 font-semibold'>Отлично!</h1>
			<h2 className='mb-1 text-[20px]'>Вы успешно прошли все этапы</h2>
			<p className='mb-5 font-light'>
				Для дальнейших этапов, свяжитесь с HR в Тelegram
			</p>

			<Button onClick={handleBackTo}>
				Связаться <img src={TelegramSvg} />
			</Button>
		</div>
	)
}

export default Passed
