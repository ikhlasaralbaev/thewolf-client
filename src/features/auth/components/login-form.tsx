import { LockSvg, LogoSvg, MessageSvg } from '@/assets'
import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/hooks/store-hooks'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import useAuth from '../hooks/use-auth'
import { loginAction } from '../store/auth.actions'
import { ILoginReqType } from '../types/auth.types'

const LoginForm = () => {
	const [showPassword, setShowPassword] = useState(false)

	const dispatch = useAppDispatch()
	const { t } = useTranslation()
	const { isAuthLoading, user } = useAuth()

	const navigate = useNavigate()

	// Validation schema
	const validationSchema = Yup.object().shape({
		email: Yup.string().required('Email is required').email('Email is invalid'),
		password: Yup.string()
			.required('Password is required')
			.min(6, 'Password must be at least 6 characters'),
	})

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationSchema),
	})

	const onSubmit = (data: ILoginReqType) => {
		dispatch(loginAction(data)).then(res => {
			if (res.type === 'auth/login/fulfilled') {
				toast.success(t('loggged_in'))
			}
		})
	}

	useEffect(() => {
		if (user) {
			navigate('/admin', { replace: true })
		}
	}, [user])

	return (
		<div className='flex items-center justify-center w-[440px] h-[440px] bg-gray-50 px-[34px] py-[44px] rounded-[12px] '>
			<div className='w-full max-w-md space-y-8 '>
				<div>
					<img
						className='w-auto h-[55px] mx-auto'
						src={LogoSvg}
						alt='TheWolf Recruiting'
					/>
					<h2 className='mt-2 text-[20px] font-[700] text-center text-gray-900'>
						Добро пожаловать!
					</h2>
					<p className='text-sm text-center text-gray-400'>
						Войдите в свой аккаунт
					</p>
				</div>
				<form className='mt-8 space-y-6' onSubmit={handleSubmit(onSubmit)}>
					<div className='-space-y-px rounded-md '>
						<div className='relative mb-[30px]'>
							<label
								className={`flex items-center px-4 py-4 rounded-[8px] bg-grayBg border  ${
									errors.email ? ' border-red-400' : 'border-transparent'
								}`}
							>
								<img
									src={MessageSvg}
									className=' left-3 top-2.5 text-gray-400'
								/>
								<input
									id='email-address'
									type='email'
									autoComplete='email'
									{...register('email')}
									className={`bg-transparent px-4 w-full outline-none border-none`}
									placeholder='Напишите свою почту/логин'
								/>
							</label>
						</div>
						<div className='relative'>
							<label
								className={`flex items-center px-4 py-4 rounded-[8px] bg-grayBg border   ${
									errors.password ? ' border-red-400' : 'border-transparent'
								}`}
							>
								<img src={LockSvg} className=' left-3 top-2.5 text-gray-400' />
								<input
									id='password'
									type={showPassword ? 'text' : 'password'}
									autoComplete='current-password'
									{...register('password')}
									className={`bg-transparent px-4 w-full outline-none border-none`}
									placeholder='Пароль'
								/>
								<button
									type='button'
									className='inset-y-0 right-0 flex items-center text-xl text-gray-400'
									onClick={() => setShowPassword(!showPassword)}
								>
									{showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
								</button>
							</label>
						</div>
					</div>

					<div>
						<Button
							isLoading={isAuthLoading}
							type='submit'
							className='relative flex justify-center w-[180px] px-4 text-[20px] font-medium text-white bg-primary border border-transparent rounded-[12px] group hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mx-auto  items-center h-[60px]'
						>
							Войти
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default LoginForm
