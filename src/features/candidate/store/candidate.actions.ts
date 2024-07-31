import { axiosBasic } from '@/api/api.interceptor'
import { createAsyncThunk } from '@reduxjs/toolkit'
import {
	ICandidateCreateResponse,
	ICompleteStepRequest,
	ICompleteStepResponse,
	ICreateResult,
	IResult,
} from '../types'

export const createCandidate = createAsyncThunk<
	ICandidateCreateResponse,
	{ data: any }
>('candidate/craete', async ({ data }, thunkAPI) => {
	try {
		const res = await axiosBasic.post('/candidate', data)

		return res.data
	} catch (error) {
		return thunkAPI.rejectWithValue(error)
	}
})

export const completeStepAction = createAsyncThunk<
	ICompleteStepResponse,
	ICompleteStepRequest
>('candidate/complete-step', async (data, thunkAPI) => {
	try {
		const res = await axiosBasic.post(`/step/complete`, data)

		return res.data
	} catch (error) {
		return thunkAPI.rejectWithValue(error)
	}
})

export const createResult = createAsyncThunk<IResult, ICreateResult>(
	'candidate/create-result',
	async (data, thunkAPI) => {
		try {
			const res = await axiosBasic.post(`/result`, data)

			return res.data
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)
