import { LogoSvg } from '@/assets'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useTranslation } from 'react-i18next'
const userNavigation = [
	{ icon: 'uz', name: 'Uzbek', href: '#' },
	{ icon: 'ru', name: 'Russian', href: '#' },
	{ icon: 'us', name: 'English', href: '#' },
]
const CandidateContentHeader = () => {
	const { i18n } = useTranslation()
	return (
		<div className='flex items-center justify-between w-full'>
			<img src={LogoSvg} />

			<Menu as='div' className='relative'>
				<MenuButton className='-m-1.5 flex items-center p-1.5'>
					<span className='sr-only'>Open user menu</span>
					<span className='fi fi-uz'></span>
					<span className='hidden lg:flex lg:items-center'>
						<span
							aria-hidden='true'
							className='ml-2 text-sm font-semibold leading-6 text-gray-900'
						>
							{userNavigation.find(item => item.icon === i18n.language)?.name ||
								'Uz'}
						</span>
					</span>
				</MenuButton>
				<MenuItems
					transition
					className='absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in'
				>
					{userNavigation.map(item => (
						<MenuItem key={item.name}>
							<button
								onClick={() => {
									i18n.changeLanguage(item.icon)
								}}
								className='flex gap-2 items-center px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50 w-full'
							>
								<span className={`fi fi-${item.icon}`}></span>
								{item.name}
							</button>
						</MenuItem>
					))}
				</MenuItems>
			</Menu>
		</div>
	)
}

export default CandidateContentHeader
