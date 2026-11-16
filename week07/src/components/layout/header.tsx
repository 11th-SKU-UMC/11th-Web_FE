import { Link } from "@tanstack/react-router";

export function Header() {
  return (
    <header className="site-header">
      <Link to="/">영화</Link>
      <Link to="/search">검색</Link>
      <Link to="/signup">회원가입</Link>
      <Link to="/login">로그인</Link>
      <Link to="/mypage">내 정보</Link>
    </header>
  );
}