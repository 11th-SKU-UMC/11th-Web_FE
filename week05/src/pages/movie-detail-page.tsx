import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieDetail } from "../api/movies/get-movie-detail";
import type { TmdbMovieDetail } from "../api/movies/models";
import { StatusView } from "../components/status-view";
import { getTmdbBackdropUrl, getTmdbPosterUrl } from "../utils/movies/tmdb-image";
import { getMovieDetailErrorMessage } from "../utils/movies/get-movie-detail-error-message";
export function MovieDetailPage() {
  const { movieId } = useParams();
  const id = Number(movieId);
  const valid = Number.isSafeInteger(id) && id > 0;
  const [movie, setMovie] = useState<TmdbMovieDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  useEffect(() => {
    let ignore = false;
    setMovie(null); setError(null);
    if (!valid) { setLoading(false); return () => { ignore = true; }; }
    setLoading(true);
    getMovieDetail(id).then(data => { if (!ignore) setMovie(data); })
      .catch((err: unknown) => { if (!ignore) setError(getMovieDetailErrorMessage(err)); })
      .finally(() => { if (!ignore) setLoading(false); });
    return () => { ignore = true; };
  }, [id, valid, retryCount]);
  if (!valid) return <div className="page"><StatusView status="error" message="올바르지 않은 영화 번호예요."/></div>;
  if (loading) return <div className="page"><StatusView status="loading"/></div>;
  if (error) return <div className="page"><StatusView status="error" message={error} retry={() => setRetryCount(n => n + 1)}/></div>;
  if (!movie) return <div className="page"><StatusView status="empty" message="영화 정보를 찾을 수 없어요."/></div>;
  const poster = getTmdbPosterUrl(movie.poster_path);
  const backdrop = getTmdbBackdropUrl(movie.backdrop_path);
  const runtime = movie.runtime == null ? "상영 시간 정보가 없어요." : `${Math.floor(movie.runtime / 60)}시간 ${movie.runtime % 60}분`;
  return <section className="detail">
    <div className="backdrop">{backdrop ? <img src={backdrop} alt=""/> : <div className="image-empty">이미지 없음</div>}</div>
    <div className="page detail-content"><Link className="back-link" to="/">← 영화 목록으로</Link><div className="detail-flex">
      <div className="detail-poster">{poster ? <img src={poster} alt={`${movie.title} 포스터`}/> : <div className="image-empty">이미지 없음</div>}</div>
      <div className="detail-copy"><span className="eyebrow">MOVIE DETAILS</span><h1>{movie.title}</h1><p className="original">{movie.original_title}</p>
        <div className="chips"><span>★ {movie.vote_average.toFixed(1)}</span><span>{movie.release_date || "개봉일 미정"}</span><span>{runtime}</span></div>
        {movie.tagline && <blockquote>{movie.tagline}</blockquote>}
        <h2>줄거리</h2><p className="overview">{movie.overview || "줄거리 정보가 없습니다."}</p>
        <h2>장르</h2><p>{movie.genres.length ? movie.genres.map(g => g.name).join(", ") : "장르 정보가 없습니다."}</p>
      </div>
    </div></div>
  </section>;
}
