export default function Pagination() {
  return (
    <nav className="pagination" aria-label="페이지 선택">
      <button className="page-arrow" aria-label="이전 페이지" disabled><img src="/icons/movie-icons/chevron-left.svg" alt="" /></button>
      <button className="page-number current" aria-current="page">1</button>
      <button className="page-number">2</button>
      <button className="page-number">3</button>
      <button className="page-number">4</button>
      <button className="page-number">5</button>
      <button className="page-arrow" aria-label="다음 페이지"><img src="/icons/movie-icons/chevron-right.svg" alt="" /></button>
    </nav>
  );
}
