import axiosInstance from '@/api/api.interceptor'
import { IGetResponseData } from '@/features/tests/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IEmployee } from '../types'

export const getAllEmployees = createAsyncThunk<IGetResponseData<IEmployee>>(
	'employees/all',
	async (_, thunkAPI) => {
		try {
			const res = await axiosInstance.get('/employee')
			return res.data
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)

export const createEmployee = createAsyncThunk<
	IEmployee,
	{ email: string; password: string }
>('employees/all', async (data, thunkAPI) => {
	try {
		const res = await axiosInstance.post('/employee', data)
		return res.data
	} catch (error) {
		return thunkAPI.rejectWithValue(error)
	}
})

export const updateEmployee = createAsyncThunk<
	IEmployee,
	{ email: string; password: string; id: string | number }
>('employees/all', async (data, thunkAPI) => {
	try {
		const res = await axiosInstance.patch(`/employee/${data.id}`, data)
		return res.data
	} catch (error) {
		return thunkAPI.rejectWithValue(error)
	}
})

export const deleteEmployee = createAsyncThunk<IEmployee, { id: string }>(
	'employees/delete',
	async (data, thunkAPI) => {
		try {
			const res = await axiosInstance.delete(`/employee/${data.id}`)
			return res.data
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)
