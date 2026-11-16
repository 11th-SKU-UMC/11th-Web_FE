import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { searchMovies } from "../../api/movies/search-movies";
import type { TmdbMovieListItem } from "../../api/movies/models";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";

interface SearchPageProps {
  query?: string;
}

export function SearchPage({ query: initialQuery = "" }: SearchPageProps) {
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [query, setQuery] = useState(initialQuery);
  const [movies, setMovies] = useState<TmdbMovieListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setSearchTerm(initialQuery);
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    let ignore = false;
    const normalizedQuery = query?.trim() ?? "";

    setMovies([]);
    setErrorMessage(null);

    if (!normalizedQuery) {
      setIsLoading(false);
      return;
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
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setQuery(searchTerm);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <form onSubmit={handleSearch} className="flex justify-center mb-8 mt-4">
        <div className="w-full max-w-xl bg-gray-800 rounded-lg p-2 flex items-center shadow-lg border border-gray-700">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="어떤 영화를 찾고 있나요?"
            className="w-full bg-transparent text-white px-3 outline-none placeholder-gray-400 text-base"
          />
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md font-semibold transition shrink-0"
          >
            검색
          </button>
        </div>
      </form>

      {query && (
        <h2 className="text-xl font-semibold mb-4 text-white">'{query}' 검색 결과</h2>
      )}

      {isLoading && <p className="text-white text-center">검색 중이에요...</p>}
      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
      
      {!isLoading && !errorMessage && query && movies.length === 0 && (
        <p className="text-gray-400 text-center">검색 결과가 없어요.</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
        {movies.map((movie) => {
          const posterUrl = getTmdbPosterUrl(movie.poster_path);
          return (
            <Link
              key={movie.id}
              to="/movies/$movieId"
              params={{ movieId: String(movie.id) }}
              className="flex flex-col bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-200 cursor-pointer"
            >
              {posterUrl ? (
                <img
                  src={posterUrl}
                  alt={movie.title}
                  className="w-full h-auto object-cover aspect-[2/3]"
                />
              ) : (
                <div className="w-full aspect-[2/3] bg-gray-700 flex items-center justify-center text-gray-400">
                  이미지 없음
                </div>
              )}
              <div className="p-3 flex flex-col flex-grow">
                <h3 className="text-white font-semibold text-sm truncate">{movie.title}</h3>
                <p className="text-gray-400 text-xs mt-1">{movie.release_date}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default SearchPage;