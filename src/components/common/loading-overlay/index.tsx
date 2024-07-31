// src/LoadingOverlay.jsx

const LoadingOverlay = () => {
	return (
		<div className='absolute inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75 backdrop-filter backdrop-blur-sm '>
			<div className='flex items-center justify-center space-x-2'>
				<svg
					className='w-10 h-10 text-primary animate-spin'
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
				>
					<circle
						className='opacity-25'
						cx='12'
						cy='12'
						r='10'
						stroke='currentColor'
						strokeWidth='4'
					></circle>
					<path
						className='opacity-75'
						fill='currentColor'
						d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291l1.42-1.42a6 6 0 110-8.484L6 6.709A8 8 0 0012 20v-2.709z'
					></path>
				</svg>
			</div>
		</div>
	)
}

export default LoadingOverlay
