const POSTER_BASE = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE = "https://image.tmdb.org/t/p/w1280";
export const getTmdbPosterUrl = (path: string | null) => path ? `${POSTER_BASE}${path}` : null;
export const getTmdbBackdropUrl = (path: string | null) => path ? `${BACKDROP_BASE}${path}` : null;
