import type { Movie } from "../types/movie";

interface MovieCardProps {
    movie: Movie;
    onToggleBookmark: (movieID: number) => void;
}

export default function MovieCard({movie, onToggleBookmark }: MovieCardProps){
    return(
        <div className="movie-card">
            <div className = "poster">
                <img src={movie.posterPath} alt={movie.title} />
                <button
                    className={movie.isBookmarked ? "bookmark-button active" : "bookmark-button"}
                    onClick={() => onToggleBookmark(movie.id)}
                >
                    <img
                        src={movie.isBookmarked ? "/icons/bookmark.svg" : "/icons/bookmark-outline.svg"}
                        alt="북마크"
                    />
                </button>
            </div>
            <div className="movie-description">
                <span>{movie.title}</span>
                <p>{movie.releaseDate}</p>
            </div>
        </div>
    )
}