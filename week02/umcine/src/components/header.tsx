export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#home" aria-label="UMCine 홈">
          <span className="brand-mark" aria-hidden="true">▣</span><strong>UMCine</strong>
        </a>
        <nav className="primary-nav" aria-label="주 메뉴">
          <a className="active" href="#movies">영화</a>
          <a href="#search">검색</a>
          <a href="#profile">내 정보</a>
        </nav>
        <div className="header-actions">
          <button className="search-button" aria-label="검색"><img src="/icons/movie-icons/search.svg" alt="" /></button>
          <button className="login-button">로그인</button>
        </div>
      </div>
    </header>
  );
}
