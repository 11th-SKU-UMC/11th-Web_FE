import { MovieListPage } from "../views/movies/movie-list-page";

interface HomeProps {
  searchParams: Promise<{ page?: string }>;
}

function parsePage(value?: string) {
  const page = Number(value);
  return Number.isInteger(page) && page > 0 && page <= 500 ? page : undefined;
}

export default async function Home({ searchParams }: HomeProps) {
  const { page } = await searchParams;
  return <MovieListPage page={parsePage(page)} />;
}