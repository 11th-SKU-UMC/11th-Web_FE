import { useState } from "react";
import { cn } from "../../utils/cn";

const pages = [1, 2, 3, 4, 5];

export default function Pagination() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="mt-10 flex justify-center gap-2">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={cn(
            "h-9 w-9 cursor-pointer rounded-lg border text-[0.9rem]",
            page === currentPage
              ? "border-[#3461ff] bg-[#3461ff] font-bold text-white"
              : "border-[#ddd] bg-white text-[#333]",
          )}
        >
          {page}
        </button>
      ))}
    </div>
  );
}