import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Link, Route, Routes, useNavigate, useSearchParams } from "react-router-dom";
import { MovieListPage } from "./pages/movie-list-page";
import { SearchPage } from "./pages/search-page";
import { MovieDetailPage } from "./pages/movie-detail-page";
import "./styles.css";

// [필수] 순수 fetch 실습 시 아래 import의 주석을 해제하고 Network 패널을 확인하세요.
// import "./examples/fetch-movies";
function Header() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [value, setValue] = useState(params.get("query") ?? "");
  return <header className="site-header"><div className="header-content">
    <Link className="logo" to="/">UM<span>Cine</span></Link>
    <nav><Link to="/">인기 영화</Link><Link to="/search">검색</Link></nav>
    <form className="search-form" onSubmit={event => { event.preventDefault(); navigate(`/search?query=${encodeURIComponent(value.trim())}&page=1`); }}>
      <input aria-label="영화 제목 검색" placeholder="영화 제목 검색" value={value} onChange={event => setValue(event.target.value)}/>
      <button type="submit">검색</button>
    </form>
  </div></header>;
}
function App() { return <BrowserRouter><Header/><main><Routes>
  <Route path="/" element={<MovieListPage/>}/>
  <Route path="/search" element={<SearchPage/>}/>
  <Route path="/movies/:movieId" element={<MovieDetailPage/>}/>
  <Route path="*" element={<div className="page"><h1>페이지를 찾을 수 없어요.</h1><Link to="/">홈으로</Link></div>}/>
</Routes></main><footer className="footer"><p>UMCine · 영화 데이터 제공: <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">TMDB</a></p><p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p></footer></BrowserRouter>; }
ReactDOM.createRoot(document.getElementById("root")!).render(<React.StrictMode><App/></React.StrictMode>);
