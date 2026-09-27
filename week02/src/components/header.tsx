export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a className="site-logo" href="/" aria-label="UMCine 홈">
          <span className="logo-icon">
            <img src="/icons/movie.svg" alt="" />
          </span>
          <span>UMCine</span>
        </a>

        <nav className="site-nav" aria-label="주요 메뉴">
          <a className="active" href="#movie-list">
            영화
          </a>
          <a href="#search">검색</a>
          <a href="#profile">내 정보</a>
        </nav>

        <div className="header-actions">
          <button type="button" aria-label="검색">
            <img src="/icons/search.svg" alt="" />
          </button>

          <button type="button">로그인</button>
        </div>
      </div>
    </header>
  );
}
