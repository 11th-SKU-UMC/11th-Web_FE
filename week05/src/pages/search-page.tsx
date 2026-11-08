import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../api/movies/search-movies";
import type { TmdbMovieListResponse } from "../api/movies/models";
import { MovieCard } from "../components/movie-card";
import { Pagination } from "../components/pagination";
import { StatusView } from "../components/status-view";
import { toMovieCard } from "../utils/movies/movie-adapter";
import { parsePage } from "../utils/movies/page-param";

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("query") || "").trim();
  const page = parsePage(searchParams.get("page"));
  const [data, setData] = useState<TmdbMovieListResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  useEffect(() => {
    let ignore = false;
    setData(null); setError(null);
    if (!query) { setLoading(false); return () => { ignore = true; }; }
    setLoading(true);
    searchMovies({ query, page }).then(response => { if (!ignore) setData(response); })
      .catch(() => { if (!ignore) setError("검색 결과를 불러오지 못했어요."); })
      .finally(() => { if (!ignore) setLoading(false); });
    return () => { ignore = true; };
  }, [query, page, retryCount]);
  return <section className="page"><div className="page-heading"><div><span className="eyebrow">SEARCH</span><h1>영화 검색</h1><p>{query ? `“${query}” 검색 결과` : "상단 검색창에 영화 제목을 입력하세요."}</p></div></div>
    {!query ? <StatusView status="empty" message="영화 제목을 입력하면 검색할 수 있어요."/> : loading ? <StatusView status="loading"/> : error ? <StatusView status="error" message={error} retry={() => setRetryCount(n => n + 1)}/> : !data?.results.length ? <StatusView status="empty" message="검색 결과가 없어요. 다른 검색어로 시도해 보세요."/> : <>
      <div className="result-count">총 {data.total_results.toLocaleString()}개 결과</div>
      <div className="movie-grid">{data.results.map(movie => <MovieCard key={movie.id} movie={toMovieCard(movie)}/>)}</div>
      <Pagination page={page} totalPages={data.total_pages}/>
    </>}
  </section>;
}
