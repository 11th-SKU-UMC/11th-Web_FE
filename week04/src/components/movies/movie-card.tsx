import { Link } from "@tanstack/react-router";
import type { Movie } from "../../types/movie";
import { BookmarkButton } from "./bookmark-button";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <article className="min-w-0">
      <div className="relative aspect-[236/268] overflow-hidden rounded-[9px] bg-slate-200 shadow-sm">
        <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }} aria-label={`${movie.title} 상세 보기`}>
          <img className="block size-full object-cover transition duration-300 hover:scale-105" src={movie.posterPath} alt={`${movie.title} 포스터`} />
        </Link>
        <BookmarkButton movieId={movie.id} movieTitle={movie.title} className="absolute top-3 right-3" />
      </div>
      <div className="pt-2.5">
        <h2 className="truncate text-[13px] leading-5 font-bold text-slate-800" title={movie.title}>
          <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }} className="hover:text-blue-600">{movie.title}</Link>
        </h2>
        <p className="mt-1 text-[11px] text-slate-500">{movie.releaseDate}</p>
      </div>
    </article>
  );
}
