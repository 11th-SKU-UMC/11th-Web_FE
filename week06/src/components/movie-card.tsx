import { Link } from "react-router-dom";
import type { MovieCardViewModel } from "../utils/movies/movie-adapter";
export function MovieCard({ movie }: { movie: MovieCardViewModel }) {
  return <Link className="movie-card" to={`/movies/${movie.id}`}>
    <div className="poster">{movie.posterUrl ? <img src={movie.posterUrl} alt={`${movie.title} 포스터`} loading="lazy"/> : <div className="image-empty">이미지 없음</div>}</div>
    <div className="movie-meta"><h3>{movie.title}</h3><div className="sub"><span>{movie.year}</span><span>★ {movie.ratingText}</span></div></div>
  </Link>;
}
