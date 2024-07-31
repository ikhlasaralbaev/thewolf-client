import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import CandidateContentHeader from './candidate-content-header'

interface Props {}

const CandidateContentLayout: FC<Props> = () => {
	return (
		<div className='flex items-center justify-center w-full min-h-screen bg-grayBg lg:py-[50px]'>
			<div className='lg:max-w-[840px] w-[840px] xs:w-full shadow-md bg-white xs:px-[20px] md:px-[60px] py-[16px]  lg:h-auto '>
				<CandidateContentHeader />

				<Outlet />
			</div>
		</div>
	)
}

export default CandidateContentLayout
