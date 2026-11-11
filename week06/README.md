# UMCine 6주차 — TanStack Query 미션 (React + TypeScript)

기존 5주차 프로젝트를 바탕으로 수정했습니다. **기존 프로젝트가 React Router를 사용하므로 라우팅은 유지**하고, 데이터 조회만 TanStack Query로 변경했습니다. 워크북의 TanStack Router `useSearch` 예시와 달리 이 프로젝트에서는 React Router `useSearchParams`를 사용합니다.

## 실행

```bash
pnpm install
cp .env.example .env.local
# .env.local에 TMDB API Read Access Token 설정
pnpm dev
pnpm build
```

`VITE_` 환경 변수는 브라우저에 노출됩니다. 학습용으로만 사용하고 실제 비밀 키는 백엔드에서 관리하세요. `.env.local`은 Git에 올리지 마세요.

## 구현 미션

- **필수**: `src/main.tsx`에서 QueryClientProvider, Query Devtools 연결. 기본 staleTime 1분, gcTime 5분.
- **필수**: 영화 목록 `src/pages/movie-list-page.tsx`는 페이지별 query key 사용.
- **필수**: 검색 `src/pages/search-page.tsx`는 검색어·페이지별 query key, 검색어가 비면 `enabled:false`.
- **필수**: 상세 `src/pages/movie-detail-page.tsx`는 영화 ID별 query key, 유효 ID일 때만 실행하며 staleTime 30초.
- **필수**: 로딩, 오류, 빈 결과, 성공 화면 구분. 오류 시 재시도 버튼 유지.
- **선택**: `src/api/movies/movie-query-options.ts`에 `queryOptions`로 세 쿼리의 key/fn/설정 통합.

## 검증 및 캡처 (직접 실행 필요)

1. `http://localhost:5173/?page=1` → `?page=2` → `?page=1`로 이동. Devtools에 `['movies','list',{page:1}]` 등 별도 쿼리 존재 확인.
2. 각 페이지를 1분 이내 다시 열 때 Network에서 불필요한 재요청이 없는지 확인(앱 내 라우팅으로 이동해야 메모리 캐시 유지).
3. `http://localhost:5173/search?query=인셉션` 검색 후 다른 검색어 입력. 검색어별 캐시 확인.
4. `/search` 빈 검색 시 Network에서 `search/movie` 요청이 발생하지 않는지 확인.
5. `http://localhost:5173/movies/550` 접속 후 상세 쿼리 30초 경과 시 Devtools의 fresh/stale 확인.
6. `/movies/abc` 접근 시 유효하지 않은 영화 번호 메시지 확인. 토큰을 잘못 설정하는 오류 재현은 테스트 후 복구.
7. `pnpm build`로 빌드 확인.

이 결과와 브라우저 캡처는 자동 생성된 것이 아니며 사용자 환경에서 확인해야 합니다.
