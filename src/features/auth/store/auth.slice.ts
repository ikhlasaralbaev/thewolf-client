import { storage } from '@/services/storage/storage.service'
import { createSlice } from '@reduxjs/toolkit'
import { IUser } from '../types/auth.types'
import { loginAction, refreshTokenAction } from './auth.actions'

export interface IAuthInitialState {
	accessToken: string | null
	refreshToken: string | null
	isAuthLoading: boolean
	role: string
	user: IUser | null
}

const initialState: IAuthInitialState = {
	accessToken: null,
	refreshToken: null,
	isAuthLoading: false,
	role: 'client',
	user: null,
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: state => {
			storage.clearToken()
			state.accessToken = null
			state.refreshToken = null
			state.role = ''
			state.user = null
		},
	},
	extraReducers(builder) {
		builder
			.addCase(loginAction.pending, state => {
				state.isAuthLoading = true
			})
			.addCase(loginAction.fulfilled, (state, action) => {
				state.isAuthLoading = false
				storage.saveToken(
					action.payload.accessToken,
					action.payload.refreshToken
				)
				state.accessToken = action.payload.accessToken
				state.refreshToken = action.payload.refreshToken
				state.user = action.payload.user
			})
			.addCase(loginAction.rejected, state => {
				state.isAuthLoading = false
			})
			.addCase(refreshTokenAction.pending, state => {
				state.isAuthLoading = true
			})
			.addCase(refreshTokenAction.fulfilled, (state, action) => {
				state.isAuthLoading = false
				state.accessToken = action.payload.accessToken
				state.refreshToken = action.payload.refreshToken
				state.user = action.payload.user
			})
			.addCase(refreshTokenAction.rejected, state => {
				state.isAuthLoading = false
			})
	},
})

export const { logout } = authSlice.actions
export default authSlice.reducer
