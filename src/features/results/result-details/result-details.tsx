import { AdminContentLayout } from '@/components'
import { candidateKnownLanguages, regions } from '@/features/candidate/lib/data'
import { useAppSelector } from '@/hooks/store-hooks'
import { FileScanIcon } from 'lucide-react'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { IResult } from '../types'

const ResultDetails = () => {
	const params = useParams()
	const [details, setDetails] = useState<IResult | null>()
	const { results } = useAppSelector(state => state.results)
	const { t, i18n } = useTranslation()

	useEffect(() => {
		setDetails(results.find(item => item.id.toString() === params.id!))
	}, [params.id])

	return (
		<AdminContentLayout title={t('results')}>
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
						{t('date_of_created_result')}:{' '}
						{moment(details?.createdAt).format('DD.MM.YYYY HH:mm:ss')}
					</h1>
				</div>
				{details?.candidate.resumeUrl ? (
					<div className='py-[15px] border-b border-b-gray-300'>
						<h1 className='flex items-center text-sm text-gray-400'>
							{t('download_resume')}:
						</h1>
						<h1 className='font-semibold'>
							<a
								className='flex items-center gap-1 mt-2 underline text-primary'
								download
								href={details?.candidate.resumeUrl}
							>
								<span className='text-xl'>
									<FileScanIcon className='text-sm' />
								</span>{' '}
								{t('download_resume')}
							</a>
						</h1>
					</div>
				) : null}
				<div className='py-[15px] border-b border-b-gray-300'>
					<h1 className='flex items-center text-sm text-gray-400'>
						{t('birthdate')}
					</h1>
					<h1 className='font-semibold'>
						{moment(details?.candidate.birthdate).format('DD.MM.YYYY')}
					</h1>
				</div>
				{details?.candidate?.languages?.length ? (
					<div className='py-[15px] border-b border-b-gray-300'>
						<h1 className='flex items-center text-sm text-gray-400'>
							{t('languages')}
						</h1>
						<h1 className='font-semibold'>
							{details?.candidate.languages.map(
								item =>
									// @ts-ignore
									candidateKnownLanguages.find(
										(x: any) => x.language === item
									)?.[i18n.language] || '--' + ' '
							) || '--'}
						</h1>
					</div>
				) : null}
				<div className='py-[15px] border-b border-b-gray-300'>
					<h1 className='flex items-center text-sm text-gray-400'>
						{t('phone')}
					</h1>
					<h1 className='font-semibold'>{details?.candidate.phone}</h1>
				</div>
				<div className='py-[15px] border-b border-b-gray-300'>
					<h1 className='flex items-center text-sm text-gray-400'>
						{t('region')}
					</h1>
					<h1 className='font-semibold'>
						{regions.find(item => item.code === details?.candidate.area)?.ru ||
							details?.candidate.area}
					</h1>
				</div>
				<div className='py-[15px] border-b border-b-gray-300'>
					<h1 className='flex items-center text-sm text-gray-400'>
						{t('district')}
					</h1>
					<h1 className='font-semibold'>{details?.candidate.district}</h1>
				</div>
				<div className='py-[15px] border-b border-b-gray-300'>
					<h1 className='flex items-center text-sm text-gray-400'>
						{t('lastJob')}
					</h1>
					<h1 className='font-semibold'>{details?.candidate.lastJob}</h1>
				</div>
				<div className='py-[15px] border-b border-b-gray-300'>
					<h1 className='flex items-center text-sm text-gray-400'>
						{t('experience')}
					</h1>
					<h1 className='font-semibold'>
						{t(details?.candidate.experience?.toString() || '')}
					</h1>
				</div>
			</>
		</AdminContentLayout>
	)
}

export default ResultDetails
