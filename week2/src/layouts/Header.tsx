import { NavLink } from "react-router-dom";

const NAV_ITEMS = [
  { label: "영화", to: "/" },
  { label: "검색", to: "/search" },
  { label: "내 정보", to: "/mypage" },
];

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b border-border bg-surface px-20 py-6">
      <div className="flex items-center gap-[42px]">
        <NavLink to="/" className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg border-2 border-primary">
            <img src="/icons/movie.svg" alt="" className="size-6" />
          </span>
          <span className="text-xl font-bold tracking-[-0.7px] text-primary">
            UMCine
          </span>
        </NavLink>

        <nav className="flex items-center gap-[30px] text-center text-sm font-bold">
          {NAV_ITEMS.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                isActive ? "text-primary underline" : "text-secondary"
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-2.5">
        <NavLink
          to="/search"
          aria-label="영화 검색"
          className="flex size-[42px] items-center justify-center rounded-lg border border-border bg-surface"
        >
          <img src="/icons/search.svg" alt="" className="size-6" />
        </NavLink>

        <NavLink
          to="/mypage"
          className="flex h-[42px] items-center justify-center rounded-lg border border-surface bg-action px-4 text-center text-sm font-bold text-surface"
        >
          마이페이지
        </NavLink>
      </div>
    </header>
  );
}
