import { ButtonHTMLAttributes, FC } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	isLoading?: boolean
}

const Button: FC<Props> = ({ children, className, ...rest }) => {
	return (
		<button
			disabled={rest.disabled || rest.isLoading}
			type='submit'
			className={`relative flex justify-center min-w-[180px] px-4 text-[20px] font-medium text-white bg-primary border border-transparent rounded-[12px] group hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mx-auto  items-center h-[60px] ${className}`}
			{...rest}
		>
			{children}
		</button>
	)
}

export default Button
