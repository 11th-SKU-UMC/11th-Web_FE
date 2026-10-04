import { Link, useParams } from "@tanstack/react-router";
import { BookmarkButton } from "../../components/bookmark-button";
import { movies } from "../../data/movies";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const movie = movies.find((item) => item.id === Number(movieId));

  if (!movie) {
    return (
      <main className="grid min-h-[calc(100vh-72px)] place-content-center px-5 text-center text-[#969da8]">
        영화를 찾을 수 없어요.
      </main>
    );
  }

  return (
    <main className="relative isolate min-h-[calc(100vh-64px)] overflow-hidden px-5 py-9 sm:min-h-[calc(100vh-72px)] md:px-7 md:py-12 lg:px-8 lg:py-[70px]">
      <div
        className="absolute inset-0 -z-20 scale-[1.02] bg-cover bg-center opacity-[0.42]"
        style={{ backgroundImage: `url(${movie.backdropPath})` }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(0,0,0,0.96)_8%,rgba(0,0,0,0.76)_48%,rgba(0,0,0,0.76)),linear-gradient(0deg,#000_0%,transparent_55%)]"
        aria-hidden="true"
      />

      <section className="mx-auto grid w-full max-w-[1120px] gap-8 md:grid-cols-[190px_minmax(0,1fr)] md:items-center lg:grid-cols-[280px_minmax(0,640px)] lg:gap-[54px]">
        <img
          className="w-[min(62vw,250px)] rounded-xl shadow-[0_24px_70px_rgba(0,0,0,0.55)] md:w-full"
          src={movie.posterPath}
          alt={`${movie.title} 포스터`}
        />

        <div>
          <Link
            className="mb-7 inline-block text-sm font-bold text-[#c3c8d0] no-underline hover:text-white md:mb-10"
            to="/"
          >
            ← 영화 목록
          </Link>
          <p className="mb-2 text-[13px] font-extrabold tracking-[0.04em] text-[#7ba3ff] uppercase">
            {movie.originalTitle}
          </p>
          <h1 className="text-[clamp(38px,5vw,64px)] leading-[1.08] font-extrabold tracking-[-0.045em] text-white">
            {movie.title}
          </h1>
          <h2 className="mt-3.5 mb-7 text-lg font-medium text-[#d6d9df]">
            {movie.tagline}
          </h2>
          <div className="mb-7">
            <BookmarkButton movieId={movie.id} movieTitle={movie.title} />
          </div>

          <dl className="mb-7 flex flex-wrap gap-x-9 gap-y-6">
            <div className="grid gap-1">
              <dt className="text-[11px] font-extrabold tracking-[0.08em] text-[#777f8c]">
                개봉
              </dt>
              <dd className="m-0 text-sm font-semibold text-white">
                {movie.releaseDate}
              </dd>
            </div>
            <div className="grid gap-1">
              <dt className="text-[11px] font-extrabold tracking-[0.08em] text-[#777f8c]">
                장르
              </dt>
              <dd className="m-0 text-sm font-semibold text-white">
                {movie.genres.join(" · ")}
              </dd>
            </div>
            <div className="grid gap-1">
              <dt className="text-[11px] font-extrabold tracking-[0.08em] text-[#777f8c]">
                상영 시간
              </dt>
              <dd className="m-0 text-sm font-semibold text-white">
                {movie.runtime}
              </dd>
            </div>
          </dl>

          <p className="max-w-[600px] text-base leading-7 text-[#c3c8d0]">
            {movie.overview}
          </p>
        </div>
      </section>
    </main>
  );
}
