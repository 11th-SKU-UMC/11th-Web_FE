export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-left">
          <a href="/" className="logo" aria-label="UMCine 홈">
            <img src="/icons/movie.svg" alt="" />
            <span>UMCine</span>
          </a>
          <nav className="nav" aria-label="주요 메뉴">
            <a href="/" className="nav-link active">영화</a>
            <a href="#search" className="nav-link">검색</a>
            <a href="#profile" className="nav-link">내 정보</a>
          </nav>
        </div>
        <div className="header-actions">
          <button id="search" className="search-button" type="button" aria-label="검색">
            <img src="/icons/search.svg" alt="" />
          </button>
          <button className="login-button" type="button">로그인</button>
        </div>
      </div>
    </header>
  );
}
