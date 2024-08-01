import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { getAllTestsAction } from '../tests/store/tests.actions'
import { regions } from './lib/data'
import { candidateCreateValidator } from './lib/validator/candidate.validators'
import { createCandidate } from './store/candidate.actions'
const CandidateAuth = () => {
	const { isCreatingCandidate, candidate, test } = useAppSelector(
		state => state.candidate
	)
	const [testLanguage, setTestLanguage] = useState('uz')
	const { tests } = useAppSelector(state => state.tests)
	const navigate = useNavigate()
	const { t, i18n } = useTranslation()

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(candidateCreateValidator),
	})

	const dispatch = useAppDispatch()

	const onSubmit = (data: any) => {
		dispatch(
			createCandidate({ data: { ...data, test: Number(data.direction) } })
		)
			.then(res => {
				if (res.type === 'candidate/craete/fulfilled') {
					toast.success('Welcome to first step of tests!')
				} else {
					toast.error(t('error'))
				}
			})
			.catch(() => {
				toast.error(t('error'))
			})
	}

	useEffect(() => {
		dispatch(getAllTestsAction({ lang: testLanguage }))
	}, [testLanguage])

	useEffect(() => {
		if (test && candidate) {
			navigate('/tests', { replace: true })
		}
	}, [test, candidate])

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className='flex flex-col items-center justify-center my-[20px]'>
				<h1 className='text-[20px] font-bold'>{t('enter_your_details')}</h1>
				<p className='text-[16px] font-light'>{t('for_first_step')}</p>
			</div>
			<div className='grid xs:grid-cols-1 md:grid-cols-2 gap-x-4 '>
				<div className='mb-[10px] grid'>
					<label className='mb-2'>{t('fio')}</label>
					<Controller
						name='fullName'
						control={control}
						render={({ field }) => (
							<Input
								className={`border ${errors.fullName ? 'border-red-500' : ''}`}
								{...field}
							/>
						)}
					/>
				</div>
				<div className='mb-[10px] grid'>
					<label className='mb-2'>{t('phone')}</label>
					<Controller
						name='phone'
						control={control}
						render={({ field }) => (
							<Input
								className={`border ${errors.phone ? 'border-red-500' : ''}`}
								defaultValue={'+998'}
								{...field}
							/>
						)}
					/>
				</div>
				<div className='mb-[10px] grid'>
					<label className='mb-2'>{t('birthdate')}</label>
					<Controller
						name='birthdate'
						control={control}
						render={({ field }) => (
							<Input
								className={`border w-full ${
									errors.birthdate ? 'border-red-500' : ''
								}`}
								type='date'
								{...field}
							/>
						)}
					/>
				</div>
				<div className='mb-[10px] grid'>
					<label className='mb-2'>{t('region')}</label>
					<Controller
						name='area'
						control={control}
						render={({ field }) => (
							<Select
								value={field.value}
								onValueChange={region => {
									field.onChange(region)
								}}
							>
								<SelectTrigger className='w-full'>
									<SelectValue placeholder={t('region')} />
								</SelectTrigger>
								<SelectContent>
									{regions.map(item => (
										<SelectItem value={item.code}>
											{i18n.language === 'en'
												? item.en
												: i18n.language === 'ru'
												? item.ru
												: item.uz}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						)}
					/>
				</div>
				<div className='mb-[10px] grid'>
					<label className='mb-2'>{t('district')}</label>
					<Controller
						name='district'
						control={control}
						render={({ field }) => (
							<Input
								className={`border ${errors.district ? 'border-red-500' : ''}`}
								{...field}
							/>
						)}
					/>
				</div>
				<div className='mb-[10px] grid'>
					<label className='mb-2'>{t('lastJob')}</label>
					<Controller
						name='lastJob'
						control={control}
						render={({ field }) => (
							<Input
								className={`border ${errors.lastJob ? 'border-red-500' : ''}`}
								{...field}
							/>
						)}
					/>
				</div>
				<div className='mb-[10px] grid'>
					<label className='mb-2'>{t('language')}</label>

					<Select
						value={testLanguage}
						onValueChange={lang => {
							setTestLanguage(lang)
							console.log(lang)
						}}
					>
						<SelectTrigger className='w-full'>
							<SelectValue placeholder={t('language') + ':'} />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value={'uz'}>{t('uz')}</SelectItem>
							<SelectItem value={'ru'}>{t('ru')}</SelectItem>
							<SelectItem value={'en'}>{t('en')}</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div className='mb-[10px] grid'>
					<label className='mb-2'>{t('direction')}</label>
					<Controller
						name='direction'
						control={control}
						render={({ field }) => (
							<Select
								value={field.value}
								onValueChange={lang => {
									field.onChange(lang)
								}}
							>
								<SelectTrigger className='w-full'>
									<SelectValue placeholder={t('direction')} />
								</SelectTrigger>
								<SelectContent>
									{tests.map(item => (
										<SelectItem value={String(item.id)}>
											{item.title}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						)}
					/>
				</div>

				<div className='grid '>
					<label className='mb-2'>{t('experience')}</label>
					<Controller
						name='experience'
						control={control}
						render={({ field }) => (
							<Select
								onValueChange={lang => {
									field.onChange(lang)
									console.log(lang)
								}}
							>
								<SelectTrigger
									className={`border w-full ${
										errors.experience ? 'border-red-500' : ''
									}`}
								>
									<SelectValue placeholder={t('experience')} />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value={'no_experience'}>
										{t('no_experience')}
									</SelectItem>
									<SelectItem value={'exp-6-12'}>{t('exp-6-12')}</SelectItem>
									<SelectItem value={'exp-1-3'}>{t('exp-1-3')}</SelectItem>
									<SelectItem value={'exp-3+'}>{t('exp-3+')}</SelectItem>
								</SelectContent>
							</Select>
						)}
					/>
				</div>
			</div>
			<div className='flex justify-center'>
				<Button
					className='w-[290px] mx-auto mt-12 mb-12'
					type='submit'
					isLoading={isCreatingCandidate}
				>
					{t('start_test')}
				</Button>
			</div>
		</form>
	)
}

export default CandidateAuth
