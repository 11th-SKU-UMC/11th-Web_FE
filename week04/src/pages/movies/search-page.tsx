import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextQuery = searchText.trim();
    navigate({
      to: "/search",
      search: { query: nextQuery },
    });
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">영화 검색</h1>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          aria-label="검색어"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="검색어를 입력하세요..."
          className="border border-zinc-700 bg-zinc-900 text-white px-3 py-2 rounded flex-1"
        />
        <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">검색</button>
      </form>

      {!normalizedQuery ? (
        <p className="text-zinc-400">검색어를 입력해 주세요.</p>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-2">‘{query}’ 검색 결과</h2>
          <p className="text-zinc-400 mb-4">영화 {searchResults.length}편</p>
          {searchResults.length === 0 ? (
            <p className="text-zinc-400">검색 결과가 없어요.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {searchResults.map((movie) => (
                <div key={movie.id} className="bg-zinc-800 rounded-lg p-2">
                  <img src={movie.posterPath} alt={`${movie.title} 포스터`} className="w-full h-64 object-cover rounded" />
                  <h3 className="text-white mt-2 font-semibold truncate">{movie.title}</h3>
                  <Link
                    to="/movies/$movieId"
                    params={{ movieId: String(movie.id) }}
                    className="text-red-400 text-sm mt-2 block hover:underline"
                  >
                    상세 보기 →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
}