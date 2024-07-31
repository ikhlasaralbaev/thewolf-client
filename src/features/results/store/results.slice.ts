import { IGetResponseData } from '@/features/tests/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IResult } from '../types'
import { getAllResults } from './results.action'

interface IInitialState {
	results: IResult[]
	isLoadingResults: boolean
	isPassed?: string
	test?: string
	language?: string
	area?: string
}

const initialState: IInitialState = {
	results: [],
	isLoadingResults: false,
	language: '',
	isPassed: '',
	test: '',
	area: '',
}

export const resultSlice = createSlice({
	name: 'results',
	initialState,
	reducers: {
		setResultFilter: (
			state,
			{
				payload,
			}: PayloadAction<{
				language?: string
				isPassed?: string
				test?: string
				area?: string
			}>
		) => {
			state.area = payload.area === 'all' ? '' : payload.area
			state.language = payload.language === 'all' ? '' : payload.language
			state.isPassed = payload.isPassed === 'all' ? '' : payload.isPassed
			state.test = payload.test === 'all' ? '' : payload.test
		},
	},
	extraReducers: builder => {
		builder
			.addCase(getAllResults.pending, state => {
				state.isLoadingResults = true
			})
			.addCase(
				getAllResults.fulfilled,
				(state, action: PayloadAction<IGetResponseData<IResult>>) => {
					state.isLoadingResults = false
					state.results = action.payload.data
				}
			)
			.addCase(getAllResults.rejected, state => {
				state.results = []
				state.isLoadingResults = false
			})
	},
})

export const { setResultFilter } = resultSlice.actions
