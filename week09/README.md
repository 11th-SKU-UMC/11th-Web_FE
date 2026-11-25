# 9주차 프론트엔드 필수 미션
기존 UMCine 소스가 없는 상태에서 만든 Next.js App Router 마이그레이션 예제입니다. 기존 기능 전체를 옮겼다는 의미는 아닙니다. 영화 데이터와 즐겨찾기는 로컬 예시이며 실제 평점, 회원가입, 서버 즐겨찾기, 기존 API 및 UI는 원본을 확보해 이식해야 합니다. 로그인은 기존 Spring Boot API 주소 및 응답 구조가 일치할 때 동작합니다. sessionStorage는 실습용이며 운영 인증 정책에 맞게 변경해야 합니다.

## 실행
Node.js 20.9 이상에서 `npm install`, `npm run dev` (localhost:3000), `npm run build` 실행. pnpm 사용 시 `pnpm install`, `pnpm dev`, `pnpm build`. 로그인은 .env.example을 .env.local로 복사하고 API 서버 및 CORS를 설정합니다. 외부 포스터 이미지는 네트워크 연결 필요.

## 마이그레이션 대응
- index.tsx → page.tsx, route.tsx → layout.tsx, $id.tsx → [id]/page.tsx
- Link to → next/link href, useNavigate → useRouter().push/replace, useParams → 서버 params 또는 next/navigation useParams
- RouterProvider 제거, TanStack Query Provider는 Client Component로 분리
- import.meta.env.VITE_* → process.env.NEXT_PUBLIC_* (공개 값만), 브라우저 저장소는 useEffect/이벤트에서 접근
- 영화 목록/상세는 Server Component, 즐겨찾기 버튼/로그인은 Client Component
- 실제 API 연결 시 서버 fetch와 기존 클라이언트 Query 사용을 기능별로 선택

## 검증 체크리스트 (미실행)
- [ ] 영화 목록 → 상세 이동 및 주소 직접 접근
- [ ] 즐겨찾기 등록/해제 및 새로고침 유지
- [ ] 로그인 API 연결 및 이동
- [ ] 빌드 성공 및 브라우저 콘솔 오류 없음
- [ ] 원본 UMCine 기능 전체 대조 및 이식

## 참고
https://nextjs.org/docs/app/getting-started/server-and-client-components
https://nextjs.org/docs/app/guides/migrating/from-vite
