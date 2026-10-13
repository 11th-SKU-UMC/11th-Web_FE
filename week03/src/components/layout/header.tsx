import { Link } from "@tanstack/react-router";

export function Header() {
  return (
    <header className="flex gap-4 p-4 bg-zinc-900 text-white">
      <Link to="/" className="hover:text-red-500 font-bold">영화</Link>
      <Link to="/search" search={{ query: "" }} className="hover:text-red-500 font-bold">검색</Link>
    </header>
  );
}