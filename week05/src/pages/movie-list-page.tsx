import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getMovies } from "../api/movies/get-movies";
import type { TmdbMovieListResponse } from "../api/movies/models";
import { MovieCard } from "../components/movie-card";
import { Pagination } from "../components/pagination";
import { StatusView } from "../components/status-view";
import { toMovieCard } from "../utils/movies/movie-adapter";
import { parsePage } from "../utils/movies/page-param";

export function MovieListPage() {
  const [searchParams] = useSearchParams();
  const page = parsePage(searchParams.get("page"));
  const [data, setData] = useState<TmdbMovieListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  useEffect(() => {
    let ignore = false;
    setLoading(true); setError(null); setData(null);
    getMovies({ page }).then((response) => { if (!ignore) setData(response); })
      .catch((err: unknown) => { if (!ignore) setError(err instanceof Error ? err.message : "영화 목록을 불러오지 못했어요."); })
      .finally(() => { if (!ignore) setLoading(false); });
    return () => { ignore = true; };
  }, [page, retryCount]);
  return <section className="page"><div className="page-heading"><div><span className="eyebrow">DISCOVER</span><h1>지금 인기 있는 영화</h1><p>TMDB에서 제공하는 실시간 인기 영화 목록</p></div></div>
    {loading ? <StatusView status="loading"/> : error ? <StatusView status="error" message={error} retry={() => setRetryCount(n => n + 1)}/> : !data?.results.length ? <StatusView status="empty"/> : <>
      <div className="movie-grid">{data.results.map(movie => <MovieCard key={movie.id} movie={toMovieCard(movie)}/>)}</div>
      <Pagination page={page} totalPages={data.total_pages}/>
    </>}
  </section>;
}
