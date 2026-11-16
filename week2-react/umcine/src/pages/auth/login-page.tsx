import { Link } from "@tanstack/react-router";
import { useState, type SubmitEvent } from "react";
import { useLoginMutation } from "../../hooks/use-login-mutation";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const loginMutation = useLoginMutation();
  const canSubmit = EMAIL_REGEX.test(form.email.trim()) && form.password.length > 0;

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit || loginMutation.isPending) return;

    loginMutation.mutate({
      email: form.email.trim(),
      password: form.password,
    });
  };

  return (
    <main className="mx-auto flex min-h-[calc(100vh-72px)] w-full max-w-[430px] flex-col justify-center px-5 py-12">
      <h1 className="mb-4 text-[30px] font-extrabold tracking-[-0.04em]">로그인</h1>
      <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
        <div className="grid gap-2">
          <label className="text-sm font-bold" htmlFor="login-email">이메일</label>
          <input
            className="w-full rounded-md border border-[#e1e4e8] bg-white px-4 py-3 text-sm outline-none placeholder:text-[#a5aab2] focus:border-[#4169e1]"
            id="login-email"
            type="email"
            autoComplete="email"
            placeholder="name@example.com"
            value={form.email}
            onChange={(event) => setForm((previous) => ({ ...previous, email: event.target.value }))}
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
            value={form.password}
            onChange={(event) => setForm((previous) => ({ ...previous, password: event.target.value }))}
            required
          />
        </div>
        <button className="mt-1 rounded-md bg-[#4169e1] px-4 py-3.5 font-bold text-white hover:bg-[#3159d4] disabled:cursor-not-allowed disabled:bg-[#b8c7f2]" type="submit" disabled={!canSubmit || loginMutation.isPending}>
          {loginMutation.isPending ? "로그인 중" : "로그인"}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-[#777f8c]">
        계정이 없으신가요? <Link className="font-bold text-[#4169e1] no-underline hover:underline" to="/signup">회원가입</Link>
      </p>
    </main>
  );
}
