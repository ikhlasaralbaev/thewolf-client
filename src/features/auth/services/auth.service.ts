import { login, refresh } from '@/api/api-constants'
import axiosInstance from '@/api/api.interceptor'
import { REFRESH_TOKEN_KEY } from '@/config/constants'
import { ILoginReqType, ILoginResType } from '../types/auth.types'

export const AuthService = {
	async login(data: ILoginReqType): Promise<ILoginResType> {
		const res = await axiosInstance.post(login(), data)
		return res.data
	},
	async refresh(): Promise<ILoginResType> {
		const res = await axiosInstance.post(refresh(), {
			refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY),
		})
		return res.data
	},
}
