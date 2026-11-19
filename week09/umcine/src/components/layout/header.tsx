"use client";

import Link from 'next/link';
import { useMeQuery } from '../../hooks/use-me-query';
import { useAuthStore } from '../../stores/auth-store';

export function Header() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const meQuery = useMeQuery();
  return (
    <header className="site-header">
      <Link href="/">영화</Link>
      <Link href="/search">검색</Link>
      <Link href="/signup">회원가입</Link>
      {!accessToken ? <Link href="/login">로그인</Link> : meQuery.isLoading ? (
        <span role="status" className="h-10 w-24 animate-pulse rounded-lg bg-gray-200" aria-label="내 정보 불러오는 중" />
      ) : <Link href="/mypage">마이페이지</Link>}
    </header>
  );
}
