import { cn } from '../../utils/cn'

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)
  const buttonClassName =
    'grid size-9 cursor-pointer place-items-center rounded-lg border border-[#2a2d33] bg-[#111318] p-1.5 text-sm font-semibold text-[#969da8] transition-colors hover:border-[#4f83ff] hover:text-white disabled:cursor-not-allowed disabled:opacity-40'

  return (
    <nav
      className="mt-8 flex flex-wrap justify-center gap-2"
      aria-label="영화 목록 페이지"
    >
      <button
        className={buttonClassName}
        type="button"
        aria-label="이전 페이지"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <img
          className="block invert"
          src="/icons/movie-icons/chevron-left.svg"
          alt=""
        />
      </button>

      {pages.map((page) => (
        <button
          className={cn(
            buttonClassName,
            page === currentPage &&
              'border-blue-600 bg-blue-600 text-white hover:border-blue-600',
          )}
          type="button"
          key={page}
          aria-label={`${page}페이지`}
          aria-current={page === currentPage ? 'page' : undefined}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className={buttonClassName}
        type="button"
        aria-label="다음 페이지"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <img
          className="block invert"
          src="/icons/movie-icons/chevron-right.svg"
          alt=""
        />
      </button>
    </nav>
  )
}
