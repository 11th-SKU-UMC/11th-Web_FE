import { useState } from "react";

const pages = [1, 2, 3, 4, 5];

export default function Pagination() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="pagination">
      {pages.map((page) => (
        <button
          key={page}
          className={page === currentPage ? "page-button active" : "page-button"}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
}