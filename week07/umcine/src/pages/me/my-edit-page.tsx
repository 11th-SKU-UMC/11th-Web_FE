import { useState } from "react";

// 8주차에서 내 정보 조회 API로 교체
const DUMMY_USER = { nickname: "레니", email: "umc@example.com" };

const INPUT_CLASS =
  "h-11 w-full rounded-md border border-gray-200 bg-white px-3 text-sm outline-none focus:border-blue-600 disabled:bg-gray-50 disabled:text-gray-400";
const LABEL_CLASS = "mb-1.5 block text-sm font-semibold";

export function MyEditPage() {
  const [nickname, setNickname] = useState(DUMMY_USER.nickname);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const isNicknameValid = nickname.trim().length >= 2 && nickname.trim().length <= 12;
  const isChanged = nickname.trim() !== DUMMY_USER.nickname || previewUrl !== null;
  const canSave = isNicknameValid && isChanged;

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSave) return;
    // 8주차에서 내 정보 수정 API 연결
    alert(`변경할 닉네임: ${nickname.trim()}`);
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-10 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">내 정보 수정</h1>
            <p className="mt-1 text-xs text-gray-400">닉네임과 프로필 이미지를 변경할 수 있어요.</p>
          </div>
          <button
            type="submit"
            disabled={!canSave}
            className="rounded-md bg-blue-600 px-3 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            변경사항 저장
          </button>
        </div>

        <div className="grid gap-10 md:grid-cols-[240px_1fr]">
          {/* 프로필 이미지 */}
          <div className="flex flex-col items-center">
            <label className="relative cursor-pointer">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                {previewUrl ? (
                  <img src={previewUrl} alt="프로필 미리보기" className="h-full w-full object-cover" />
                ) : (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-12 w-12 text-gray-500">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21a8 8 0 0 1 16 0z" />
                  </svg>
                )}
              </div>
              <span className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white text-xs">
                ✎
              </span>
              <input type="file" accept="image/png, image/jpeg" onChange={handleChangeImage} className="hidden" />
            </label>
            <p className="mt-3 text-sm font-semibold">프로필 이미지</p>
            <p className="text-xs text-gray-400">JPG, PNG</p>
          </div>

          {/* 입력 */}
          <div className="space-y-4">
            <div>
              <label htmlFor="nickname" className={LABEL_CLASS}>닉네임</label>
              <div className="relative">
                <input
                  id="nickname"
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className={`${INPUT_CLASS} pr-20`}
                />
                <button
                  type="button"
                  disabled={!isNicknameValid}
                  onClick={() => alert("8주차에서 중복 확인 연결")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-blue-600 disabled:cursor-not-allowed"
                >
                  중복 확인
                </button>
              </div>
              {!isNicknameValid && (
                <p className="mt-1.5 text-xs text-red-500">닉네임은 2~12자로 입력해 주세요.</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className={LABEL_CLASS}>이메일</label>
              <input id="email" type="email" value={DUMMY_USER.email} disabled className={INPUT_CLASS} />
            </div>
          </div>
        </div>

        {/* 회원 탈퇴 */}
        <div className="mt-24 flex items-center justify-between rounded-lg border border-red-200 bg-red-50 p-4">
          <div>
            <p className="text-sm font-semibold text-red-600">회원 탈퇴</p>
            <p className="mt-1 text-xs text-red-400">탈퇴하면 계정 정보와 좋아요 목록이 삭제되며 복구할 수 없어요.</p>
          </div>
          <button
            type="button"
            onClick={() => confirm("정말 탈퇴할까요?") && alert("8주차 이후 연결")}
            className="h-8 rounded-md border border-red-300 bg-white px-3 text-xs font-semibold text-red-600"
          >
            회원 탈퇴
          </button>
        </div>
      </form>
    </main>
  );
}