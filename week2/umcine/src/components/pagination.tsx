import { useState } from "react";

export default function Pagination() {
  const [currentPage, setCurrentPage] = useState(1);

  const pages = [1, 2, 3, 4, 5];

  return (
    <div className="pagination">
      <button
        className="page-arrow"
        onClick={() =>
          setCurrentPage((currentPage) =>
            Math.max(1, currentPage - 1),
          )
        }
      >
        ‹
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={`page-number ${
            currentPage === page ? "active" : ""
          }`}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}

      <button
        className="page-arrow"
        onClick={() =>
          setCurrentPage((currentPage) =>
            Math.min(5, currentPage + 1),
          )
        }
      >
        ›
      </button>
    </div>
  );
}