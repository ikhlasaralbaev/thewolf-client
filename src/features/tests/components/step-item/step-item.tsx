import { MenuDotsSvg } from '@/assets'
import {
	Button,
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
} from '@headlessui/react'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { IStep } from '../../types'

interface Props {
	step: IStep
}

const StepItem: FC<Props> = ({ step }) => {
	const navigation = useNavigate()

	return (
		<div
			onClick={() => {
				navigation(`/admin/step-tests/${step.id}`, { replace: true })
			}}
			className='bg-stepBg px-3 py-[14px] flex items-center justify-between rounded-[8px] cursor-pointer'
		>
			<h2 className='text-gray-500 text-[16px] font-semibold'>{step.title}</h2>

			<Menu as='div' className='relative'>
				<MenuButton
					onClick={e => e.stopPropagation()}
					className='-m-1.5 flex items-center p-1.5'
				>
					<span className='sr-only'>Open user menu</span>
					<Button>
						<img src={MenuDotsSvg} />
					</Button>
				</MenuButton>
				<MenuItems
					transition
					className='absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in'
				>
					<MenuItem>
						<button
							onClick={e => e.stopPropagation()}
							className='flex gap-2 items-center px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50 w-full'
						>
							Переименовать
						</button>
					</MenuItem>
					<MenuItem>
						<button
							onClick={e => e.stopPropagation()}
							className='flex gap-2 items-center px-3 py-1 text-sm leading-6 text-red-600 data-[focus]:bg-gray-50 w-full'
						>
							Удалить этап
						</button>
					</MenuItem>
				</MenuItems>
			</Menu>
		</div>
	)
}

export default StepItem
