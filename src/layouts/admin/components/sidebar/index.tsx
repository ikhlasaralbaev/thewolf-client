import { LogoSvg } from '@/assets'
import { Button } from '@/components/ui/button'
import {
	Dialog as Alert,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { logout } from '@/features/auth/store/auth.slice'
import { useAppDispatch } from '@/hooks/store-hooks'
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
	TransitionChild,
} from '@headlessui/react'
import { Bars3Icon, UsersIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { GridIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { LogOut, UserCircle } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, Outlet, useLocation } from 'react-router-dom'

const navigation = [
	{ name: 'tests', href: '/admin', icon: GridIcon, current: true },
	{
		name: 'results',
		href: '/admin/candidates',
		icon: UsersIcon,
		current: false,
	},
	{
		name: 'employees',
		href: '/admin/employees',
		icon: UserCircle,
		current: false,
	},
]
const userNavigation = [
	{ icon: 'uz', lang: 'uz', name: 'Uzbek', href: '#' },
	{ icon: 'ru', lang: 'ru', name: 'Russian', href: '#' },
	{ icon: 'us', lang: 'en', name: 'English', href: '#' },
]

function classNames(...classes: any[]) {
	return classes.filter(Boolean).join(' ')
}

export default function AdminLayout() {
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const { i18n, t } = useTranslation()
	const { pathname } = useLocation()
	const dispatch = useAppDispatch()

	return (
		<>
			<div>
				<Dialog
					open={sidebarOpen}
					onClose={setSidebarOpen}
					className='relative z-50 lg:hidden'
				>
					<DialogBackdrop
						transition
						className='fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0'
					/>

					<div className='fixed inset-0 flex'>
						<DialogPanel
							transition
							className='relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full'
						>
							<TransitionChild>
								<div className='absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0'>
									<button
										type='button'
										onClick={() => setSidebarOpen(false)}
										className='-m-2.5 p-2.5'
									>
										<span className='sr-only'>Close sidebar</span>
										<XMarkIcon
											aria-hidden='true'
											className='w-6 h-6 text-white'
										/>
									</button>
								</div>
							</TransitionChild>
							{/* Sidebar component, swap this element with another sidebar if you like */}
							<div className='flex flex-col px-6 pb-4 overflow-y-auto bg-white grow gap-y-5'>
								<div className='flex items-center h-[55px] w-full mt-[20px] justify-center'>
									<img
										alt='MUSA IT TECHNOLOGIES'
										src={LogoSvg}
										className='h-[55px] w-wull'
									/>
								</div>
								<nav className='flex flex-col flex-1'>
									<ul role='list' className='flex flex-col flex-1 gap-y-7'>
										<li>
											<ul role='list' className='-mx-2 space-y-1'>
												{navigation.map(item => (
													<li key={item.name} className='mb-2'>
														<Link
															to={item.href}
															className={classNames(
																item.href === pathname
																	? 'bg-primary text-white'
																	: 'text-gray-700 hover:bg-gray-50 ',
																'group flex gap-x-3 py-4 px-[20px] text-sm font-semibold leading-6 rounded-[12px]'
															)}
														>
															<item.icon
																aria-hidden='true'
																className={classNames(
																	item.href === pathname
																		? 'text-white'
																		: 'text-gray-400 group-hover:text-primary',
																	'h-6 w-6 shrink-0'
																)}
															/>
															{t(item.name)}
														</Link>
													</li>
												))}
											</ul>
										</li>

										<li className='mt-auto'>
											<Alert>
												<DialogTrigger className='w-full'>
													<button className='flex w-full p-2 -mx-2 text-sm font-semibold leading-6 text-red-500 rounded-md group gap-x-3 hover:bg-gray-50 hover:text-red-600'>
														<LogOut
															aria-hidden='true'
															className='w-6 h-6 text-red-400 shrink-0 group-hover:text-red-600'
														/>
														{t('logout')}
													</button>
												</DialogTrigger>
												<DialogContent onClick={e => e.stopPropagation()}>
													<DialogHeader onClick={e => e.stopPropagation()}>
														<DialogTitle>{t('want_logout')}</DialogTitle>
													</DialogHeader>
													<DialogFooter>
														<Button
															type='submit'
															onClick={e => {
																e.stopPropagation()
																dispatch(logout())
															}}
														>
															{t('yes')}
														</Button>
													</DialogFooter>
												</DialogContent>
											</Alert>
										</li>
									</ul>
								</nav>
							</div>
						</DialogPanel>
					</div>
				</Dialog>

				{/* Static sidebar for desktop */}
				<div className='hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col'>
					{/* Sidebar component, swap this element with another sidebar if you like */}
					<div className='flex flex-col px-6 pb-4 overflow-y-auto bg-white border-gray-200 grow gap-y-5'>
						<div className='flex items-center h-[55px] w-full mt-[20px] justify-center'>
							<img
								alt='MUSA IT TECHNOLOGIES'
								src={LogoSvg}
								className='h-[55px] w-wull'
							/>
						</div>
						<nav className='flex flex-col flex-1'>
							<ul role='list' className='flex flex-col flex-1 gap-y-7'>
								<li>
									<ul role='list' className='-mx-2 space-y-1'>
										{navigation.map(item => (
											<li key={item.name} className='mb-2'>
												<Link
													to={item.href}
													className={classNames(
														item.href === pathname
															? 'bg-primary text-white'
															: 'text-gray-700 hover:bg-gray-50 ',
														'group flex gap-x-3 py-4 px-[20px] text-sm font-semibold leading-6 rounded-[12px]'
													)}
												>
													<item.icon
														aria-hidden='true'
														className={classNames(
															item.href === pathname
																? 'text-white'
																: 'text-gray-400 group-hover:text-indigo-600',
															'h-6 w-6 shrink-0'
														)}
													/>
													{t(item.name)}
												</Link>
											</li>
										))}
									</ul>
								</li>
								<li className='mt-auto'>
									<Alert>
										<DialogTrigger className='w-full'>
											<button className='flex w-full p-2 -mx-2 text-sm font-semibold leading-6 text-red-500 rounded-md group gap-x-3 hover:bg-gray-50 hover:text-red-600'>
												<LogOut
													aria-hidden='true'
													className='w-6 h-6 text-red-400 shrink-0 group-hover:text-red-600'
												/>
												{t('logout')}
											</button>
										</DialogTrigger>
										<DialogContent onClick={e => e.stopPropagation()}>
											<DialogHeader onClick={e => e.stopPropagation()}>
												<DialogTitle>{t('want_logout')}</DialogTitle>
											</DialogHeader>
											<DialogFooter>
												<Button
													type='submit'
													onClick={e => {
														e.stopPropagation()
														dispatch(logout())
													}}
												>
													{t('yes')}
												</Button>
											</DialogFooter>
										</DialogContent>
									</Alert>
								</li>
							</ul>
						</nav>
					</div>
				</div>

				<div className='lg:pl-72'>
					<div className='sticky top-0 z-40 flex items-center h-16 px-4 bg-white shrink-0 gap-x-4 sm:gap-x-6 sm:px-6 lg:px-8'>
						<button
							type='button'
							onClick={() => setSidebarOpen(true)}
							className='-m-2.5 p-2.5 text-gray-700 lg:hidden'
						>
							<span className='sr-only'>Open sidebar</span>
							<Bars3Icon aria-hidden='true' className='w-6 h-6' />
						</button>

						{/* Separator */}
						<div
							aria-hidden='true'
							className='w-px h-6 bg-gray-200 lg:hidden'
						/>

						<div className='flex self-stretch flex-1 gap-x-4 lg:gap-x-6'>
							<form
								action='#'
								method='GET'
								className='relative flex flex-1 opacity-0 pointer-events-none'
							>
								<label htmlFor='search-field' className='sr-only'>
									Search
								</label>
								<MagnifyingGlassIcon
									aria-hidden='true'
									className='absolute inset-y-0 left-0 w-5 h-full text-gray-400 pointer-events-none'
								/>
								<input
									id='search-field'
									name='search'
									type='search'
									placeholder='Search...'
									className='block w-full h-full py-0 pl-8 pr-0 text-gray-900 border-0 placeholder:text-gray-400 focus:ring-0 sm:text-sm'
								/>
							</form>
							<div className='flex items-center gap-x-4 lg:gap-x-6'>
								{/* Profile dropdown */}
								<Menu as='div' className='relative'>
									<MenuButton className='-m-1.5 flex items-center p-1.5'>
										<span className='sr-only'>Open user menu</span>
										<span
											className={`fi fi-${
												userNavigation.find(item => item.lang === i18n.language)
													?.icon
											}`}
										></span>
										<span className='hidden lg:flex lg:items-center'>
											<span
												aria-hidden='true'
												className='ml-2 text-sm font-semibold leading-6 text-gray-900'
											>
												{userNavigation.find(
													item => item.lang === i18n.language
												)?.name || 'Uz'}
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
														i18n.changeLanguage(item.lang)
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
						</div>
					</div>

					<main style={{ height: 'calc(100vh - 64px)' }} className=' bg-grayBg'>
						<div className='p-[20px] sm:p-[10px] lg:p-[20px]'>
							<Outlet />
						</div>
					</main>
				</div>
			</div>
		</>
	)
}
