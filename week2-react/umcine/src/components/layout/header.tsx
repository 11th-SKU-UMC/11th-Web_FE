import { Link } from "@tanstack/react-router";
import { cn } from "../../utils/cn";

const navLinkClassName =
  "rounded-lg px-3 py-2 text-sm font-bold no-underline transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export function Header({ light = false }: { light?: boolean }) {
  return (
    <header className={cn("sticky top-0 z-50 border-b backdrop-blur-lg", light ? "border-[#e8eaee] bg-white/95" : "border-white/10 bg-black/80")}>
      <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between px-5 sm:min-h-[72px] sm:px-8 lg:px-12">
        <Link
          className={cn("inline-flex items-center gap-2 text-lg font-black tracking-[0.04em] no-underline focus-visible:outline-2 focus-visible:outline-offset-2", light ? "text-[#17191d] focus-visible:outline-[#17191d]" : "text-white focus-visible:outline-white")}
          to="/"
        >
          <img
            className={cn("w-6", !light && "invert")}
            src="/icons/movie-icons/movie.svg"
            alt=""
          />
          UMCINE
        </Link>

        <nav className="flex gap-2" aria-label="주요 메뉴">
          <Link
            className={navLinkClassName}
            activeOptions={{ exact: true }}
            activeProps={{
              className: cn(
                navLinkClassName,
                light ? "bg-[#eef2ff] text-[#315ad9]" : "bg-[#191c23] text-white",
              ),
            }}
            inactiveProps={{
              className: cn(
                navLinkClassName,
                light ? "text-[#555c68] hover:bg-[#f0f2f5] hover:text-[#17191d]" : "text-[#969da8] hover:bg-[#191c23] hover:text-white",
              ),
            }}
            to="/"
          >
            영화
          </Link>
          <Link
            className={navLinkClassName}
            activeProps={{
              className: cn(
                navLinkClassName,
                light ? "bg-[#eef2ff] text-[#315ad9]" : "bg-[#191c23] text-white",
              ),
            }}
            inactiveProps={{
              className: cn(
                navLinkClassName,
                light ? "text-[#555c68] hover:bg-[#f0f2f5] hover:text-[#17191d]" : "text-[#969da8] hover:bg-[#191c23] hover:text-white",
              ),
            }}
            to="/search"
          >
            검색
          </Link>
          <Link className={cn(navLinkClassName, light ? "text-[#555c68] hover:bg-[#f0f2f5]" : "text-[#969da8] hover:bg-[#191c23] hover:text-white")} to="/mypage">
            내 정보
          </Link>
          <Link className="rounded-md bg-[#4169e1] px-3 py-2 text-sm font-bold text-white no-underline hover:bg-[#3159d4]" to="/login">
            로그인
          </Link>
        </nav>
      </div>
    </header>
  );
}
