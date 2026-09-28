import { Link, useParams } from "@tanstack/react-router";
import { movies } from "../../data/movies";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const movie = movies.find((item) => item.id === Number(movieId));

  if (!movie) {
    return (
      <main className="grid min-h-[calc(100vh-91px)] place-items-center bg-[#f5f6f8] px-5 text-lg font-bold text-[#606774]">
        영화를 찾을 수 없어요.
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-91px)] bg-[#f5f6f8]">
      <section className="relative min-h-[560px] overflow-hidden bg-[#17191e]">
        <img
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          src={movie.backdropPath}
          alt=""
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#17191e] via-[#17191e]/80 to-[#17191e]/20" />
        <div className="relative mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
          <Link
            className="mb-8 inline-flex items-center rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white no-underline hover:bg-white/10"
            to="/"
          >
            ← 영화 목록
          </Link>
          <div className="grid items-center gap-8 sm:grid-cols-[220px_1fr] sm:gap-10">
            <img
              className="w-40 rounded-xl shadow-2xl sm:w-full"
              src={movie.posterPath}
              alt={`${movie.title} 포스터`}
            />
            <div className="max-w-2xl text-white">
              <p className="mb-2 text-sm font-semibold text-white/70">
                {movie.originalTitle}
              </p>
              <h1 className="mb-4 text-3xl leading-tight font-black sm:text-5xl">
                {movie.title}
              </h1>
              <p className="mb-5 text-sm text-white/80">
                {movie.releaseDate} <span className="px-2">·</span>
                {movie.genres.join(" · ")} <span className="px-2">·</span>
                {movie.runtime}
              </p>
              <h2 className="mb-3 text-xl font-bold">{movie.tagline}</h2>
              <p className="text-sm leading-7 text-white/85">{movie.overview}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
