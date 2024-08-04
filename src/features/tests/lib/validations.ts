import * as yup from 'yup'

export const createTestValidator = yup.object({
	title: yup.string().required(),
	language: yup.string().required(),
})

export const createStepValidator = yup.object({
	title: yup.string().required(),
	minPercent: yup.number().required().max(100, 'max_value_100'),
	minute: yup.number().required(),
	showTestsCount: yup.number().required(),
})

export const createQuestionValidator = yup.object({
	title: yup.string().required(),
	isMultipleAnswers: yup.boolean(),
	video_url: yup.string(),
	file_paths: yup.array(yup.string()),
	answers: yup
		.array()
		.of(
			yup.object().shape({
				title: yup.string().required('Title is required'),
				isCorrect: yup.boolean(),
				video_url: yup.string(),
				file_paths: yup.array(yup.string()),
			})
		)
		.test(
			'at-least-one-true',
			'At least one answer must be correct',
			(answers: any) => answers.some((answer: any) => answer.isCorrect)
		)
		.min(2),
})

export const addAnswerValidator = yup.object({
	answers: yup
		.array(
			yup.object({
				title: yup.string().required(),
				video_url: yup.string().optional(),
				file_paths: yup.array(yup.string()).optional(),
				isCorrect: yup.boolean().optional(),
			})
		)
		.min(1),
})

export const updateQuestionValidator = yup.object({
	title: yup.string().required().optional(),
	isMultipleAnswers: yup.boolean().optional(),
	video_url: yup.string().optional(),
	file_paths: yup.array(yup.string()).optional(),
	answers: yup
		.array(
			yup.object({
				title: yup.string().required().optional(),
				video_url: yup.string().optional(),
				file_paths: yup.array(yup.string()).optional(),
				isCorrect: yup.boolean().optional(),
			})
		)
		.min(1)
		.optional(),
})

export const updateStepValidator = yup.object({
	title_uz: yup.string(),
	title_ru: yup.string(),
	title_en: yup.string(),
	test: yup.number(),
	minPercent: yup.number(),
})

export const updateTestValidator = yup.object({
	title_uz: yup.string().optional(),
	title_ru: yup.string().optional(),
	title_en: yup.string().optional(),
	direction: yup.number().optional(),
})
