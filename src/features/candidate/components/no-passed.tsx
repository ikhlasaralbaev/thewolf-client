import { NoPassedSvg } from '@/assets'
import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { backToRegister } from '../store/candidate.slice'

const NoPassed = () => {
	const { currentStep } = useAppSelector(state => state.candidate)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const { t } = useTranslation()

	const handleBackTo = () => {
		dispatch(backToRegister())
		navigate('/', { replace: true })
	}

	return (
		<div className='w-full min-h-[500px] flex items-center justify-center flex-col'>
			<img className='mb-[16px]' src={NoPassedSvg} />

			<h1 className='text-[35px] mb-1 font-semibold'>{t('no_passed_title')}</h1>
			<h2 className='mb-1 text-[20px]'>
				{t('no_passed_descr1', { currentStep: currentStep! + 1 })}
			</h2>
			<p className='mb-5 font-light'>{t('no_passed_descr2')}</p>

			<Button onClick={handleBackTo}>{t('end_test')}</Button>
		</div>
	)
}

export default NoPassed
