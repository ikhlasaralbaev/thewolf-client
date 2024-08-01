import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'

interface Props {
	totalCount?: number
	current?: number
	setCurrent?: (page: number) => void
}

export function TablePagination({ totalCount, current, setCurrent }: Props) {
	const itemsCount = () => totalCount!

	const nextPage = () => setCurrent!(current! + 1)
	const prevPage = () => setCurrent!(current! - 1)

	return (
		<div className='sticky bottom-0 flex justify-center w-full pt-1 pb-3 bg-white border-t'>
			<Pagination className='mt-2'>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							disabled={itemsCount() < 1 || current === 1}
							onClick={prevPage}
						/>
					</PaginationItem>

					{Array.from({ length: itemsCount() }).map((_, index) => (
						<PaginationItem>
							<PaginationLink
								isActive={current === index + 1}
								onClick={() => setCurrent!(index + 1)}
							>
								{index + 1}
							</PaginationLink>
						</PaginationItem>
					))}

					<PaginationItem>
						<PaginationNext
							disabled={itemsCount() <= 1 || current === itemsCount()}
							onClick={nextPage}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	)
}
