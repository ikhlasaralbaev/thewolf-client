import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
	IDirection,
	IGetResponseData,
	IQuestion,
	IStep,
	IStepDetails,
	ITest,
} from '../types'
import {
	createAnswerAction,
	createQuestionAction,
	createStepAction,
	createTestAction,
	deleteQuestionAction,
	getAllDirectionsAction,
	getAllTestsAction,
	getStepDetails,
	getTestStepsAction,
} from './tests.actions'

interface ITestsInitialState {
	tests: ITest[]
	isLoadingTests: boolean
	isCreatingTest: boolean
	directions: IDirection[]
	isLoadingDirections: boolean
	steps: IStep[]
	isLoadingSteps: boolean
	questions: IQuestion[]
	isLoadingQuestions: boolean
	stepDetails: IStepDetails | null
	isCreatingQuestion: boolean
}

const initialState: ITestsInitialState = {
	tests: [],
	isLoadingTests: false,
	isCreatingTest: false,
	directions: [],
	isLoadingDirections: false,
	steps: [],
	isLoadingSteps: false,
	questions: [],
	isLoadingQuestions: false,
	stepDetails: null,
	isCreatingQuestion: false,
}

export const testsSlice = createSlice({
	name: 'tests',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getAllTestsAction.pending, state => {
				state.isLoadingTests = true
			})
			.addCase(
				getAllTestsAction.fulfilled,
				(state, action: PayloadAction<IGetResponseData<ITest>>) => {
					state.tests = action.payload.data
					state.isLoadingTests = false
				}
			)
			.addCase(getAllTestsAction.rejected, state => {
				state.isLoadingTests = false
			})
			.addCase(getTestStepsAction.pending, state => {
				state.isLoadingSteps = true
			})
			.addCase(
				getTestStepsAction.fulfilled,
				(state, action: PayloadAction<IGetResponseData<IStep>>) => {
					state.steps = action.payload.data
					state.isLoadingSteps = false
				}
			)
			.addCase(getTestStepsAction.rejected, state => {
				state.isLoadingSteps = false
			})
			.addCase(getAllDirectionsAction.pending, state => {
				state.isLoadingDirections = true
			})
			.addCase(
				getAllDirectionsAction.fulfilled,
				(state, action: PayloadAction<IGetResponseData<IDirection>>) => {
					state.directions = action.payload.data
					state.isLoadingDirections = false
				}
			)
			.addCase(getAllDirectionsAction.rejected, state => {
				state.isLoadingDirections = true
			})
			.addCase(createTestAction.pending, state => {
				state.isCreatingTest = true
			})
			.addCase(
				createTestAction.fulfilled,
				(state, action: PayloadAction<ITest>) => {
					state.tests = [...state.tests, action.payload]
					state.isCreatingTest = false
				}
			)
			.addCase(createTestAction.rejected, state => {
				state.isCreatingTest = false
			})
			.addCase(createStepAction.pending, state => {
				state.isCreatingTest = true
			})
			.addCase(
				createStepAction.fulfilled,
				(state, action: PayloadAction<IStep>) => {
					state.steps = [...state.steps, action.payload]
					state.isCreatingTest = false
				}
			)
			.addCase(createStepAction.rejected, state => {
				state.isCreatingTest = false
			})
			.addCase(getStepDetails.pending, state => {
				state.isLoadingQuestions = true
			})
			.addCase(
				getStepDetails.fulfilled,
				(state, action: PayloadAction<IStepDetails>) => {
					state.questions = action?.payload?.questions || []
					state.stepDetails = action.payload
					state.isLoadingQuestions = false
				}
			)
			.addCase(getStepDetails.rejected, state => {
				state.isLoadingQuestions = false
			})
			.addCase(createQuestionAction.pending, state => {
				state.isCreatingQuestion = true
			})
			.addCase(createQuestionAction.fulfilled, state => {
				state.isCreatingQuestion = true
			})
			.addCase(createQuestionAction.rejected, state => {
				state.isCreatingQuestion = false
			})
			.addCase(createAnswerAction.pending, state => {
				state.isCreatingQuestion = true
			})
			.addCase(createAnswerAction.fulfilled, state => {
				state.isCreatingQuestion = false
			})
			.addCase(createAnswerAction.rejected, state => {
				state.isCreatingQuestion = false
			})
			.addCase(deleteQuestionAction.pending, state => {
				state.isCreatingQuestion = true
			})
			.addCase(deleteQuestionAction.fulfilled, (state, action) => {
				state.isCreatingQuestion = false
			})
			.addCase(deleteQuestionAction.rejected, state => {
				state.isCreatingQuestion = false
			})
	},
})

export default testsSlice.reducer
