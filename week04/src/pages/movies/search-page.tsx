import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState, type SubmitEvent } from "react";
import { movies } from "../../data/movies";
import { BookmarkButton } from "../../components/movies/bookmark-button";

export function SearchPage() {
  const { query } = useSearch({ from: "/search" });
  const navigate = useNavigate({ from: "/search" });
  const [searchText, setSearchText] = useState(query ?? "");

  useEffect(() => setSearchText(query ?? ""), [query]);

  const normalizedQuery = query?.trim().toLowerCase() ?? "";
  const searchResults = normalizedQuery
    ? movies.filter((movie) => movie.title.toLowerCase().includes(normalizedQuery) || movie.originalTitle.toLowerCase().includes(normalizedQuery))
    : [];

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextQuery = searchText.trim();
    navigate({ search: nextQuery ? { query: nextQuery } : {} });
  }

  return (
    <main className="min-h-[calc(100vh-137px)] bg-[#f5f6f8] py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h1 className="mb-6 text-3xl font-extrabold text-slate-950 sm:text-[34px]">영화 검색</h1>
        <form onSubmit={handleSubmit} className="mb-9 flex max-w-2xl gap-2">
          <label className="sr-only" htmlFor="movie-search">검색어</label>
          <input id="movie-search" className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" value={searchText} onChange={(event) => setSearchText(event.target.value)} placeholder="영화 제목을 입력하세요" />
          <button className="rounded-lg bg-blue-600 px-5 font-bold text-white hover:bg-blue-700" type="submit">검색</button>
        </form>
        {!normalizedQuery ? <p className="text-slate-600">검색어를 입력해 주세요.</p> : (
          <section>
            <h2 className="text-xl font-bold text-slate-950">‘{query}’ 검색 결과</h2>
            <p className="mt-1 mb-5 text-sm text-slate-500">영화 {searchResults.length}편</p>
            {searchResults.length === 0 ? <p className="text-slate-600">검색 결과가 없어요.</p> : (
              <ul className="grid gap-4 sm:grid-cols-2">
                {searchResults.map((movie) => (
                  <li key={movie.id} className="flex gap-4 rounded-xl bg-white p-4 shadow-sm">
                    <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }} className="shrink-0">
                      <img className="h-40 w-28 rounded-lg object-cover" src={movie.posterPath} alt={`${movie.title} 포스터`} />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <BookmarkButton movieId={movie.id} movieTitle={movie.title} className="float-right ml-2" />
                      <h3 className="font-bold text-slate-950">{movie.title}</h3>
                      <p className="truncate text-sm text-slate-500">{movie.originalTitle}</p>
                      <p className="mt-1 text-xs text-slate-400">{movie.releaseDate}</p>
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{movie.overview}</p>
                      <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }} className="mt-2 inline-block text-sm font-bold text-blue-600">상세 보기</Link>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
