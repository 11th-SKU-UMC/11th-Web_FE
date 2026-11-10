import { Link } from "@tanstack/react-router";

// 8주차에서 내 정보 조회 API로 교체
const DUMMY_USER = { nickname: "레니", email: "umc@example.com" };
const DUMMY_LIKED_MOVIES = [
  { id: 1, title: "영화 제목 1", releaseDate: "2025-01-15" },
  { id: 2, title: "영화 제목 2", releaseDate: "2025-03-02" },
  { id: 3, title: "영화 제목 3", releaseDate: "2025-07-20" },
];

export function MyPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">내 정보</h1>
        <Link
          to="/me/edit"
          className="rounded-md bg-blue-600 px-3 py-2 text-xs font-semibold text-white"
        >
          정보 수정
        </Link>
      </div>

      {/* 기본 정보 */}
      <section className="border-b border-gray-200 pb-8">
        <h2 className="mb-4 text-sm font-semibold">기본 정보</h2>
        <div className="flex items-center gap-6">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gray-200">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-gray-500">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21a8 8 0 0 1 16 0z" />
            </svg>
          </div>
          <dl className="grid flex-1 grid-cols-2 gap-4">
            <div>
              <dt className="text-xs text-gray-400">닉네임</dt>
              <dd className="mt-1 text-sm font-semibold">{DUMMY_USER.nickname}</dd>
            </div>
            <div>
              <dt className="text-xs text-gray-400">이메일</dt>
              <dd className="mt-1 text-sm font-semibold">{DUMMY_USER.email}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* 좋아요한 영화 */}
      <section className="pt-8">
        <h2 className="mb-4 text-sm font-semibold">내 좋아요 영화</h2>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
          {DUMMY_LIKED_MOVIES.map((movie) => (
            <li key={movie.id}>
              <div className="aspect-[2/3] rounded-lg bg-gray-200" />
              <p className="mt-2 truncate text-sm font-semibold">{movie.title}</p>
              <p className="text-xs text-gray-400">{movie.releaseDate}</p>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex justify-center">
          <button type="button" className="h-8 w-8 rounded-md bg-gray-900 text-xs font-semibold text-white">
            1
          </button>
        </div>
      </section>
    </main>
  );
}