import { useEffect, useState, type SubmitEvent } from "react";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { movies } from "../../data/movies";

export function SearchPage() {
  const { query } = useSearch({ from: "/search" });
  const navigate = useNavigate({ from: "/search" });
  const [searchText, setSearchText] = useState(query ?? "");

  useEffect(() => {
    setSearchText(query ?? "");
  }, [query]);

  const normalizedQuery = query?.trim().toLowerCase() ?? "";
  const searchResults = normalizedQuery
    ? movies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(normalizedQuery) ||
          movie.originalTitle.toLowerCase().includes(normalizedQuery),
      )
    : [];

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextQuery = searchText.trim();
    navigate({ search: nextQuery ? { query: nextQuery } : {} });
  }

  return (
    <main className="mx-auto min-h-screen max-w-[1126px] px-5 py-10 sm:py-14">
      <section className="mb-8">
        <p className="mb-2 text-sm font-semibold text-blue-600">SEARCH</p>
        <h1 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">영화 검색</h1>
        <form onSubmit={handleSubmit} className="mt-6 flex max-w-2xl gap-2">
          <input
            aria-label="검색어"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="영화 제목을 검색해 보세요"
            className="min-w-0 flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-gray-950 focus:ring-2 focus:ring-gray-950/10"
          />
          <button
            type="submit"
            className="rounded-xl bg-gray-950 px-5 py-3 font-semibold text-white transition hover:bg-gray-800"
          >
            검색
          </button>
        </form>
      </section>

      {!normalizedQuery ? (
        <p className="rounded-xl bg-white p-6 text-gray-500 ring-1 ring-gray-200">검색어를 입력해 주세요.</p>
      ) : (
        <section>
          <div className="mb-5">
            <h2 className="text-xl font-bold text-gray-950">‘{query}’ 검색 결과</h2>
            <p className="mt-1 text-sm text-gray-500">영화 {searchResults.length}편</p>
          </div>
          {searchResults.length === 0 ? (
            <p className="rounded-xl bg-white p-6 text-gray-500 ring-1 ring-gray-200">검색 결과가 없어요.</p>
          ) : (
            <ul className="space-y-4">
              {searchResults.map((movie) => (
                <li key={movie.id} className="flex gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5">
                  <img
                    src={movie.posterPath}
                    alt={`${movie.title} 포스터`}
                    className="h-40 w-28 shrink-0 rounded-lg bg-gray-200 object-cover"
                  />
                  <div className="min-w-0 py-1">
                    <h3 className="text-lg font-bold text-gray-950">{movie.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{movie.originalTitle}</p>
                    <p className="mt-2 text-sm text-gray-500">{movie.releaseDate}</p>
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600">{movie.overview}</p>
                    <Link
                      to="/movies/$movieId"
                      params={{ movieId: String(movie.id) }}
                      className="mt-3 inline-block text-sm font-semibold text-blue-600 hover:underline"
                    >
                      상세 보기 →
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </main>
  );
}
