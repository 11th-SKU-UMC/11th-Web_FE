# UMCINE — Next.js App Router

기존 영화 앱을 TanStack Router/Vite에서 Next.js 16.4.6으로 마이그레이션했습니다.

## 실행

```sh
pnpm install
cp .env.example .env.local # 최초 설정 시에만 실행
pnpm dev
```

`.env.local`에 `NEXT_PUBLIC_TMDB_API_BASE_URL`, `NEXT_PUBLIC_TMDB_ACCESS_TOKEN`, `NEXT_PUBLIC_API_BASE_URL`을 설정합니다. 기존 로컬 환경 변수의 이름도 새 접두사로 변경했습니다. `NEXT_PUBLIC_` 값은 브라우저 번들에 포함되므로 TMDB의 공개 클라이언트용 읽기 토큰만 사용합니다.

```sh
pnpm typecheck
pnpm lint
pnpm test:api
pnpm build
pnpm start
```

## 라우트와 컴포넌트 경계

| URL | App Router 페이지 |
| --- | --- |
| `/` | `src/app/(cinema)/page.tsx` |
| `/search?query=검색어&page=2` | `src/app/(cinema)/search/page.tsx` |
| `/movies/123` | `src/app/(cinema)/movies/[movieId]/page.tsx` |
| `/login` | `src/app/(account)/login/page.tsx` |
| `/signup` | `src/app/(account)/signup/page.tsx` |
| `/mypage` | `src/app/(account)/(protected)/mypage/page.tsx` |
| `/mypage/edit` | `src/app/(account)/(protected)/mypage/edit/page.tsx` |

- `layout.tsx`와 `page.tsx`는 Server Component입니다. 공통 화면과 메타데이터는 서버에서 구성합니다.
- `src/screens`의 상호작용 화면, 헤더, 버튼과 폼은 Client Component입니다. `src/pages`는 Next.js Pages Router와 충돌하지 않도록 이름을 바꿨습니다.
- `next/link`와 `next/navigation`의 `useRouter`, `usePathname`, `useSearchParams`, `useParams`로 링크, 이동, 활성 메뉴, URL 파라미터를 처리합니다. 페이지 번호는 기존과 같이 1~500으로 검증합니다.
- Cache Components를 활성화했습니다. URL 값을 읽는 화면과 헤더는 Suspense 안에 둡니다.
- React Query는 유지하고, Client Provider에서 QueryClient를 생성해 서버 요청 간 캐시 공유를 피합니다. 개발 도구는 개발 환경에서만 표시합니다.
- Zustand 저장소는 `skipHydration: true`로 생성합니다. `Providers`의 effect에서 브라우저 저장소를 복원하므로 SSR과 첫 렌더링이 같은 상태에서 시작합니다.
- 인증 경계는 저장소 복원 이후에 리다이렉트합니다. 비로그인 사용자의 보호 화면 접근과 401 이후에는 `/login`으로 이동하고, 로그인 사용자의 `/login` 접근은 `/`로 이동합니다. API 서버는 기존과 같이 실제 인증을 검증해야 합니다.
- Tailwind의 Vite 플러그인은 Turbopack 로더로, ESLint는 Next.js 설정으로 교체했습니다. 기존 이미지 레이아웃을 유지하기 위해 네이티브 `img`는 그대로 사용합니다.

## 검증 범위

`pnpm test:api`는 외부 서버나 실제 계정을 사용하지 않고 저장소 지연 복원, 페이지 번호 검증, 인증 헤더, 401 토큰 해제, 즐겨찾기/평점 CRUD 및 React Query 캐시 갱신을 확인합니다. 실제 회원 API 통합 검증에는 별도로 실행한 백엔드와 테스트 계정이 필요합니다.

마이그레이션 기준: [Next.js 공식 Vite 마이그레이션 가이드](https://nextjs.org/docs/app/guides/migrating/from-vite). 가이드의 SPA 유지 단계에서 더 나아가 기존 라우터를 App Router로 완전히 교체했습니다.
