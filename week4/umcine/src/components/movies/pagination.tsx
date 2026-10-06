import { useState } from "react";
import { cn } from "../../utils/cn";

export default function Pagination() {
  const [currentPage, setCurrentPage] = useState(1);

  const pages = [1, 2, 3, 4, 5];

  return (
    <div className="mt-7 flex items-center justify-center gap-2">
      <button
        className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-[5px] border-0 bg-transparent"
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
          className={cn(
            "h-7 w-7 cursor-pointer rounded-[5px] border-0 bg-transparent",
            currentPage === page && "bg-[#111827] text-white",
          )}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}

      <button
        className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-[5px] border-0 bg-transparent"
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