import axiosInstance, { apiURL } from '@/api/api.interceptor'
import { UploadSvg } from '@/assets'
import { Input } from '@/components/ui/input'
import { X } from 'lucide-react'
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
	onRightButtonHandler?: () => void
	setFiles?: (files: string[]) => void
	files?: string[]
	setUrl?: (url: string) => void
	url?: string
	isVideo?: boolean
	defaultFiles?: string[]
	defaultVideoUrl?: string
}

const FileUploader: FC<Props> = ({
	url,
	files,
	setFiles,
	setUrl,
	isVideo,
	defaultFiles,
	defaultVideoUrl,
}) => {
	const [fileUploaderIsOpen, setFileUploaderIsOpen] = useState(false)
	const [fileValues, setFileValues] = useState<FileList | null>(null)
	const [strFiles, setStrFiles] = useState<string[]>(files || [])
	const { t } = useTranslation()

	useEffect(() => {
		if (fileValues?.length) {
			const upload = async () => {
				const formData = new FormData()

				for (var i = 0; i < fileValues.length; i++) {
					formData.append('files', fileValues[i])
				}

				const res = await axiosInstance.post('/file/upload', formData)

				return res.data
			}

			upload().then((res: any[]) => {
				setStrFiles([...strFiles, ...res.map(item => item.url)])
				setFileValues(null)
			})
		}
	}, [fileValues])

	useEffect(() => {
		setFiles?.(strFiles)
	}, [strFiles])

	useEffect(() => {
		if (defaultFiles?.length) {
			setFileUploaderIsOpen(true)
			setStrFiles(defaultFiles as string[])
		}
	}, [defaultFiles])

	useEffect(() => {
		if (defaultVideoUrl) {
			setFileUploaderIsOpen(true)
			setUrl?.(defaultVideoUrl)
		}
	}, [defaultVideoUrl])

	return (
		<div>
			{fileUploaderIsOpen ? (
				<>
					{isVideo && (
						<Input
							onChange={e => setUrl?.(e.target.value)}
							value={url}
							placeholder='Video URL-адрес'
						/>
					)}
					<label>
						<input
							onChange={e => {
								setFileValues(e.target.files)
							}}
							className='hidden'
							type='file'
							multiple
							accept='image/*'
						/>
						<div className='flex flex-col items-center justify-center w-full gap-1 my-2 border border-gray-200 rounded-lg cursor-pointer h-[100px]'>
							<h2 className='text-sm text-primary'>{t('select_files')}</h2>
							<img src={UploadSvg} />
							<span className='text-sm text-gray-500'>
								{t('format')}: PNG, jpeg
							</span>
						</div>
					</label>

					<div className='grid grid-cols-3 gap-2'>
						{strFiles.map(item => (
							<div className='relative'>
								<img
									className='h-[100px] bg-grayBg object-cover w-full'
									src={apiURL + item}
								/>

								<button
									type='button'
									className='absolute top-0 right-0 text-sm text-white bg-red-500'
									onClick={() => setStrFiles(strFiles.filter(x => x !== item))}
								>
									<X />
								</button>
							</div>
						))}
					</div>

					<span
						onClick={() => {
							setUrl?.('')
							setFiles?.([])
							setFileUploaderIsOpen(false)
						}}
						className='text-sm text-blue-500 underline cursor-pointer'
					>
						{t('close')}
					</span>
				</>
			) : (
				<div className='flex items-center gap-2 mb-2'>
					<span
						onClick={() => setFileUploaderIsOpen(true)}
						className='text-sm text-blue-500 underline cursor-pointer'
					>
						{t('add_file')}
					</span>
				</div>
			)}
		</div>
	)
}

export default FileUploader
