import { Link, useNavigate } from "@tanstack/react-router";
import { useState, type SubmitEvent } from "react";
import { useProfileStore } from "../../stores/profile-store";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setEmailInProfile = useProfileStore((state) => state.setEmail);
  const navigate = useNavigate();

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim() || !password) return;
    setEmailInProfile(email.trim());
    navigate({ to: "/mypage" });
  };

  return (
    <main className="mx-auto flex min-h-[calc(100vh-72px)] w-full max-w-[430px] flex-col justify-center px-5 py-12">
      <h1 className="mb-4 text-[30px] font-extrabold tracking-[-0.04em]">로그인</h1>
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <label className="text-sm font-bold" htmlFor="login-email">이메일</label>
          <input
            className="w-full rounded-md border border-[#e1e4e8] bg-white px-4 py-3 text-sm outline-none placeholder:text-[#a5aab2] focus:border-[#4169e1]"
            id="login-email"
            type="email"
            autoComplete="email"
            placeholder="name@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-bold" htmlFor="login-password">비밀번호</label>
          <input
            className="w-full rounded-md border border-[#e1e4e8] bg-white px-4 py-3 text-sm outline-none placeholder:text-[#a5aab2] focus:border-[#4169e1]"
            id="login-password"
            type="password"
            autoComplete="current-password"
            placeholder="비밀번호"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <button className="mt-1 rounded-md bg-[#4169e1] px-4 py-3.5 font-bold text-white hover:bg-[#3159d4] disabled:cursor-not-allowed disabled:bg-[#b8c7f2]" type="submit" disabled={!email.trim() || !password}>로그인</button>
      </form>
      <p className="mt-4 text-center text-sm text-[#777f8c]">
        계정이 없으신가요? <Link className="font-bold text-[#4169e1] no-underline hover:underline" to="/signup">회원가입</Link>
      </p>
    </main>
  );
}
