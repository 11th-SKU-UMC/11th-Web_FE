import { Link, useParams } from "react-router-dom";
import { Icon } from "../components/Icon";
import { RatingPanel } from "../components/RatingPanel";
import { useMovies } from "../hooks/useMovies";

export default function MovieDetailPage() {
  const { movieId } = useParams();
  const { movies, toggleBookmark } = useMovies();
  const movie = movies.find((item) => String(item.id) === movieId);

  if (!movie) {
    return (
      <main className="flex flex-col items-center px-20 py-[209px]">
        <p className="text-lg font-bold text-primary">찾을 수 없는 영화예요.</p>
      </main>
    );
  }

  return (
    <div className="flex flex-col pb-[238px]">
      <div className="relative h-[360px] w-full overflow-hidden">
        <img
          src={movie.backdropPath}
          alt=""
          className="size-full object-cover"
        />

        <div className="absolute inset-0 flex flex-col justify-between px-20 py-6">
          <Link to="/" className="flex w-fit items-center gap-1">
            <Icon name="lucide-chevron-left" className="size-6 text-surface" />
            <span className="text-[13px] font-bold text-surface">
              영화 목록
            </span>
          </Link>

          <div className="flex w-[800px] max-w-full flex-col gap-2">
            <h1 className="text-[46px] leading-[49.68px] font-bold tracking-[-2.3px] text-surface">
              {movie.title}
            </h1>

            <p className="text-sm text-surface">{movie.originalTitle}</p>

            <div className="flex items-center gap-2 text-[13px] font-bold text-surface">
              <span>{movie.releaseDate}</span>
              <span>{movie.genres.join(" · ")}</span>
              <span>{movie.runtime}</span>
            </div>
          </div>
        </div>
      </div>

      <main className="flex items-start gap-8 px-20 py-6">
        <div className="h-[286px] w-[200px] shrink-0 overflow-hidden rounded-[10px] bg-page shadow-[0_12px_30px_rgba(12,15,20,0.12)]">
          <img
            src={movie.posterPath}
            alt={`${movie.title} 포스터`}
            className="size-full object-cover"
          />
        </div>

        <section className="flex min-w-0 flex-1 flex-col gap-3">
          <h2 className="text-[21px] font-bold tracking-[-0.63px] text-primary">
            {movie.tagline}
          </h2>

          <p className="text-sm leading-6 text-secondary">{movie.overview}</p>

          <div className="flex items-start">
            <button
              type="button"
              onClick={() => toggleBookmark(movie.id)}
              aria-pressed={movie.isBookmarked}
              className="flex h-[42px] items-center justify-center gap-2 rounded-lg border border-surface bg-action px-4 text-sm font-bold text-surface"
            >
              <Icon
                name={movie.isBookmarked ? "bookmark" : "lucide-bookmark"}
                className="size-4 text-surface"
              />
              즐겨찾기
            </button>
          </div>
        </section>

        <RatingPanel key={movie.id} movieId={movie.id} />
      </main>
    </div>
  );
}
