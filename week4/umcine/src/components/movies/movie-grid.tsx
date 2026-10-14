import type { Movie } from "../../types/movie";
import MovieCard from "./movie-card";

interface MovieGridProps {
  movies: Movie[];
  cardSize: "small" | "large";
}

export default function MovieGrid({
  movies,
  cardSize,
}: MovieGridProps) {
  return (
    <section
      className={`grid grid-cols-1 gap-5 sm:grid-cols-2 ${
        cardSize === "small"
          ? "lg:grid-cols-3 xl:grid-cols-5"
          : "lg:grid-cols-3"
      }`}
    >
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
        />
      ))}
    </section>
  );
}