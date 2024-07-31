import { useAppSelector } from '@/hooks/store-hooks'
import { IAuthInitialState } from '../store/auth.slice'

const useAuth = (): IAuthInitialState => {
	const user = useAppSelector(state => state.auth)

	return user
}

export default useAuth
