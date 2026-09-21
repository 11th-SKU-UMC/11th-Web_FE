import { Icon } from "./Icon";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const isFirst = page === 1;
  const isLast = page === totalPages;

  return (
    <nav aria-label="영화 목록 페이지" className="flex w-full justify-center">
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="이전 페이지"
          disabled={isFirst}
          onClick={() => onChange(page - 1)}
        >
          <Icon
            name="chevron-left"
            className={`size-6 ${isFirst ? "text-action-disabled" : "text-secondary"}`}
          />
        </button>

        <div className="flex items-center gap-1">
          {pages.map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              aria-current={pageNumber === page ? "page" : undefined}
              onClick={() => onChange(pageNumber)}
              className={`size-9 rounded-[7px] text-center text-[13px] font-bold ${
                pageNumber === page
                  ? "bg-primary text-surface"
                  : "text-secondary"
              }`}
            >
              {pageNumber}
            </button>
          ))}
        </div>

        <button
          type="button"
          aria-label="다음 페이지"
          disabled={isLast}
          onClick={() => onChange(page + 1)}
        >
          <Icon
            name="chevron-right"
            className={`size-6 ${isLast ? "text-action-disabled" : "text-secondary"}`}
          />
        </button>
      </div>
    </nav>
  );
}
