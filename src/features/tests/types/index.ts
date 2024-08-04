export interface IGetResponseData<Data> {
	data: Data[]
	count: number
	currentPage: number
	totalPages: number
}

export interface ITest {
	id: number
	title: string
	direction: IDirection | null
	language: string
}

export interface IDirection {
	id: number
	title: string
}

export interface ICreateTest {
	title: string
	direction: null
}

export interface ICreateStep {
	title: string
	test: number
	minPercent: number
}

export interface IStep {
	id: number
	title: string
	minPercent: number
	minute: number
	showTestsCount: number
}

export interface IQuestion {
	id: number
	title: string
	file_paths: string[]
	video_url: null
	isMultipleAnswers: boolean
	answers: IAnswer[]
}

export interface IQuestion {
	id: number
	title: string
	file_paths: string[]
	video_url: null
	isMultipleAnswers: boolean
	answers: IAnswer[]
	correctAnswers: number
}

export interface IAnswer {
	id: number
	title: string
	isCorrect: boolean
	file_paths: any[]
	video_url: string
	question: number | string
}

export interface IStepDetails {
	id: number
	title: string
	minPercent: number
	test: Test
	questions: IQuestion[]
}

export interface Test {
	id: number
	title: string
	language: string
}

export interface ICreateQuestion {
	title: string
	file_paths: string[]
	video_url: null
	isMultipleAnswers: boolean
	answers: IAnswer[]
}

export interface IUpdateQuestion extends Partial<ICreateQuestion> {}
