const pageButton = "grid size-[30px] place-items-center rounded-[5px] text-xs text-[#777f89] transition hover:bg-[#e9edf4] focus-visible:outline-2 focus-visible:outline-blue-600 disabled:cursor-default disabled:opacity-35";

export default function Pagination() {
  return (
    <nav className="flex items-center justify-center gap-1 py-7 pb-[42px]" aria-label="페이지 선택">
      <button className={pageButton} aria-label="이전 페이지" disabled type="button"><img className="size-4" src="/icons/movie-icons/chevron-left.svg" alt="" /></button>
      <button className={pageButton + " bg-[#316fe8] font-semibold text-white hover:bg-blue-700"} aria-current="page" type="button">1</button>
      {[2, 3, 4, 5].map((page) => <button className={pageButton} key={page} type="button">{page}</button>)}
      <button className={pageButton} aria-label="다음 페이지" type="button"><img className="size-4" src="/icons/movie-icons/chevron-right.svg" alt="" /></button>
    </nav>
  );
}
