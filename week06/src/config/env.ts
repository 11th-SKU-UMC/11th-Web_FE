const tmdbApiBaseUrl = import.meta.env.VITE_TMDB_API_BASE_URL;
const tmdbAccessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

export const env = { tmdbApiBaseUrl, tmdbAccessToken };
export function assertTmdbConfig() {
  if (!tmdbApiBaseUrl || !tmdbAccessToken || tmdbAccessToken.includes("여기에_")) {
    throw new Error(".env.local에 TMDB API Read Access Token을 설정해주세요.");
  }
}
