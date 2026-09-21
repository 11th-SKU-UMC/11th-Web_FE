import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: () => void;
}

export function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  return (
    <div className="flex-1 rounded-lg bg-gray-100 p-5">
      <div className="text-lg font-semibold">{movie.title}</div>
      <div className="mt-2 text-sm text-gray-500">{movie.releaseDate}</div>

      <button
        className="mt-4 text-sm font-medium"
        aria-pressed={movie.isBookmarked}
        onClick={onToggleBookmark}
      >
        {movie.isBookmarked ? "★ 북마크 삭제" : "☆ 북마크 추가"}
      </button>
    </div>
  );
}
