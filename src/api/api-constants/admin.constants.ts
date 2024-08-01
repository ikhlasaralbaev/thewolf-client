export const login = () => `/auth/login`
export const refresh = () => `/auth/refresh`

// test
export const getAllTests = (lang: string = '') => `/test?lang=${lang}`
export const createTestUrl = () => `/test`

// direction
export const getDirectionsUrl = () => `/direction`

// test steps
export const getTestSteps = (test_id: string | number) =>
	`/step?test=${test_id}`
export const createStepUrl = () => `/step`
export const updateStepUrl = (step: string | number) => `/step/${step}`

// step questions
export const getStepQuestionsUrl = (step_id: number | string) =>
	`/question?step=${step_id}`

// step details
export const getStepDetailsUrl = (step_id: number | string) =>
	`/step/${step_id}`

// create
export const createQuestionUrl = () => `/question`
export const updateQuestionUrl = (id: string | number) => `/question/${id}`

export const createAnswerUrl = () => `/answer`
export const updateAnswerUrl = (id: string | number) => `/answer/${id}`

export const deleteQuestionUrl = (question: number | string) =>
	`/question/${question}`

export const deleteStepUrl = (question: number | string) => `/step/${question}`
export const deleteTestUrl = (test: number | string) => `/test/${test}`
export const deleteAnswerUrl = (answer: number | string) => `/answer/${answer}`
