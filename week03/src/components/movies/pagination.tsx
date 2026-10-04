interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  return (
    <nav className="mt-8 flex items-center justify-center gap-2" aria-label="페이지네이션">
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
        <button
          key={pageNumber}
          type="button"
          onClick={() => onPageChange(pageNumber)}
          className={`h-9 min-w-9 rounded-lg px-3 text-sm font-medium ${
            pageNumber === page ? "bg-gray-950 text-white" : "bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-50"
          }`}
          aria-current={pageNumber === page ? "page" : undefined}
        >
          {pageNumber}
        </button>
      ))}
    </nav>
  );
}
