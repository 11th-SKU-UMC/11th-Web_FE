import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { movieQueries } from "../api/movies/movie-query-options";
import { MovieCard } from "../components/movie-card";
import { Pagination } from "../components/pagination";
import { StatusView } from "../components/status-view";
import { toMovieCard } from "../utils/movies/movie-adapter";
import { parsePage } from "../utils/movies/page-param";

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("query") ?? "").trim();
  const page = parsePage(searchParams.get("page"));
  const searchQuery = useQuery(movieQueries.search(query, page));
  const movies = searchQuery.data?.results ?? [];
  return <section className="page">
    <div className="page-heading"><div><span className="eyebrow">SEARCH</span><h1>영화 검색</h1><p>{query ? `“${query}” 검색 결과` : "상단 검색창에 영화 제목을 입력하세요."}</p></div></div>
    {!query ? <StatusView status="empty" message="영화 제목을 입력하면 검색할 수 있어요."/> :
      searchQuery.isLoading ? <StatusView status="loading"/> :
      searchQuery.isError ? <StatusView status="error" message={searchQuery.error.message} retry={() => { void searchQuery.refetch(); }}/> :
      searchQuery.isSuccess && movies.length === 0 ? <StatusView status="empty" message="검색 결과가 없어요. 다른 검색어로 시도해 보세요."/> : <>
        <div className="result-count">총 {searchQuery.data?.total_results.toLocaleString() ?? "0"}개 결과</div>
        <div className="movie-grid">{movies.map(movie => <MovieCard key={movie.id} movie={toMovieCard(movie)}/>)}</div>
        <Pagination page={page} totalPages={searchQuery.data?.total_pages ?? 0}/>
      </>}
  </section>;
}
