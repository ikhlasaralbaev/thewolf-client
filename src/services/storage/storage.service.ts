import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/config/constants'

export const storage = {
	saveToken: (access: string, refresh: string) => {
		localStorage.setItem(ACCESS_TOKEN_KEY, access)
		localStorage.setItem(REFRESH_TOKEN_KEY, refresh)
	},
	clearToken: () => {
		localStorage.removeItem(ACCESS_TOKEN_KEY)
		localStorage.removeItem(REFRESH_TOKEN_KEY)
		localStorage.removeItem('musait_full_name')
		localStorage.removeItem('musait_role')
	},
	saveUser: (full_name: string, role: string) => {
		localStorage.setItem('musait_full_name', full_name)
		localStorage.setItem('musait_role', role)
	},
}
