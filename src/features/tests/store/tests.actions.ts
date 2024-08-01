import {
	createAnswerUrl,
	createQuestionUrl,
	createStepUrl,
	createTestUrl,
	deleteAnswerUrl,
	deleteQuestionUrl,
	deleteStepUrl,
	deleteTestUrl,
	getAllTests,
	getDirectionsUrl,
	getStepDetailsUrl,
	getStepQuestionsUrl,
	getTestSteps,
	updateAnswerUrl,
	updateQuestionUrl,
	updateStepUrl,
} from '@/api/api-constants'
import axiosInstance from '@/api/api.interceptor'
import { createAsyncThunk } from '@reduxjs/toolkit'
import {
	IAnswer,
	ICreateQuestion,
	ICreateStep,
	ICreateTest,
	IDirection,
	IGetResponseData,
	IQuestion,
	IStep,
	IStepDetails,
	ITest,
	IUpdateQuestion,
} from '../types'

export const getAllTestsAction = createAsyncThunk<
	IGetResponseData<ITest>,
	{ lang?: string }
>('tests/all', async ({ lang }, thunkAPI) => {
	try {
		const res = await axiosInstance.get(getAllTests(lang))

		return res.data
	} catch (error) {
		return thunkAPI.rejectWithValue(error)
	}
})

export const createTestAction = createAsyncThunk<ITest, ICreateTest>(
	'tests/create',
	async (data, thunkAPI) => {
		try {
			const res = await axiosInstance.post(createTestUrl(), data)

			return res.data
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)

export const createStepAction = createAsyncThunk<IStep, ICreateStep>(
	'tests/step-create',
	async (data, thunkAPI) => {
		try {
			const res = await axiosInstance.post(createStepUrl(), data)

			return res.data
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)

export const updateStepAction = createAsyncThunk<
	IStep,
	{ data: Partial<ICreateStep>; id: string | number }
>('tests/step-update', async (data, thunkAPI) => {
	try {
		const res = await axiosInstance.patch(updateStepUrl(data.id), data.data)

		return res.data
	} catch (error) {
		return thunkAPI.rejectWithValue(error)
	}
})

export const getAllDirectionsAction = createAsyncThunk<
	IGetResponseData<IDirection>
>('tests/get-directions', async (_, thunkAPI) => {
	try {
		const res = await axiosInstance.get(getDirectionsUrl())

		return res.data
	} catch (error) {
		return thunkAPI.rejectWithValue(error)
	}
})

export const getTestStepsAction = createAsyncThunk<
	IGetResponseData<IStep>,
	{ test_id: string | number }
>('tests/get-steps', async ({ test_id }, thunkAPI) => {
	try {
		const res = await axiosInstance.get(getTestSteps(test_id))

		return res.data
	} catch (error) {
		return thunkAPI.rejectWithValue(error)
	}
})

export const getStepQuestions = createAsyncThunk<
	IGetResponseData<IQuestion>,
	{ step_id: string | number }
>('tests/get-questions', async ({ step_id }, thunkAPI) => {
	try {
		const res = await axiosInstance.get(getStepQuestionsUrl(step_id))

		return res.data
	} catch (error) {
		return thunkAPI.rejectWithValue(error)
	}
})

export const getStepDetails = createAsyncThunk<
	IStepDetails,
	{ step_id: string | number }
>('tests/get-questions', async ({ step_id }, thunkAPI) => {
	try {
		const res = await axiosInstance.get(getStepDetailsUrl(step_id))

		return res.data
	} catch (error) {
		return thunkAPI.rejectWithValue(error)
	}
})

export const createQuestionAction = createAsyncThunk<
	IQuestion,
	ICreateQuestion
>('tests/create-question', async (data, thunkAPI) => {
	try {
		const res = await axiosInstance.post(createQuestionUrl(), data)

		return res.data
	} catch (error) {
		return thunkAPI.rejectWithValue(error)
	}
})

export const updateQuestionAction = createAsyncThunk<
	IQuestion,
	{ data: IUpdateQuestion; id: string | number }
>('tests/update-question', async (data, thunkAPI) => {
	try {
		const res = await axiosInstance.patch(updateQuestionUrl(data.id), data.data)

		return res.data
	} catch (error) {
		return thunkAPI.rejectWithValue(error)
	}
})

export const createAnswerAction = createAsyncThunk<IAnswer, IAnswer>(
	'tests/create-answer',
	async (data, thunkAPI) => {
		try {
			const res = await axiosInstance.post(createAnswerUrl(), data)

			return res.data
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)

export const updateAnswerAction = createAsyncThunk<
	IAnswer,
	{ data: Partial<IAnswer>; id: number | string }
>('tests/update-answer', async (data, thunkAPI) => {
	try {
		const res = await axiosInstance.patch(updateAnswerUrl(data.id), data.data)

		return res.data
	} catch (error) {
		return thunkAPI.rejectWithValue(error)
	}
})

export const deleteQuestionAction = createAsyncThunk(
	'tests/delete-question',
	async ({ question_id }: { question_id: number | string }, thunkAPI) => {
		try {
			const res = await axiosInstance.delete(deleteQuestionUrl(question_id))

			return res.data
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)

export const deleteStepAction = createAsyncThunk(
	'tests/delete-step',
	async ({ step_id }: { step_id: number | string }, thunkAPI) => {
		try {
			const res = await axiosInstance.delete(deleteStepUrl(step_id))

			return res.data
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)

export const deleteTestAction = createAsyncThunk(
	'tests/delete-test',
	async ({ test_id }: { test_id: number | string }, thunkAPI) => {
		try {
			const res = await axiosInstance.delete(deleteTestUrl(test_id))

			return res.data
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)

export const deleteAnswerAction = createAsyncThunk(
	'tests/delete-answer',
	async ({ answer_id }: { answer_id: number | string }, thunkAPI) => {
		try {
			const res = await axiosInstance.delete(deleteAnswerUrl(answer_id))

			return res.data
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)
