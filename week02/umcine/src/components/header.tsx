export default function Header() {
  return (
    <header>
      <div className="logo">
        <img src="/icons/movie.svg" alt="UMCine 로고" />
        <span>UMC_MOVIE</span>
      </div>
      <nav className="navigation">
        <span>영화</span>
        <span>검색</span>
        <span>내 정보</span>
      </nav>
      <div className="buttons">
        <button>
          <img src="/icons/search.svg" alt="검색하기" />
        </button>
        <button>로그인</button>
      </div>
    </header>
  );
}