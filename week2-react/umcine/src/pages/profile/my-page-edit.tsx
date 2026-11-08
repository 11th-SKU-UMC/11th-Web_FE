import { useNavigate } from "@tanstack/react-router";
import { useState, type SubmitEvent } from "react";
import { useProfileStore } from "../../stores/profile-store";

export function MyPageEdit() {
  const savedEmail = useProfileStore((state) => state.email);
  const savedNickname = useProfileStore((state) => state.nickname);
  const setProfile = useProfileStore((state) => state.setProfile);
  const [email, setEmail] = useState(savedEmail);
  const [nickname, setNickname] = useState(savedNickname);
  const navigate = useNavigate();

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim() || !nickname.trim()) return;
    setProfile({ email: email.trim(), nickname: nickname.trim() });
    navigate({ to: "/mypage" });
  };

  return (
    <main className="mx-auto min-h-[calc(100vh-72px)] w-full max-w-[1200px] px-5 py-8 sm:px-8">
      <h1 className="text-[28px] font-extrabold tracking-[-0.04em]">내 정보 수정</h1>
      <p className="mt-2 text-sm text-[#969da8]">닉네임과 이메일을 변경할 수 있어요.</p>
      <div className="mt-10 grid gap-10 md:grid-cols-[180px_minmax(0,1fr)]">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="grid size-28 place-items-center rounded-full bg-[#e8eaee]" aria-hidden="true">
            <img className="size-12" src="/icons/movie-icons/person.svg" alt="" />
          </div>
          <p className="text-sm font-bold">프로필 이미지</p>
        </div>
        <form className="grid max-w-[520px] content-start gap-5" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <label className="text-sm font-bold" htmlFor="profile-nickname">닉네임</label>
            <input className="rounded-md border border-[#e1e4e8] bg-white px-4 py-3 text-sm outline-none focus:border-[#4169e1]" id="profile-nickname" value={nickname} onChange={(event) => setNickname(event.target.value)} minLength={2} maxLength={12} required />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-bold" htmlFor="profile-email">이메일</label>
            <input className="rounded-md border border-[#e1e4e8] bg-white px-4 py-3 text-sm outline-none focus:border-[#4169e1]" id="profile-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </div>
          <button className="w-fit rounded-md bg-[#4169e1] px-6 py-3 text-sm font-bold text-white hover:bg-[#3159d4] disabled:cursor-not-allowed disabled:bg-[#b8c7f2]" type="submit" disabled={!email.trim() || nickname.trim().length < 2}>저장하기</button>
        </form>
      </div>
    </main>
  );
}
