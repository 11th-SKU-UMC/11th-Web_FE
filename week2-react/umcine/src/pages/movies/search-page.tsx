import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState, type SubmitEvent } from "react";
import { BookmarkButton } from "../../components/bookmark-button";
import { MovieSortControl } from "../../components/movies/movie-sort-control";
import { movies } from "../../data/movies";
import { useMoviePreferenceStore } from "../../stores/movie-preference-store";

export function SearchPage() {
  const { query } = useSearch({ from: "/search" });
  const navigate = useNavigate({ from: "/search" });
  const [searchText, setSearchText] = useState(query ?? "");
  const sortOrder = useMoviePreferenceStore((state) => state.sortOrder);

  useEffect(() => {
    setSearchText(query ?? "");
  }, [query]);

  const normalizedQuery = query?.trim().toLowerCase() ?? "";
  const matchingMovies = normalizedQuery
    ? movies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(normalizedQuery) ||
          movie.originalTitle.toLowerCase().includes(normalizedQuery),
      )
    : [];
  const searchResults =
    sortOrder === "title"
      ? [...matchingMovies].sort((first, second) =>
          first.title.localeCompare(second.title, "ko"),
        )
      : matchingMovies;

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextQuery = searchText.trim();
    navigate({
      search: nextQuery ? { query: nextQuery } : {},
    });
  }

  return (
    <main className="mx-auto min-h-[calc(100vh-64px)] w-full max-w-[1440px] px-5 py-9 sm:min-h-[calc(100vh-72px)] sm:px-7 sm:py-12 lg:px-12 xl:px-20">
      <div className="mb-6">
        <p className="mb-1 text-[11px] font-extrabold tracking-[0.14em] text-[#4f83ff]">
          FIND YOUR MOVIE
        </p>
        <h1 className="text-[28px] leading-10 font-extrabold tracking-[-0.04em] text-white sm:text-[34px] lg:text-[40px] lg:leading-12">
          영화 검색
        </h1>
      </div>

      <form
        className="mb-6 grid max-w-[720px] grid-cols-[auto_1fr] items-center gap-2.5 rounded-xl border border-[#2a2d33] bg-[#111318] p-2 pl-4 focus-within:border-[#4f83ff] focus-within:ring-3 focus-within:ring-[#4f83ff]/15 sm:grid-cols-[auto_1fr_auto]"
        role="search"
        onSubmit={handleSubmit}
      >
        <img
          className="w-5 opacity-60 invert"
          src="/icons/movie-icons/search.svg"
          alt=""
        />
        <input
          className="min-w-0 border-0 bg-transparent px-1 py-2 text-white outline-none placeholder:text-[#6f7682]"
          aria-label="검색어"
          placeholder="영화 제목을 검색해 보세요"
          type="search"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
        <button
          className="col-span-2 cursor-pointer rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-500 sm:col-span-1"
          type="submit"
        >
          검색
        </button>
      </form>

      {!normalizedQuery ? (
        <p className="my-12 text-center text-[#969da8]">
          검색어를 입력해 주세요.
        </p>
      ) : (
        <>
          <h2 className="text-xl font-bold text-white">
            ‘{query}’ 검색 결과
          </h2>
          <p className="mt-1 mb-5 text-sm text-[#969da8]">
            영화 {searchResults.length}편
          </p>
          {searchResults.length === 0 ? (
            <p className="my-12 text-center text-[#969da8]">
              검색 결과가 없어요.
            </p>
          ) : (
            <>
              <MovieSortControl />
              <ul className="grid list-none gap-4 p-0 md:grid-cols-2">
                {searchResults.map((movie) => (
                  <li
                    className="grid gap-4 rounded-xl border border-white/10 bg-[#111318] p-4 sm:grid-cols-[120px_minmax(0,1fr)]"
                    key={movie.id}
                  >
                    <Link
                      className="block overflow-hidden rounded-lg"
                      to="/movies/$movieId"
                      params={{ movieId: String(movie.id) }}
                    >
                      <img
                        className="aspect-[2/3] h-full w-full object-cover transition-transform hover:scale-[1.025]"
                        src={movie.posterPath}
                        alt={`${movie.title} 포스터`}
                      />
                    </Link>
                    <div className="min-w-0">
                      <Link
                        className="text-lg font-bold text-white no-underline hover:text-blue-400"
                        to="/movies/$movieId"
                        params={{ movieId: String(movie.id) }}
                      >
                        <h3>{movie.title}</h3>
                      </Link>
                      <p className="mt-1 truncate text-sm text-[#969da8]">
                        {movie.originalTitle}
                      </p>
                      <p className="mt-1 text-xs font-medium text-[#777f8c]">
                        {movie.releaseDate}
                      </p>
                      <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#c3c8d0]">
                        {movie.overview}
                      </p>
                      <Link
                        className="mt-4 inline-flex text-sm font-bold text-[#7ba3ff] no-underline hover:text-white"
                        to="/movies/$movieId"
                        params={{ movieId: String(movie.id) }}
                      >
                        상세 보기 →
                      </Link>
                      <div className="mt-4">
                        <BookmarkButton
                          movieId={movie.id}
                          movieTitle={movie.title}
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </main>
  );
}
