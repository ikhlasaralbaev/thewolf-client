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
		).then(res => {
			if (res.type === 'candidate/craete/fulfilled') {
				toast.success('Welcome to first step of tests!')
			}
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
				<h1 className='text-[20px] font-bold'>Заполните опросник для...</h1>
				<p className='text-[16px] font-light'>Первый этап отбора</p>
			</div>
			<div className='grid xs:grid-cols-1 md:grid-cols-2 gap-x-4 '>
				<div className='mb-[10px] grid'>
					<label className='mb-2'>FIO</label>
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
					<label className='mb-2'>Phone</label>
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
					<label className='mb-2'>Birthdate</label>
					<Controller
						name='birthdate'
						control={control}
						render={({ field }) => (
							<Input
								className={`border ${errors.birthdate ? 'border-red-500' : ''}`}
								type='date'
								{...field}
							/>
						)}
					/>
				</div>
				<div className='mb-[10px] grid'>
					<label className='mb-2'>Region</label>
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
									<SelectValue placeholder='Select a language' />
								</SelectTrigger>
								<SelectContent>
									{regions.map(item => (
										<SelectItem value={item.code}>{item.en}</SelectItem>
									))}
								</SelectContent>
							</Select>
						)}
					/>
				</div>
				<div className='mb-[10px] grid'>
					<label className='mb-2'>District</label>
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
					<label className='mb-2'>Lastjob</label>
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
					<label className='mb-2'>Language</label>

					<Select
						value={testLanguage}
						onValueChange={lang => {
							setTestLanguage(lang)
							console.log(lang)
						}}
					>
						<SelectTrigger className='w-full'>
							<SelectValue placeholder='Select a language' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value={'uz'}>Uzbek</SelectItem>
							<SelectItem value={'ru'}>Russian</SelectItem>
							<SelectItem value={'en'}>English</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div className='mb-[10px] grid'>
					<label className='mb-2'>Direction</label>
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
									<SelectValue placeholder='Select a direction' />
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
					<label className='mb-2'>Experience</label>
					<Controller
						name='experience'
						control={control}
						render={({ field }) => (
							<Input
								className={`border ${
									errors.experience ? 'border-red-500' : ''
								}`}
								type='number'
								{...field}
							/>
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
					Начать тест
				</Button>
			</div>
		</form>
	)
}

export default CandidateAuth
