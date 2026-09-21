import { useState } from "react";
import { Icon } from "../components/Icon";
import { profile } from "../data/profile";

export default function ProfileEditPage() {
  const [nickname, setNickname] = useState(profile.nickname);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <main className="flex flex-1 flex-col gap-8 px-20 py-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-[9px]">
          <h1 className="text-[31px] font-bold tracking-[-1.24px] text-primary">
            내 정보 수정
          </h1>

          <p className="text-sm leading-[22.4px] text-secondary">
            닉네임과 프로필 이미지만 변경할 수 있어요.
          </p>
        </div>

        <button
          type="submit"
          form="profile-form"
          className="flex h-[42px] items-center justify-center rounded-lg border border-surface bg-action px-4 text-center text-sm font-bold text-surface"
        >
          변경사항 저장
        </button>
      </div>

      <form
        id="profile-form"
        onSubmit={handleSubmit}
        className="flex flex-1 flex-col gap-5"
      >
        <div className="flex items-center gap-11">
          <div className="flex h-[133px] flex-1 flex-col items-center justify-center gap-1">
            <div className="relative size-[82px]">
              <span className="flex size-full items-center justify-center overflow-hidden rounded-full bg-border">
                <Icon name="person" className="size-12 text-primary" />
              </span>

              <button
                type="button"
                aria-label="프로필 이미지 변경"
                className="absolute right-0 bottom-0 flex size-6 items-center justify-center rounded-full border-2 border-primary bg-page"
              >
                <Icon name="pencil" className="size-4 text-primary" />
              </button>
            </div>

            <p className="text-[15px] font-bold text-primary">프로필 이미지</p>

            <p className="text-[11px] text-tertiary">선택 사항 · 최대 5MB</p>
          </div>

          <div className="flex flex-1 flex-col gap-[17px]">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="profile-nickname"
                className="text-[13px] font-bold text-primary"
              >
                닉네임
              </label>

              <div className="flex min-h-12 items-center gap-2 rounded-lg border border-border bg-surface px-[13px] py-[14px]">
                <input
                  id="profile-nickname"
                  value={nickname}
                  onChange={(event) => setNickname(event.target.value)}
                  className="min-w-0 flex-1 px-0.5 py-px text-sm text-primary outline-none"
                />

                <button
                  type="button"
                  className="shrink-0 text-xs font-bold text-action"
                >
                  중복 확인
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-px">
              <label
                htmlFor="profile-email"
                className="text-[13px] font-bold text-primary"
              >
                이메일
              </label>

              <div className="flex min-h-12 items-center rounded-lg border border-border bg-surface px-[13px] py-[14px]">
                <input
                  id="profile-email"
                  value={profile.email}
                  readOnly
                  className="min-w-0 flex-1 px-0.5 py-px text-sm text-primary outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <section className="mt-auto flex items-center justify-between rounded-[10px] border border-danger bg-danger/10 p-5">
          <div className="flex w-[570px] max-w-full flex-col gap-1">
            <h3 className="text-sm font-bold text-danger">회원 탈퇴</h3>

            <p className="text-[11px] leading-[16.5px] text-danger">
              탈퇴하면 작성한 평점, 후기와 즐겨찾기가 모두 삭제되며 복구할 수
              없습니다.
            </p>
          </div>

          <button
            type="button"
            className="flex h-[42px] items-center justify-center rounded-lg border border-danger bg-surface px-4 text-center text-sm font-bold text-danger"
          >
            회원 탈퇴
          </button>
        </section>
      </form>
    </main>
  );
}
