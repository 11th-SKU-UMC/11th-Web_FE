
import { Link, useLocation } from "@tanstack/react-router";

export function Header() {
  const location = useLocation();

  const isMovieActive =
    location.pathname === "/" ||
    location.pathname.startsWith("/movies/");

  const isMyPageActive =
    location.pathname === "/my" ||
    location.pathname.startsWith("/my/");

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
          {/* 영화 */}
          <Link
            to="/"
            className={`relative whitespace-nowrap py-[22px] pb-5 text-[#111111] no-underline ${
              isMovieActive
                ? "font-semibold after:absolute after:right-0 after:bottom-4 after:left-0 after:h-0.5 after:bg-[#111111]"
                : ""
            }`}
          >
            영화
          </Link>

          {/* 검색 */}
          <Link
            to="/search"
            className="relative whitespace-nowrap py-[22px] pb-5 text-[#111111] no-underline"
            activeProps={{
              className:
                "font-semibold after:absolute after:right-0 after:bottom-4 after:left-0 after:h-0.5 after:bg-[#111111]",
            }}
          >
            검색
          </Link>

          {/* 내 정보 */}
          <Link
            to="/my"
            className={`relative whitespace-nowrap py-[22px] pb-5 text-[#111111] no-underline ${
              isMyPageActive
                ? "font-semibold after:absolute after:right-0 after:bottom-4 after:left-0 after:h-0.5 after:bg-[#111111]"
                : ""
            }`}
          >
            내 정보
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-[6px] md:gap-3">
        {/* 돋보기 클릭 시 검색 페이지 이동 */}
        <Link
          to="/search"
          className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-[6px] border border-[#e5e7eb] bg-white p-2"
          aria-label="검색"
        >
          <img
            className="h-full w-full"
            src="/icons/search.svg"
            alt=""
          />
        </Link>

        {/* 로그인 클릭 시 로그인 페이지 이동 */}
        <Link
          to="/login"
          className="flex h-9 shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-[6px] bg-[#2563eb] px-4 text-white hover:bg-[#1d4ed8]"
        >
          로그인
        </Link>
      </div>
    </header>
  );
}
