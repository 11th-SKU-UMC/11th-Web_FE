import { Link } from "@tanstack/react-router";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1126px] items-center justify-between px-5">
        <Link to="/" className="text-xl font-bold tracking-tight text-gray-950">
          UMCINE
        </Link>
        <nav className="flex items-center gap-1">
          <Link
            to="/"
            activeProps={{ className: "bg-gray-100 text-gray-950" }}
            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-950"
          >
            영화
          </Link>
          <Link
            to="/search"
            activeProps={{ className: "bg-gray-100 text-gray-950" }}
            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-950"
          >
            검색
          </Link>
        </nav>
      </div>
    </header>
  );
}
