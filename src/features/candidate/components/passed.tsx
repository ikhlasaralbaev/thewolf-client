import { PassedSvg } from '@/assets'
import { useTranslation } from 'react-i18next'

const Passed = () => {
	const { t } = useTranslation()

	return (
		<div className='w-full min-h-[500px] flex items-center justify-center flex-col'>
			<img className='mb-[16px]' src={PassedSvg} />

			<h1 className='text-[35px] mb-1 font-semibold'>{t('good')}</h1>
			<h2 className='mb-1 text-[20px]'>{t('all_answers_checked')}</h2>
			<p className='mb-5 font-light'>{t('connect_me')}</p>
		</div>
	)
}

export default Passed
