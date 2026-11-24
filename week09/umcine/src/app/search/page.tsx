import { SearchPage } from "../../views/movies/search-page";

interface SearchRouteProps {
  searchParams: Promise<{ query?: string }>;
}

export default async function SearchRoute({ searchParams }: SearchRouteProps) {
  const { query } = await searchParams;
  return <SearchPage query={typeof query === "string" ? query : undefined} />;
}