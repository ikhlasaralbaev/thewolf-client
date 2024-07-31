// src/components/BackButton.js
import { useNavigate } from 'react-router-dom'

const BackButton = () => {
	const navigate = useNavigate()

	const handleBack = () => {
		navigate(-1)
	}

	return (
		<button
			onClick={handleBack}
			className='flex items-center justify-center w-10 h-10 transition duration-200 border rounded-full cursor-pointer border-border hover:bg-gray-100'
		>
			<svg
				className='w-6 h-6 text-gray-400'
				fill='none'
				stroke='currentColor'
				viewBox='0 0 24 24'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth='2'
					d='M15 19l-7-7 7-7'
				/>
			</svg>
		</button>
	)
}

export default BackButton
