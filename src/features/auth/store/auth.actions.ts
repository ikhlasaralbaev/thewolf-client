import { createAsyncThunk } from '@reduxjs/toolkit'
import { AuthService } from '../services/auth.service'
import { ILoginReqType, ILoginResType } from '../types/auth.types'

export const loginAction = createAsyncThunk<ILoginResType, ILoginReqType>(
	'auth/login',
	async (data, thunkAPI) => {
		try {
			const res = await AuthService.login(data)
			return res
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)

export const refreshTokenAction = createAsyncThunk<ILoginResType>(
	'auth/refresh',
	async (_, thunkAPI) => {
		try {
			const res = await AuthService.refresh()
			return res
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)
