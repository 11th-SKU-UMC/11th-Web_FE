import { Link, useLocation } from "@tanstack/react-router";
import { cn } from "../../utils/cn";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../api/members/me";
import { useAuthStore } from "../../stores/auth-store";

const navItem = "text-[0.8rem] text-[#333]";
const navActive = "font-bold text-black underline decoration-2 underline-offset-8";

export function Header() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const meQuery = useQuery({
    queryKey: ["members", "me"],
    queryFn: getMe,
    enabled: Boolean(accessToken),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
  const { pathname } = useLocation();
  const isMovies = pathname === "/" || pathname.startsWith("/movies");
  const isSearch = pathname.startsWith("/search");

  return (
    <header className="border-b border-[#e5e7eb] bg-white">
      <div className="mx-auto flex h-14 max-w-[1120px] items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4 sm:gap-8">
          <Link
            to="/"
            aria-label="UMCine 홈"
            className="flex items-center gap-2 text-[1.05rem] font-extrabold"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-md border-2 border-black">
              <img src="/icons/movie.svg" alt="" className="h-3.5 w-3.5" />
            </span>
            <span className="hidden sm:inline">UMCine</span>
          </Link>

          <nav className="flex items-center gap-3 sm:gap-6">
            <Link to="/" className={cn(navItem, isMovies && navActive)}>
              영화
            </Link>
            <Link to="/search" className={cn(navItem, isSearch && navActive)}>
              검색
            </Link>
            <Link to="/me"className={navItem}>
              내 정보
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/search"
            aria-label="검색"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-[#e5e7eb] bg-white"
          >
            <img src="/icons/search.svg" alt="" className="h-4 w-4" />
          </Link>
          {!accessToken ? (
            <Link
              to="/login"
              className="inline-flex h-8 cursor-pointer items-center rounded-md bg-[#3461ff] px-3 text-[0.75rem] font-semibold text-white sm:px-4"
            >
              로그인
            </Link>
          ) : meQuery.isLoading ? (
            <span className="inline-block h-8 w-20 animate-pulse rounded-md bg-gray-200" />
          ) : (
            <Link
              to="/me"
              className="inline-flex h-8 cursor-pointer items-center rounded-md bg-[#3461ff] px-3 text-[0.75rem] font-semibold text-white sm:px-4"
            >
              마이페이지
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}