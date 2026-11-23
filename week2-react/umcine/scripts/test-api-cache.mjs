import assert from "node:assert/strict";
import { QueryClient, QueryObserver } from "@tanstack/react-query";

// 실제 서버·계정 대신 같은 요청/응답 계약을 사용하는 메모리 서버로 검증해요.
process.env.NEXT_PUBLIC_API_BASE_URL = "http://localhost:8080";
process.env.NEXT_PUBLIC_TMDB_API_BASE_URL = "https://api.themoviedb.org/3";
process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN = "test";
const storage = new Map();
globalThis.localStorage = {
  getItem: (key) => storage.get(key) ?? null,
  setItem: (key, value) => storage.set(key, value),
  removeItem: (key) => storage.delete(key),
};
const alerts = [];
globalThis.alert = (message) => alerts.push(message);
const requests = [];
let favorites = [];
let ratings = [
  { ratingId: 2, movieId: 20, score: 3, comment: "", createdAt: "2026-11-16", updatedAt: "2026-11-16" },
  { ratingId: 1, movieId: 10, score: 4, comment: "old page", createdAt: "2026-11-15", updatedAt: "2026-11-15" },
];
let failNext = 0;
globalThis.fetch = async (input) => {
  const request = input instanceof Request ? input : new Request(input);
  const url = new URL(request.url);
  const path = url.pathname;
  const body = request.method === "GET" || request.method === "DELETE" ? undefined : await request.json();
  requests.push({ method: request.method, path, body, auth: request.headers.get("Authorization") });
  if (failNext) {
    const status = failNext;
    failNext = 0;
    return Response.json({ isSuccess: false, code: String(status), message: "test error", result: null }, { status });
  }
  let result;
  if (path === "/auth/login") result = { nickname: "테스터", accessToken: "test-token" };
  else if (path === "/members") result = { memberId: 1, email: body.email, nickname: body.nickname };
  else if (path === "/favorites" && request.method === "GET") result = favorites;
  else if (path === "/favorites" && request.method === "POST") {
    result = { favoriteId: 1, movieId: body.movieId, createdAt: "2026-11-16" };
    favorites = [result, ...favorites];
  } else if (path.startsWith("/favorites/")) {
    const movieId = Number(path.split("/").at(-1));
    if (request.method === "DELETE") {
      favorites = favorites.filter((item) => item.movieId !== movieId);
      result = null;
    } else result = { movieId, isFavorite: favorites.some((item) => item.movieId === movieId) };
  } else if (/\/members\/\d+\/ratings/.test(path)) {
    // 두 번째 페이지에 있는 기존 평점도 찾아야 해요.
    const page = Number(url.searchParams.get("page"));
    return Response.json({ content: ratings.slice(page, page + 1), page, size: 1, totalElements: ratings.length, totalPages: ratings.length });
  } else if (path === "/ratings" && request.method === "POST") {
    result = { ratingId: 3, ...body, createdAt: "2026-11-16", updatedAt: "2026-11-16" };
    ratings = [result, ...ratings];
  } else if (path.startsWith("/ratings/")) {
    const ratingId = Number(path.split("/").at(-1));
    if (request.method === "DELETE") {
      ratings = ratings.filter((item) => item.ratingId !== ratingId);
      result = null;
    } else {
      ratings = ratings.map((item) => item.ratingId === ratingId ? { ...item, ...body } : item);
      result = ratings.find((item) => item.ratingId === ratingId);
    }
  } else throw new Error(`Unexpected request: ${request.method} ${path}`);
  return Response.json({ isSuccess: true, code: "COMMON200", message: "성공", result });
};

