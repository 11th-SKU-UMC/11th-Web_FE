import { Link } from "react-router-dom";
import type { Movie } from "../types/movie";
import { Icon } from "./Icon";

interface SearchResultCardProps {
  movie: Movie;
}

export function SearchResultCard({ movie }: SearchResultCardProps) {
  return (
    <article className="flex h-[240px] items-start gap-[18px] border-b border-border py-5">
      <div className="h-[190px] w-[126px] shrink-0 overflow-hidden rounded-[10px] bg-page">
        <img
          src={movie.posterPath}
          alt={`${movie.title} 포스터`}
          className="size-full object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <h3 className="text-lg leading-[24.3px] font-bold text-primary">
          {movie.title}
        </h3>

        <div className="flex items-center gap-2 text-xs text-tertiary">
          <span>{movie.originalTitle}</span>
          <span>{movie.releaseDate}</span>
        </div>

        <p className="line-clamp-2 h-[41px] text-[12.5px] leading-[20.25px] text-secondary">
          {movie.overview}
        </p>

        <Link
          to={`/movie/${movie.id}`}
          className="flex w-fit items-center gap-1 text-xs font-bold text-action"
        >
          상세 보기
          <Icon name="arrow-right" className="size-4" />
        </Link>
      </div>
    </article>
  );
}
