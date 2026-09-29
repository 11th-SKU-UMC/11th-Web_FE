import { Link, useParams } from "@tanstack/react-router";
import { movies } from "../../data/movies";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const movie = movies.find((item) => item.id === Number(movieId));

  if (!movie) return <main className="grid min-h-[calc(100vh-137px)] place-items-center bg-[#f5f6f8] text-lg font-bold">영화를 찾을 수 없어요.</main>;

  return (
    <main className="relative min-h-[calc(100vh-137px)] overflow-hidden bg-slate-950 text-white">
      <img className="absolute inset-0 size-full object-cover opacity-30" src={movie.backdropPath} alt="" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/30" />
      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
        <Link to="/" className="mb-8 inline-flex text-sm font-bold text-white/80 hover:text-white">← 영화 목록</Link>
        <div className="grid gap-8 md:grid-cols-[280px_1fr] md:items-end">
          <img className="w-full max-w-[280px] rounded-xl object-cover shadow-2xl" src={movie.posterPath} alt={`${movie.title} 포스터`} />
          <div className="max-w-3xl">
            <p className="text-sm text-white/60">{movie.releaseDate} · {movie.genres.join(" · ")} · {movie.runtime}</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">{movie.title}</h1>
            <p className="mt-2 text-lg text-white/60">{movie.originalTitle}</p>
            <h2 className="mt-8 text-2xl font-bold">{movie.tagline}</h2>
            <p className="mt-4 text-base leading-8 text-white/80 sm:text-lg">{movie.overview}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
