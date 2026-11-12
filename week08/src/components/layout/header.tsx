import { Link } from '@tanstack/react-router';
import { useMeQuery } from '../../hooks/use-me-query';
import { useAuthStore } from '../../stores/auth-store';

export function Header() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const meQuery = useMeQuery();
  return (
    <header className="site-header">
      <Link to="/">영화</Link>
      <Link to="/search">검색</Link>
      <Link to="/signup">회원가입</Link>
      {!accessToken ? <Link to="/login">로그인</Link> : meQuery.isLoading ? (
        <span role="status" className="h-10 w-24 animate-pulse rounded-lg bg-gray-200" aria-label="내 정보 불러오는 중" />
      ) : <Link to="/mypage">마이페이지</Link>}
    </header>
  );
}
