import { Link } from "@tanstack/react-router";

const navClass = "relative py-8 text-sm font-medium text-slate-500 transition hover:text-slate-950 [&.active]:font-bold [&.active]:text-slate-950 [&.active]:after:absolute [&.active]:after:inset-x-0 [&.active]:after:bottom-5 [&.active]:after:h-0.5 [&.active]:after:bg-slate-950";

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-8 sm:gap-11">
          <Link to="/" className="flex items-center gap-2 text-lg font-extrabold text-slate-950 no-underline" aria-label="UMCine 홈">
            <img className="size-8" src="/icons/movie.svg" alt="" />
            <span>UMCine</span>
          </Link>
          <nav className="flex items-center gap-6 sm:gap-9" aria-label="주요 메뉴">
            <Link to="/" activeOptions={{ exact: true }} className={navClass}>영화</Link>
            <Link to="/search" className={navClass}>검색</Link>
          </nav>
        </div>
        <Link to="/search" className="hidden size-10 place-items-center rounded-lg border border-slate-300 bg-white sm:grid" aria-label="영화 검색">
          <img className="size-5" src="/icons/search.svg" alt="" />
        </Link>
      </div>
    </header>
  );
}
