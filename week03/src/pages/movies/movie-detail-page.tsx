import { Link, useParams } from "@tanstack/react-router";
import { movies } from "../../data/movies";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const movie = movies.find((item) => item.id === Number(movieId));

  if (!movie) {
    return (
      <main className="mx-auto min-h-screen max-w-[1126px] px-5 py-16">
        <p className="text-gray-500">영화를 찾을 수 없어요.</p>
        <Link to="/" className="mt-4 inline-block font-semibold text-blue-600">영화 목록으로 돌아가기</Link>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-[1126px] bg-white">
      <section className="relative min-h-[360px] overflow-hidden bg-gray-950 sm:min-h-[460px]">
        <img
          src={movie.backdropPath}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-transparent" />
        <div className="relative flex min-h-[360px] items-end px-5 pb-8 sm:min-h-[460px] sm:px-10 sm:pb-10">
          <Link to="/" className="absolute left-5 top-5 rounded-lg bg-black/40 px-3 py-2 text-sm font-medium text-white backdrop-blur sm:left-10">
            ← 영화 목록
          </Link>
          <div className="max-w-3xl text-white">
            <p className="mb-2 text-sm text-white/70">{movie.releaseDate} · {movie.runtime}</p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">{movie.title}</h1>
            <p className="mt-2 text-white/70">{movie.originalTitle}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-8 px-5 py-8 sm:grid-cols-[240px_1fr] sm:px-10 sm:py-10">
        <img
          src={movie.posterPath}
          alt={`${movie.title} 포스터`}
          className="mx-auto w-48 rounded-xl bg-gray-200 object-cover shadow-md sm:mx-0 sm:w-full"
        />
        <div>
          <div className="flex flex-wrap gap-2">
            {movie.genres.map((genre) => (
              <span key={genre} className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
                {genre}
              </span>
            ))}
          </div>
          <h2 className="mt-7 text-2xl font-bold text-gray-950">{movie.tagline}</h2>
          <p className="mt-4 leading-7 text-gray-600">{movie.overview}</p>
        </div>
      </section>
    </main>
  );
}
