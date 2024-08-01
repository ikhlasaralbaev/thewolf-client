import { AdminContentLayout } from '@/components'
import { regions } from '@/features/candidate/lib/data'
import { useAppSelector } from '@/hooks/store-hooks'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IResult } from '../types'

const ResultDetails = () => {
	const params = useParams()
	const [details, setDetails] = useState<IResult | null>()
	const { results } = useAppSelector(state => state.results)

	useEffect(() => {
		setDetails(results.find(item => item.id.toString() === params.id!))
	}, [params.id])

	return (
		<AdminContentLayout title='Кандидаты'>
			<>
				<div className='py-[15px] border-b border-b-gray-300'>
					<h1 className='flex items-center gap-2'>
						<span className='text-[18px] font-semibold'>
							{details?.candidate?.fullName}{' '}
						</span>
						<span
							className={details?.isPassed ? 'text-green-500' : 'text-red-500'}
						>
							{details?.isPassed ? 'Сдал успешно' : 'Провален'}
						</span>
					</h1>
					<h1>{details?.test.title}</h1>
					<h1 className='text-sm text-gray-400'>
						Время прохождения теста: 12.12.2024 / 12:12
					</h1>
				</div>
				<div className='py-[15px] border-b border-b-gray-300'>
					<h1 className='flex items-center text-sm text-gray-400'>
						Номер телефона
					</h1>
					<h1 className='font-semibold'>{details?.candidate.phone}</h1>
				</div>
				<div className='py-[15px] border-b border-b-gray-300'>
					<h1 className='flex items-center text-sm text-gray-400'>
						Область проживания
					</h1>
					<h1 className='font-semibold'>
						{regions.find(item => item.code === details?.candidate.area)?.ru ||
							details?.candidate.area}
					</h1>
				</div>
				<div className='py-[15px] border-b border-b-gray-300'>
					<h1 className='flex items-center text-sm text-gray-400'>
						Район проживания
					</h1>
					<h1 className='font-semibold'>{details?.candidate.district}</h1>
				</div>
				<div className='py-[15px] border-b border-b-gray-300'>
					<h1 className='flex items-center text-sm text-gray-400'>
						Последнее место работы
					</h1>
					<h1 className='font-semibold'>{details?.candidate.lastJob}</h1>
				</div>
				<div className='py-[15px] border-b border-b-gray-300'>
					<h1 className='flex items-center text-sm text-gray-400'>
						Опыт работы
					</h1>
					<h1 className='font-semibold'>{details?.candidate.experience}</h1>
				</div>
			</>
		</AdminContentLayout>
	)
}

export default ResultDetails
