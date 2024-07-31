import axiosInstance from '@/api/api.interceptor'
import { IGetResponseData } from '@/features/tests/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IResult } from '../types'

export const getAllResults = createAsyncThunk<
	IGetResponseData<IResult>,
	{
		language?: string
		area?: string
		test?: string | number
		isPassed?: string
	}
>('results/get', async ({ language, area, test, isPassed }, thunkAPI) => {
	try {
		const res = await axiosInstance.get(
			`/result?language=${language || ''}&area=${area || ''}&test=${
				test || ''
			}&isPassed=${isPassed || ''}`
		)

		return res.data
	} catch (error) {
		return thunkAPI.rejectWithValue(error)
	}
})
