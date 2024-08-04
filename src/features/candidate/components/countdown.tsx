import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
	initialMinutes: number
	onComplete: (isTimeout: boolean) => void
}

const CountdownTimer = ({ initialMinutes, onComplete }: Props) => {
	const history = useNavigate()
	const [time, setTime] = useState(initialMinutes * 60)

	useEffect(() => {
		const timer = setInterval(() => {
			setTime(prevTime => {
				if (prevTime <= 1) {
					clearInterval(timer)
					onComplete(true)
					return 0
				}
				return prevTime - 1
			})
		}, 1000) // Decrement every second

		return () => clearInterval(timer) // Cleanup on component unmount
	}, [history])

	// Calculate hours, minutes, and seconds from remaining time
	const hours = Math.floor(time / 3600)
	const minutes = Math.floor((time % 3600) / 60)
	const seconds = time % 60

	// Format time to HH:MM:SS
	const formatTime = (num: number) => num.toString().padStart(2, '0')

	return (
		<h1 className='mt-2 text-xl'>
			{formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
		</h1>
	)
}

export default CountdownTimer
