# UMCINE — Week 03 Mission

2주차 영화 페이지를 3주차 요구사항에 맞게 TanStack Router + Tailwind CSS 구조로 옮긴 프로젝트입니다.

## 구현 내용

- `/` 영화 목록
- `/search?query=...` 영화 검색
- `/movies/$movieId` 영화 상세
- 검색어가 없을 때 `검색어를 입력해 주세요.`
- 검색 결과가 없을 때 `검색 결과가 없어요.`
- 잘못된 영화 ID일 때 `영화를 찾을 수 없어요.`
- 영화 카드/검색 결과에서 상세 페이지로 이동
- 상세 URL 직접 접속 및 새로고침을 위한 라우트 구성
- Tailwind CSS 유틸리티 클래스 기반 스타일링
- `cn` 유틸리티를 이용한 북마크 상태별 클래스
- 반응형 영화 그리드

## 실행

```bash
pnpm install
pnpm dev
```

검증:

```bash
pnpm build
```

## 참고

원본 ZIP의 영화 이미지가 `public/umcine-images/images/movies`에 들어 있어, 3주차에서 사용하는 `public/images/movies` 경로로 옮겨 두었습니다.

또한 제공된 Figma 링크는 작업 환경에서 내용을 읽어올 수 없어, 이번 구현은 제공된 3주차 워크북의 화면 요구사항과 기존 2주차 코드 구조를 기준으로 구성했습니다.
