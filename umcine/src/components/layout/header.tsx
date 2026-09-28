import { Link } from "@tanstack/react-router";

export function Header() {
  return (
    <header className="h-[91px] w-full border-b border-[#e3e6eb] bg-white px-5 py-6 sm:px-8 min-[1101px]:px-20">
      <div className="grid h-full w-full grid-cols-[auto_1fr_auto] items-center">
        <Link
          className="inline-flex items-center gap-2.5 text-xl leading-6 font-black tracking-[-0.7px] text-[#17191e] no-underline"
          to="/"
          aria-label="UMCine 홈"
        >
          <span className="grid size-8 place-items-center rounded-lg border-2 border-[#17191e] bg-white">
            <img className="size-6" src="/icons/movie.svg" alt="" />
          </span>
          <span>UMCine</span>
        </Link>

        <nav
          className="ml-[42px] hidden gap-[30px] min-[701px]:flex"
          aria-label="주요 메뉴"
        >
          <Link
            className="text-sm leading-[17px] font-bold"
            to="/"
            activeOptions={{ exact: true }}
            activeProps={{ className: "text-[#17191e] underline" }}
            inactiveProps={{ className: "text-[#606774] no-underline" }}
          >
            영화
          </Link>
          <Link
            className="text-sm leading-[17px] font-bold"
            to="/search"
            activeOptions={{ exact: true }}
            activeProps={{ className: "text-[#17191e] underline" }}
            inactiveProps={{ className: "text-[#606774] no-underline" }}
          >
            검색
          </Link>
          <a
            className="text-sm leading-[17px] font-bold text-[#606774] no-underline"
            href="#profile"
          >
            내 정보
          </a>
        </nav>

        <div className="flex items-center gap-2.5">
          <Link
            className="grid size-[42px] place-items-center rounded-lg border border-[#e3e6eb] bg-white text-[#17191e] no-underline"
            to="/search"
            aria-label="검색"
          >
            <img className="size-6" src="/icons/search.svg" alt="" />
          </Link>

          <button
            className="h-[42px] w-[71px] rounded-lg border border-blue-600 bg-blue-600 px-4 text-sm leading-[17px] font-extrabold text-white"
            type="button"
          >
            로그인
          </button>
        </div>
      </div>
    </header>
  );
}
