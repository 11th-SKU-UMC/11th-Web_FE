export default function Pagination() {
  return (
    <nav className="pagination" aria-label="영화 목록 페이지">
      {[1, 2, 3, 4, 5].map((page) => <button key={page} type="button">{page}</button>)}
    </nav>
  );
}
