import { MovieDetailPage } from "../../../views/movies/movie-detail-page";

interface MovieRouteProps {
  params: Promise<{ movieId: string }>;
}

export default async function MovieRoute({ params }: MovieRouteProps) {
  const { movieId } = await params;
  return <MovieDetailPage movieId={movieId} />;
}