export const env = {
  apiBaseUrl: "/api/",
  tmdbApiBaseUrl: process.env.NEXT_PUBLIC_TMDB_API_BASE_URL || "https://api.themoviedb.org/3",
  tmdbAccessToken: process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN,
};

export function hasTmdbAccessToken() {
  return Boolean(env.tmdbAccessToken);
}
