import { regions } from '@/features/candidate/lib/data'
import { Map, Phone } from 'lucide-react'
import moment from 'moment'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { IResult } from '../types'
interface Props {
	result: IResult
}

const ResultItem: FC<Props> = ({ result }) => {
	const { t, i18n } = useTranslation()
	return (
		<Link
			to={`/admin/result/${result.id}`}
			className={`flex xs:flex-col md:flex-row md:justify-between items-start px-5 py-[14px] mb-[2px] cursor-pointer gap-4 ${
				result.isPassed ? 'bg-green-200' : 'bg-red-200'
			}`}
		>
			<ul className='grid gap-1'>
				<li>
					<h1 className='font-semibold text-[16px]'>
						{result.candidate.fullName}
					</h1>
				</li>
				<li className='flex gap-1'>
					<h1 className='text-[16px]'>{result.test.title}: </h1>
					<h1 className='text-[16px]'>
						{result.correctAnswers} {t('correct_answers')}
					</h1>
				</li>
				<li className='text-sm font-light text-gray-400'>
					<h1>
						{t('created_at_result')}:{' '}
						{moment(result?.createdAt).format('DD.MM.YYYY / HH:mm')}
					</h1>
				</li>
			</ul>

			<ul className='flex flex-col justify-end gap-2 md:items-end'>
				<li>
					<h2
						className={`font-semibold ${
							result.isPassed ? 'text-green-500' : 'text-red-500'
						}`}
					>
						{result.isPassed ? t('passed') : t('no_passed')}
					</h2>
				</li>
				<li className='flex items-center gap-1'>
					<Phone className='text-xs text-primary' /> {result.candidate.phone}
				</li>
				<li className='flex items-center gap-1'>
					<Map className='text-xs text-primary' />{' '}
					{i18n.language === 'ru'
						? regions.find(item => item.code === result.candidate.area)?.ru
						: i18n.language === 'en'
						? regions.find(item => item.code === result.candidate.area)?.en
						: regions.find(item => item.code === result.candidate.area)?.uz ||
						  result.candidate.area}
					, {result.candidate.district}
				</li>
			</ul>
		</Link>
	)
}

export default ResultItem
