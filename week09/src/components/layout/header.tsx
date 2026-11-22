"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getMe } from "../../api/members/me";
import { useAuthStore } from "../../stores/auth-store";

export function Header() {
  const accessToken = useAuthStore((state) => state.accessToken);

  const meQuery = useQuery({
    queryKey: ["members", "me"],
    queryFn: getMe,
    enabled: Boolean(accessToken),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  return (
    <header className="flex items-center justify-between p-4 bg-zinc-900 text-white">
      <div className="flex gap-4">
        <Link href="/" className="hover:text-red-500 font-bold">
          영화
        </Link>
        <Link
          href="/search?query="
          className="hover:text-red-500 font-bold"
        >
          검색
        </Link>
      </div>

      <div>
        {!accessToken ? (
          <Link href="/login" className="hover:text-red-500 font-bold">
            로그인
          </Link>
        ) : meQuery.isLoading ? (
          <span className="inline-block h-6 w-20 animate-pulse rounded bg-zinc-700" />
        ) : (
          <Link href="/mypage" className="hover:text-red-500 font-bold">
            마이페이지
          </Link>
        )}
      </div>
    </header>
  );
}
