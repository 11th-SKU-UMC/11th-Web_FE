import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { movieQueries } from "../api/movies/movie-query-options";
import { MovieCard } from "../components/movie-card";
import { Pagination } from "../components/pagination";
import { StatusView } from "../components/status-view";
import { toMovieCard } from "../utils/movies/movie-adapter";
import { parsePage } from "../utils/movies/page-param";

export function MovieListPage() {
  const [searchParams] = useSearchParams();
  const page = parsePage(searchParams.get("page"));
  const moviesQuery = useQuery(movieQueries.list(page));
  const movies = moviesQuery.data?.results ?? [];
  return <section className="page">
    <div className="page-heading"><div><span className="eyebrow">DISCOVER</span><h1>지금 인기 있는 영화</h1><p>TMDB에서 제공하는 인기 영화 목록</p></div></div>
    {moviesQuery.isPending ? <StatusView status="loading"/> :
      moviesQuery.isError ? <StatusView status="error" message={moviesQuery.error.message} retry={() => { void moviesQuery.refetch(); }}/> :
      movies.length === 0 ? <StatusView status="empty"/> : <>
        <div className="movie-grid">{movies.map(movie => <MovieCard key={movie.id} movie={toMovieCard(movie)}/>)}</div>
        <Pagination page={page} totalPages={moviesQuery.data.total_pages}/>
      </>}
  </section>;
}
