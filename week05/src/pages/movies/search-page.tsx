import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState, type SubmitEvent } from "react";
import { searchMovies } from "../../api/movies/search-movies";
import type { TmdbMovieListItem } from "../../api/movies/models";
import { useBookmarkStore } from "../../stores/bookmark-store";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";

export function SearchPage() {
  const bookmarkedMovieIds = useBookmarkStore(
    (state) => state.bookmarkedMovieIds,
  );
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);
  const { query } = useSearch({ from: "/search" });
  const navigate = useNavigate({ from: "/search" });
  const [searchText, setSearchText] = useState(query ?? "");
  const [movies, setMovies] = useState<TmdbMovieListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const normalizedQuery = query?.trim() ?? "";

  useEffect(() => {
    let ignore = false;

    setMovies([]);
    setErrorMessage(null);

    if (!normalizedQuery) {
      setIsLoading(false);
      return () => {
        ignore = true;
      };
    }

    setIsLoading(true);

    searchMovies({ query: normalizedQuery })
      .then((response) => {
        if (!ignore) setMovies(response.results);
      })
      .catch(() => {
        if (!ignore) setErrorMessage("검색 결과를 불러오지 못했어요.");
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [normalizedQuery]);

  useEffect(() => {
    setSearchText(query ?? "");
  }, [query]);

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
        ) : isLoading ? (
          <p role="status" className="text-[#606774]">
            검색 결과를 불러오는 중이에요.
          </p>
        ) : errorMessage ? (
          <p role="alert" className="text-[#606774]">
            {errorMessage}
          </p>
        ) : movies.length === 0 ? (
          <p className="text-[#606774]">검색 결과가 없어요.</p>
        ) : (
          <>
            <h2 className="text-xl font-bold text-[#17191e]">
              ‘{normalizedQuery}’ 검색 결과
            </h2>
            <p className="mt-2 mb-5 text-sm text-[#606774]">
              영화 {movies.length}편
            </p>
            <ul className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              {movies.map((movie) => {
                const posterUrl = getTmdbPosterUrl(movie.poster_path);

                return (
                  <li className="flex list-none items-center gap-3" key={movie.id}>
                    <Link
                      className="flex min-w-0 flex-1 gap-4 rounded-xl border border-[#e3e6eb] bg-white p-4 text-[#17191e] no-underline transition-shadow hover:shadow-md"
                      to="/movies/$movieId"
                      params={{ movieId: String(movie.id) }}
                    >
                      {posterUrl ? (
                        <img
                          className="w-24 shrink-0 self-start rounded-lg object-cover sm:w-32"
                          src={posterUrl}
                          alt={`${movie.title} 포스터`}
                        />
                      ) : (
                        <div className="grid h-36 w-24 shrink-0 place-items-center rounded-lg bg-[#e3e6eb] text-xs text-[#969da8] sm:w-32">
                          이미지 없음
                        </div>
                      )}
                      <div className="min-w-0 py-1">
                        <h3 className="mb-1 text-lg font-extrabold">
                          {movie.title}
                        </h3>
                        <p className="mb-1 text-sm text-[#606774]">
                          {movie.original_title}
                        </p>
                        <p className="mb-3 text-xs text-[#969da8]">
                          {movie.release_date}
                        </p>
                        <p className="line-clamp-3 text-sm leading-6 text-[#606774]">
                          {movie.overview}
                        </p>
                      </div>
                    </Link>
                    <button
                      className="shrink-0 rounded-lg bg-blue-600 px-3 py-2 text-sm font-bold text-white"
                      type="button"
                      aria-pressed={bookmarkedMovieIds.includes(movie.id)}
                      onClick={() => toggleBookmark(movie.id)}
                    >
                      {bookmarkedMovieIds.includes(movie.id)
                        ? "북마크 해제"
                        : "북마크"}
                    </button>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </main>
  );
}
