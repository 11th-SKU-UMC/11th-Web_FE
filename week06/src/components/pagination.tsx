import { useSearchParams } from "react-router-dom";
export function Pagination({ page, totalPages }: { page: number; totalPages: number }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const max = Math.min(totalPages, 500); // TMDB의 페이지 접근 한계
  if (max <= 1) return null;
  function go(nextPage: number) {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(nextPage));
    setSearchParams(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return <nav className="pagination" aria-label="페이지 이동">
    <button disabled={page <= 1} onClick={() => go(page - 1)}>이전</button>
    <span>{page} / {max}</span>
    <button disabled={page >= max} onClick={() => go(page + 1)}>다음</button>
  </nav>;
}
