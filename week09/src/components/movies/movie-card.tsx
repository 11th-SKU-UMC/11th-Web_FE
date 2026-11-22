import { useBookmarkStore } from "../../stores/useBookmarkStore";
import type { Movie } from "../../types/movie";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);
  const isBookmarked = useBookmarkStore((state) => state.isBookmarked(movie.id));

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-gray-100">
        <img
          src={movie.posterPath}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
        <button
          type="button"
          className="absolute top-2 right-2 p-1.5 rounded-md bg-black/40 hover:bg-black/60 backdrop-blur-xs transition-colors z-10"
          onClick={() => toggleBookmark(movie.id)}
          aria-label={`${movie.title} 북마크 토글`}
        >
          <img
            src={isBookmarked ? "/icons/bookmark.svg" : "/icons/bookmark-outline.svg"}
            alt="북마크 아이콘"
            className="w-5 h-5 invert"
          />
        </button>
      </div>
      <div className="p-3">
        <h3 className="font-bold text-gray-900 text-sm truncate">{movie.title}</h3>
        <p className="text-xs text-gray-500 mt-0.5">{movie.releaseDate}</p>
      </div>
    </article>
  );
}