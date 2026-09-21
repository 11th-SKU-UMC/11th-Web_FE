import { NavLink } from "react-router-dom";
import { Icon } from "../components/Icon";

const NAV_ITEMS = [
  { label: "영화", to: "/" },
  { label: "검색", to: "/search" },
  { label: "내 정보", to: "/mypage" },
];

interface HeaderProps {
  isLoggedIn?: boolean;
}

export default function Header({ isLoggedIn = false }: HeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-border bg-surface px-20 py-6">
      <div className="flex items-center gap-[42px]">
        <NavLink to="/" className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg border-2 border-primary">
            <Icon name="movie" className="size-6 text-primary" />
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
          <Icon name="search" className="size-6 text-secondary" />
        </NavLink>

        <NavLink
          to={isLoggedIn ? "/mypage" : "/login"}
          className="flex h-[42px] items-center justify-center rounded-lg border border-surface bg-action px-4 text-center text-sm font-bold text-surface"
        >
          {isLoggedIn ? "마이페이지" : "로그인"}
        </NavLink>
      </div>
    </header>
  );
}
