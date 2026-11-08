# UMCine 6주차 — 핵심 키워드 및 미션 제출용 정리

## 핵심 키워드 1. Query Key와 요청 상태

**Q. 목록, 검색, 상세에 같은 query key를 사용하면?**  서로 다른 응답이 같은 캐시에 들어가 목록·검색·상세가 잘못된 데이터를 공유할 수 있다. 요청 결과를 결정하는 페이지 번호, 검색어, 영화 ID를 key에 포함해야 한다.

```ts
["movies", "list", { page: 1 }]
["movies", "search", { query: "인셉션", page: 1 }]
["movies", "detail", 550]
```

**Q. `enabled: false`인데 `isPending`이 true인 이유?**  `isPending`은 아직 성공한 데이터가 없는 초기 상태일 수 있다는 뜻이다. 캐시가 없고 자동 호출이 비활성화되어 있으면 `isPending: true`, `isFetching: false`, `isLoading: false`가 된다. `isLoading = isPending && isFetching`이기 때문이다. 따라서 빈 검색어에서는 로딩을 띄우지 않고 안내 문구를 먼저 보여준다.

## 핵심 키워드 2. 캐시 수명과 재조회

**Q. `staleTime`과 `gcTime`의 차이는?**  `staleTime`은 성공적으로 데이터를 갱신한 시점을 기준으로 캐시를 신선하다고 보는 시간이다. 만료되면 stale이 되지만 즉시 삭제되거나 즉시 재조회되는 것은 아니다. `gcTime`은 해당 쿼리에 활성 구독자가 없어졌을 때 시작하는, 비활성 캐시의 삭제 대기 시간이다. 기본 staleTime은 0ms이고 브라우저의 기본 gcTime은 5분이다. 캐시가 사라졌다면 해당 쿼리를 다시 사용할 때 새 요청이 필요하다.

**Q. 전역/개별 staleTime 기준은?**  일반적인 데이터 변경 속도에 따라 전역값을 정하고, 데이터 종류별로 예외를 준다. 이 미션에서는 전역 1분, 상세 30초를 적용해 다른 종류의 캐시 신선도 설정을 비교한다. 데이터가 자주 변하거나 실시간성이 중요할수록 짧게, 변동이 적으면 길게 정한다.

## 필수 미션

- `QueryClientProvider`로 앱에 캐시 제공, `ReactQueryDevtools` 연결.
- `useQuery`를 이용해 목록·검색·상세 데이터 조회.
- `queryKey`를 화면 및 요청 변수별로 구분.
- 화면에 초기 로딩/에러/빈 결과/성공 상태 표현.
- `staleTime` 전역 60초, 상세 30초 설정.
- 페이지 1 → 2 → 1 이동 중 캐시 재사용을 Devtools와 Network에서 확인하도록 준비.

## 선택 미션

`src/api/movies/movie-query-options.ts`에서 `queryOptions`로 key와 요청 함수를 한 곳에서 관리한다. 페이지 컴포넌트는 `useQuery(movieQueries.list(page))`처럼 간결하게 작성할 수 있다.

## 실제 실습 결과 및 스크린샷

**실행 및 캡처 필요:** 개인 TMDB 토큰으로 브라우저를 실행해야 확인 가능하다. 확인하지 않은 결과나 가상의 스크린샷을 제출 결과로 기재하지 않는다.
