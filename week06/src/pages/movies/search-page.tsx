
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { searchMovies } from "../../api/movies/search-movies";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";

interface SearchPageProps {
  query?: string;
}

export function SearchPage({ query: initialQuery = "" }: SearchPageProps) {
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [query, setQuery] = useState(initialQuery);

  // 외부에서 전달받은 검색어가 변경되면 입력값과 검색어를 동기화해요.
  useEffect(() => {
    setSearchTerm(initialQuery);
    setQuery(initialQuery);
  }, [initialQuery]);

  const normalizedQuery = query.trim();

  // 검색어에 맞는 영화 데이터를 조회해요.
  const searchQuery = useQuery({
    queryKey: ["movies", "search", { query: normalizedQuery }],
    queryFn: () => searchMovies({ query: normalizedQuery }),
    enabled: normalizedQuery.length > 0,
  });

  const movies = searchQuery.data?.results ?? [];

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      setQuery(searchTerm);
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

      {normalizedQuery && (
        <h2 className="text-xl font-semibold mb-4 text-white">
          '{normalizedQuery}' 검색 결과
        </h2>
      )}

      {searchQuery.isLoading && (
        <p className="text-white text-center">검색 중이에요...</p>
      )}

      {searchQuery.isError && (
        <p className="text-red-500 text-center">
          {searchQuery.error.message}
        </p>
      )}

      {!searchQuery.isLoading &&
        !searchQuery.isError &&
        normalizedQuery &&
        searchQuery.isSuccess &&
        movies.length === 0 && (
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
                <h3 className="text-white font-semibold text-sm truncate">
                  {movie.title}
                </h3>
                <p className="text-gray-400 text-xs mt-1">
                  {movie.release_date}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default SearchPage;
