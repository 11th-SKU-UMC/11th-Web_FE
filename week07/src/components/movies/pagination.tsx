interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  // 첫 페이지, 현재 페이지 주변, 마지막 페이지만 표시
  const pages = Array.from(
    new Set(
      [
        1,
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
        totalPages,
      ].filter((page) => page >= 1 && page <= totalPages),
    ),
  ).sort((a, b) => a - b);

  return (
    <div
      className="pagination"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        flexWrap: "wrap",
      }}
    >
      <button
        type="button"
        className="page-button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        이전
      </button>

      {pages.map((page, index) => {
        const previousPage = pages[index - 1];

        return (
          <span
            key={page}
            style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
          >
            {previousPage !== undefined && page - previousPage > 1 && (
              <span>…</span>
            )}

            <button
              type="button"
              className={`page-button ${currentPage === page ? "active" : ""}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </span>
        );
      })}

      <button
        type="button"
        className="page-button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        다음
      </button>
    </div>
  );
}