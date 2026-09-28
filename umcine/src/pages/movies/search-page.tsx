import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState, type SubmitEvent } from "react";
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
    navigate({
      search: nextQuery ? { query: nextQuery } : {},
    });
  }

  return (
    <main className="min-h-[calc(100vh-91px)] bg-[#f5f6f8] px-5 py-8 sm:px-8 min-[1101px]:px-20">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-3xl font-extrabold text-[#17191e]">영화 검색</h1>
        <form className="mb-8 flex gap-2" onSubmit={handleSubmit}>
          <input
            className="min-w-0 flex-1 rounded-lg border border-[#e3e6eb] bg-white px-4 py-3 text-[#17191e] outline-none focus:border-blue-600"
            aria-label="검색어"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
          <button
            className="rounded-lg bg-blue-600 px-6 py-3 font-bold text-white"
            type="submit"
          >
            검색
          </button>
        </form>

        {!normalizedQuery ? (
          <p className="text-[#606774]">검색어를 입력해 주세요.</p>
        ) : (
          <>
            <h2 className="text-xl font-bold text-[#17191e]">
              ‘{query}’ 검색 결과
            </h2>
            <p className="mt-2 mb-5 text-sm text-[#606774]">
              영화 {searchResults.length}편
            </p>
            {searchResults.length === 0 ? (
              <p className="text-[#606774]">검색 결과가 없어요.</p>
            ) : (
              <ul className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                {searchResults.map((movie) => (
                  <li className="list-none" key={movie.id}>
                    <Link
                      className="flex h-full gap-4 rounded-xl border border-[#e3e6eb] bg-white p-4 text-[#17191e] no-underline transition-shadow hover:shadow-md"
                      to="/movies/$movieId"
                      params={{ movieId: String(movie.id) }}
                    >
                      <img
                        className="w-24 shrink-0 self-start rounded-lg object-cover sm:w-32"
                        src={movie.posterPath}
                        alt={`${movie.title} 포스터`}
                      />
                      <div className="min-w-0 py-1">
                        <h3 className="mb-1 text-lg font-extrabold">
                          {movie.title}
                        </h3>
                        <p className="mb-1 text-sm text-[#606774]">
                          {movie.originalTitle}
                        </p>
                        <p className="mb-3 text-xs text-[#969da8]">
                          {movie.releaseDate}
                        </p>
                        <p className="line-clamp-3 text-sm leading-6 text-[#606774]">
                          {movie.overview}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </main>
  );
}