const loadModule = (path) => import(new URL(`..${path}`, import.meta.url));
const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
const unsubscribe = [];
const count = (method, path) => requests.filter((item) => item.method === method && item.path === path).length;
try {
  const { useAuthStore } = await loadModule("/src/stores/auth-store.ts");
  // 자동 복원을 막아 서버 HTML과 첫 클라이언트 렌더링을 동일하게 유지해요.
  storage.set("umcine-auth-store", JSON.stringify({ state: { accessToken: "restored-token" }, version: 0 }));
  assert.equal(useAuthStore.getState().accessToken, null);
  assert.equal(useAuthStore.persist.hasHydrated(), false);
  await useAuthStore.persist.rehydrate();
  assert.equal(useAuthStore.getState().accessToken, "restored-token");
  const { parsePage } = await loadModule("/src/utils/movies/parse-page.ts");
  for (const invalid of [null, "", "0", "-1", "1.5", "501", "NaN"]) assert.equal(parsePage(invalid), 1);
  assert.equal(parsePage("500"), 500);
  const { loginMutationOptions, signupMutationOptions } = await loadModule("/src/api/auth/auth-mutation-options.ts");
  const { favoritesQueryOptions, favoriteStatusQueryOptions, favoriteKeys } = await loadModule("/src/api/favorites/favorite-query-options.ts");
  const { favoriteMutationOptions } = await loadModule("/src/api/favorites/favorite-mutation-options.ts");
  const { memberRatingsQueryOptions, ratingKeys } = await loadModule("/src/api/ratings/rating-query-options.ts");
  const { ratingMutationOptions } = await loadModule("/src/api/ratings/rating-mutation-options.ts");
  const execute = (options, body) => client.getMutationCache().build(client, options).execute(body);
  useAuthStore.getState().setAccessToken("test-token");
  assert.equal(JSON.parse(storage.get("umcine-auth-store")).state.accessToken, "test-token");
  await execute(loginMutationOptions(), { email: "test@example.com", password: "Password1!" });
  assert.equal(requests.at(-1).auth, null);
  await execute(signupMutationOptions(), { email: "test@example.com", nickname: "테스터", password: "Password1!" });
  assert.equal(requests.at(-1).auth, null);

  const listOptions = favoritesQueryOptions(1);
  unsubscribe.push(new QueryObserver(client, listOptions).subscribe(() => {}));
  await client.fetchQuery(listOptions);
  await client.fetchQuery(favoriteStatusQueryOptions(1, 10));
  const listBefore = count("GET", "/favorites");
  const statusBefore = count("GET", "/favorites/10");
  await execute(favoriteMutationOptions(client, 1, 10), { movieId: 10, isFavorite: false });
  assert.equal(client.getQueryData(favoriteKeys.status(1, 10)).isFavorite, true);
  assert.equal(client.getQueryData(favoriteKeys.list(1))[0].movieId, 10);
  assert.equal(count("GET", "/favorites"), listBefore + 1, "invalidateQueries는 활성 목록을 다시 조회해야 함");
  assert.equal(count("GET", "/favorites/10"), statusBefore, "setQueryData는 단건 GET을 추가하지 않아야 함");
  assert.equal(requests.find((item) => item.method === "POST" && item.path === "/favorites").auth, "Bearer test-token");
  assert.equal(client.getQueryData(favoriteKeys.list(2)), undefined, "회원별 캐시를 분리해야 함");
  await execute(favoriteMutationOptions(client, 1, 10), { movieId: 10, isFavorite: true });
  assert.equal(client.getQueryData(favoriteKeys.status(1, 10)).isFavorite, false);
  assert.deepEqual(client.getQueryData(favoriteKeys.list(1)), []);

  const ratingsOptions = memberRatingsQueryOptions(1);
  unsubscribe.push(new QueryObserver(client, ratingsOptions).subscribe(() => {}));
  const initialRatings = await client.fetchQuery(ratingsOptions);
  assert.equal(initialRatings.find((item) => item.movieId === 10).ratingId, 1);
  const ratingsBefore = count("GET", "/members/1/ratings");
  await execute(ratingMutationOptions(client, 1), { action: "create", movieId: 30, body: { score: 5, comment: "좋아요" } });
  assert.ok(count("GET", "/members/1/ratings") > ratingsBefore);
  assert.equal(client.getQueryData(ratingKeys.member(1)).find((item) => item.movieId === 30).score, 5);
  await execute(ratingMutationOptions(client, 1), { action: "update", ratingId: 3, body: { score: 2, comment: "수정" } });
  assert.equal(client.getQueryData(ratingKeys.member(1)).find((item) => item.ratingId === 3).score, 2);
  await execute(ratingMutationOptions(client, 1), { action: "delete", ratingId: 3 });
  assert.equal(client.getQueryData(ratingKeys.member(1)).some((item) => item.ratingId === 3), false);

  failNext = 400;
  await assert.rejects(execute(favoriteMutationOptions(client, 1, 10), { movieId: 10, isFavorite: false }));
  assert.equal(client.getQueryData(favoriteKeys.status(1, 10)).isFavorite, false);
  assert.equal(alerts.at(-1), "즐겨찾기 변경에 실패했어요. 다시 시도해 주세요.");
  failNext = 401;
  const before401 = count("GET", "/favorites/99");
  await assert.rejects(client.fetchQuery(favoriteStatusQueryOptions(1, 99)));
  assert.equal(count("GET", "/favorites/99"), before401 + 1);
  assert.equal(useAuthStore.getState().accessToken, null);
  assert.equal(JSON.parse(storage.get("umcine-auth-store")).state.accessToken, null);
  console.log("PASS: 저장소 지연 복원·페이지 검증, 인증 헤더·토큰 저장/401, 즐겨찾기 CRUD, 회원별 캐시, setQueryData 추가 GET 없음, invalidateQueries 재조회, 평점 페이지/CRUD, 실패 처리");
} finally {
  unsubscribe.forEach((stop) => stop());
  client.clear();
}
