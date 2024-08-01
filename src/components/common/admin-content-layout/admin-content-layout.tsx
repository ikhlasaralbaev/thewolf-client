import { FC } from 'react'
import BackButton from '../back-button'

interface Props {
	children: JSX.Element
	breadcrumb?: any[]
	title: string
	isBack?: boolean
	backPath?: string
}

const AdminContentLayout: FC<Props> = ({
	title,
	children,
	isBack = true,
	backPath,
}) => {
	return (
		<div className='grid gap-[24px]'>
			<div className='flex items-center gap-2'>
				{isBack && <BackButton path={backPath} />}
				<h1 className='text-[18px] font-semibold'>{title}</h1>
			</div>

			<div
				className='bg-white w-full rounded-[12px] px-[36px] py-4 pb-0 overflow-y-auto'
				style={{ height: 'calc(100vh - 200px)' }}
			>
				{children}
			</div>
		</div>
	)
}

export default AdminContentLayout
