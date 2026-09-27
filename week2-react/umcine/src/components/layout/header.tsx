import { Link } from "@tanstack/react-router";
import { cn } from "../../utils/cn";

const navLinkClassName =
  "rounded-lg px-3 py-2 text-sm font-bold no-underline transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-lg">
      <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between px-5 sm:min-h-[72px] sm:px-8 lg:px-12">
        <Link
          className="inline-flex items-center gap-2 text-lg font-black tracking-[0.04em] text-white no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          to="/"
        >
          <img
            className="w-6 invert"
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
                "bg-[#191c23] text-white",
              ),
            }}
            inactiveProps={{
              className: cn(
                navLinkClassName,
                "text-[#969da8] hover:bg-[#191c23] hover:text-white",
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
                "bg-[#191c23] text-white",
              ),
            }}
            inactiveProps={{
              className: cn(
                navLinkClassName,
                "text-[#969da8] hover:bg-[#191c23] hover:text-white",
              ),
            }}
            to="/search"
          >
            검색
          </Link>
        </nav>
      </div>
    </header>
  );
}
