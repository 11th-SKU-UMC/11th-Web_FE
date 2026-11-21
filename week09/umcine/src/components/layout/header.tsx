
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../api/members/me";
import { useAuthStore } from "../../stores/auth-store";

export function Header() {
  const pathname = usePathname() ?? "/";

  const accessToken = useAuthStore((state) => state.accessToken);

  const meQuery = useQuery({
    queryKey: ["members", "me"],
    queryFn: getMe,
    enabled: Boolean(accessToken),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const isMovieActive =
    pathname === "/" || pathname.startsWith("/movies/");

  const isSearchActive = pathname === "/search";

  const isMyPageActive =
    pathname === "/my" || pathname.startsWith("/my/");

  const activeClass =
    "font-semibold after:absolute after:right-0 after:bottom-4 after:left-0 after:h-0.5 after:bg-[#111111]";

  return (
    <header className="flex h-16 items-center justify-between border-b border-[#e5e7eb] bg-white px-4 md:px-[30px] lg:px-20">
      <div className="flex items-center gap-4 md:gap-6 lg:gap-10">
        <div className="flex items-center gap-[6px] whitespace-nowrap text-lg font-bold">
          <div className="flex h-6 w-6 items-center justify-center rounded-[5px] border-2 border-black">
            <img
              className="h-4 w-4"
              src="/icons/movie.svg"
              alt=""
            />
          </div>
          <span>UMCine</span>
        </div>

        <nav className="flex items-center gap-3 text-sm md:gap-[18px] lg:gap-7">
          <Link
            href="/"
            className={`relative whitespace-nowrap py-[22px] pb-5 text-[#111111] no-underline ${
              isMovieActive ? activeClass : ""
            }`}
          >
            영화
          </Link>

          <Link
            href="/search"
            className={`relative whitespace-nowrap py-[22px] pb-5 text-[#111111] no-underline ${
              isSearchActive ? activeClass : ""
            }`}
          >
            검색
          </Link>

          <Link
            href="/my"
            className={`relative whitespace-nowrap py-[22px] pb-5 text-[#111111] no-underline ${
              isMyPageActive ? activeClass : ""
            }`}
          >
            내 정보
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-[6px] md:gap-3">
        <Link
          href="/search"
          className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-[6px] border border-[#e5e7eb] bg-white p-2"
          aria-label="검색"
        >
          <img
            className="h-full w-full"
            src="/icons/search.svg"
            alt=""
          />
        </Link>

        {!accessToken ? (
          <Link
            href="/login"
            className="flex h-9 shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-[6px] bg-[#2563eb] px-4 text-white hover:bg-[#1d4ed8]"
          >
            로그인
          </Link>
        ) : meQuery.isLoading ? (
          <span className="h-9 w-24 animate-pulse rounded-[6px] bg-gray-200" />
        ) : (
          <Link
            href="/my"
            className="flex h-9 shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-[6px] bg-[#2563eb] px-4 text-white hover:bg-[#1d4ed8]"
          >
            마이페이지
          </Link>
        )}
      </div>
    </header>
  );
}
