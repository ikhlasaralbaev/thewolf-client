import { Toaster } from 'react-hot-toast'
import { AppRoutes } from './routes'
import '/node_modules/flag-icons/css/flag-icons.min.css'

const App = () => {
	return (
		<>
			<Toaster />
			<AppRoutes />
		</>
	)
}

export default App
