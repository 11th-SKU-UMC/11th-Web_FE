# UMCine 5주차 미션 — React + TypeScript + TMDB API

이번 프로젝트는 첨부된 **프론트엔드 5주차 워크북**의 필수 미션 및 선택 미션을 구현한 독립 실행형 예제입니다. 기존 4주차 프로젝트 원본을 제공받지 않았으므로, 동일한 UI를 재현한 것이 아니라 새 UI로 구성했습니다.

## 실행

```bash
# Node.js 20 이상 권장
corepack enable
pnpm install
cp .env.example .env.local
# .env.local의 VITE_TMDB_ACCESS_TOKEN 값을 실제 TMDB API Read Access Token으로 수정
pnpm dev
```

- 개발 서버: http://localhost:5173
- 빌드: `pnpm build`
- `.env.local`은 Git에 올리지 않습니다.
- **주의**: Vite의 `VITE_` 환경 변수는 브라우저 번들에 노출됩니다. 워크북의 학습 목적을 위한 설정이며 운영 환경에서는 비밀 API 토큰을 백엔드/프록시에 저장하세요.
- 실행 전에 TMDB 개인 API Read Access Token이 반드시 필요합니다. 토큰을 제공받지 못했기 때문에 실제 API 응답은 여기서 검증하지 못했습니다.

## 구현 요구사항 매핑

| 요구사항 | 파일 |
|---|---|
| 순수 fetch로 인기 영화 요청 | `src/api/movies/get-movies-with-fetch.ts`, `src/examples/fetch-movies.ts` |
| ky 공통 인스턴스 | `src/api/tmdb-client.ts` |
| 인기 영화 목록 API | `src/api/movies/get-movies.ts` |
| 영화 검색 API | `src/api/movies/search-movies.ts` |
| 영화 상세 API | `src/api/movies/get-movie-detail.ts` |
| TMDB TypeScript 타입 | `src/api/movies/models.ts` |
| 목록/검색/상세 화면 | `src/pages/` |
| 로딩/오류/빈 결과/성공 화면 | `src/components/status-view.tsx`, `src/pages/` |
| 검색/상세 URL 직접 접근 및 새로고침 | React Router의 `/search?query=...`, `/movies/:movieId` |
| TMDB 출처 표기 | `src/main.tsx` 하단 Footer |
| 선택: 재시도 | `src/components/status-view.tsx` 및 각 페이지의 `retryCount` |
| 선택: page search param | `src/components/pagination.tsx`, `src/utils/movies/page-param.ts` |
| 선택: adapter | `src/utils/movies/movie-adapter.ts` |

## 필수 인증 방법

1. `.env.local`에 유효한 토큰을 입력하고 `pnpm dev` 실행.
2. **순수 fetch 실습**: `src/main.tsx`의 `// import "./examples/fetch-movies";` 주석을 해제하고 새로고침. F12 → Network → `/movie/popular` 요청 URL, status 200, language=ko-KR, page=1 및 `results` 응답 확인 후 주석 복원.
3. **목록**: `/` 화면에 실제 TMDB 카드 출력, 로딩 상태 캡처.
4. **검색**: `/search?query=인셉션&page=1` 직접 접속, 검색 카드/Network 요청 캡처.
5. **상세**: `/movies/550` 직접 접속, 개봉일/평점/장르/줄거리 및 Network 요청 캡처.
6. **오류**: `/movies/999999999`에서 404 메시지, 잘못된 토큰에서 오류 및 `다시 시도` 버튼 확인.
7. **빈 결과**: 존재하지 않는 검색어로 검색 후 빈 화면 안내 확인.
8. **페이지네이션**: 목록 또는 검색 화면에서 다음 페이지 클릭하고 URL의 `page` 및 Network의 page 값 확인.
9. 새로고침과 Console 확인, `pnpm build` 실행.
10. 위 화면과 핵심 코드 캡처 후 Notion 미션 기록에 첨부.

> 인증 캡처는 실제 토큰과 브라우저가 필요한 작업이므로 포함하지 않았습니다. 위 경로로 직접 캡처해 주세요.

## 학습 참고

`fetch`는 HTTP 401/404/500만으로 reject하지 않으므로 `response.ok`를 검사했습니다. ky는 HTTP 오류를 기본적으로 throw합니다. Effects는 정리 함수의 ignore 플래그로 이전 응답이 현재 화면을 덮어쓰지 않도록 구성했습니다. React StrictMode의 개발 환경에서는 이펙트가 추가 실행될 수 있습니다.

## 제출용 미션 기록 초안

**필수 미션**: `getMoviesWithFetch`로 TMDB의 `/movie/popular`를 직접 요청하고 `response.ok`를 확인하는 오류 처리를 작성했다. ky 인스턴스에 공통 URL과 인증 헤더를 적용하고 목록/검색/상세 API를 함수로 분리했다. React Router와 Effect로 각 화면에 실시간 데이터를 연결하고 로딩·오류·빈 결과·성공 상태를 분기했다. 하단에 TMDB 출처를 표기했다. (실제 요청 및 빌드 성공 여부는 본인 PC에서 실행 후 기록)

**선택 미션**: 오류 상태에서 마지막 요청을 다시 실행하는 버튼을 추가했다. `page`를 URL Search Parameter로 관리하고 TMDB의 `page` 쿼리에 전달했다. `toMovieCard` 어댑터로 TMDB 응답 필드를 UI 카드 전용 타입으로 변환했다.
