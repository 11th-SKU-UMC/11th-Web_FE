import { Link } from "@tanstack/react-router";
import { movies } from "../../data/movies";

export function MovieListPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">영화 목록</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            to="/movies/$movieId"
            params={{ movieId: String(movie.id) }}
            className="bg-zinc-800 rounded-lg p-2 block hover:scale-105 transition-transform"
          >
            <img
              src={movie.posterPath}
              alt={movie.title}
              className="w-full h-64 object-cover rounded"
            />
            <h2 className="text-white mt-2 font-semibold truncate">{movie.title}</h2>
          </Link>
        ))}
      </div>
    </main>
  );
}