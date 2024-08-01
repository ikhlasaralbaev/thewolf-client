import { PassedSvg, TelegramSvg } from '@/assets'
import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/hooks/store-hooks'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { backToRegister } from '../store/candidate.slice'

const Passed = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const { t } = useTranslation()

	const handleBackTo = () => {
		dispatch(backToRegister())
		navigate('/', { replace: true })
	}

	return (
		<div className='w-full min-h-[500px] flex items-center justify-center flex-col'>
			<img className='mb-[16px]' src={PassedSvg} />

			<h1 className='text-[35px] mb-1 font-semibold'>{t('good')}</h1>
			<h2 className='mb-1 text-[20px]'>{t('all_answers_checked')}</h2>
			<p className='mb-5 font-light'>{t('connect_me')}</p>

			<Button onClick={handleBackTo}>
				{t('connect')} <img src={TelegramSvg} />
			</Button>
		</div>
	)
}

export default Passed
