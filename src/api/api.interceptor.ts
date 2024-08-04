import { ACCESS_TOKEN_KEY } from '@/config/constants'
import axios from 'axios'

export const baseURL = 'http://localhost:8000/api'
export const apiURL = 'http://localhost:8000'
export const telegramUrl = 'https://t.me/telegram'
// export const baseURL = 'https://recruiting.thewolfsa.com/api'
// export const apiURL = 'https://recruiting.thewolfsa.com'

// Create an Axios instance
const axiosInstance = axios.create({
	baseURL, // Replace with your API base URL
	timeout: 10000, // Request timeout
})

export const axiosBasic = axios.create({
	baseURL, // Replace with your API base URL
	timeout: 10000, // Request timeout
})

// Request interceptor
axiosInstance.interceptors.request.use(
	config => {
		// Add authorization token to headers if available
		const token = localStorage.getItem(ACCESS_TOKEN_KEY)
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	error => {
		// Handle request error
		return Promise.reject(error)
	}
)

// Response interceptor
axiosInstance.interceptors.response.use(
	response => {
		// Any status code that lie within the range of 2xx cause this function to trigger
		return response
	},
	error => {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// You can handle errors globally here
		if (error.response?.status === 401) {
			// Handle unauthorized error (e.g., redirect to login)
			console.error('Unauthorized access - redirecting to login')
		} else if (error.response?.status === 500) {
			// Handle server error
			console.error('Server error - please try again later')
		}
		return Promise.reject(error)
	}
)

export default axiosInstance
