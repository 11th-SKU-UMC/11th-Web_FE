import { useParams } from "@tanstack/react-router";
import { movies } from "../../data/movies";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const movie = movies.find((m) => String(m.id) === movieId);

  if (!movie) {
    return <main className="p-6">해당 영화를 찾을 수 없습니다.</main>;
  }

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        <img src={movie.posterPath} alt={movie.title} className="w-full md:w-72 rounded-lg object-cover" />
        <div>
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <p className="text-zinc-400 mb-4">{movie.originalTitle} ({movie.releaseDate})</p>
          <p className="text-zinc-300 leading-relaxed">{movie.overview}</p>
        </div>
      </div>
    </main>
  );
}