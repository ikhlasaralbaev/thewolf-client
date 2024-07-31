import { regions } from '@/features/candidate/lib/data'
import { Map, Phone } from 'lucide-react'
import { FC } from 'react'
import { IResult } from '../types'

interface Props {
	result: IResult
}

const ResultItem: FC<Props> = ({ result }) => {
	return (
		<div
			className={`flex justify-between items-start px-5 py-[14px] mb-[2px] cursor-pointer ${
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
						{result.correctAnswers} правильных ответов
					</h1>
				</li>
				<li className='text-sm font-light text-gray-400'>
					<h1>Время прохождения теста: 12.12.2024 / 12:12</h1>
				</li>
			</ul>

			<ul className='flex flex-col items-end justify-end gap-2'>
				<li>
					<h2
						className={`font-semibold ${
							result.isPassed ? 'text-green-500' : 'text-red-500'
						}`}
					>
						{result.isPassed ? 'Сдал успешно' : 'Провален'}
					</h2>
				</li>
				<li className='flex items-center gap-1'>
					<Phone className='text-xs text-primary' /> {result.candidate.phone}
				</li>
				<li className='flex items-center gap-1'>
					<Map className='text-xs text-primary' />{' '}
					{regions.find(item => item.code === result.candidate.area)?.ru ||
						result.candidate.area}
					, {result.candidate.district}
				</li>
			</ul>
		</div>
	)
}

export default ResultItem
