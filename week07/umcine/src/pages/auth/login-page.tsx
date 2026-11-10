import { useState } from "react";
import { Link } from "@tanstack/react-router";

const FIELD_CLASS =
  "flex h-11 items-center gap-2 rounded-md border border-gray-200 bg-white px-3 focus-within:border-blue-600";
const INPUT_CLASS = "w-full bg-transparent text-sm outline-none placeholder:text-gray-400";
const LABEL_CLASS = "mb-1.5 block text-sm font-semibold";

export function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const canSubmit = form.email.trim().length > 0 && form.password.length > 0;

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;
    // 8주차에서 로그인 API 연결
    alert(`입력한 이메일: ${form.email.trim()}`);
  };

  return (
    <main className="flex justify-center px-4 py-24">
      <form onSubmit={handleSubmit} noValidate className="w-full max-w-[360px]">
        <h1 className="mb-6 text-2xl font-bold">로그인</h1>

        <div className="space-y-4">
          <div>
            <label htmlFor="email" className={LABEL_CLASS}>이메일</label>
            <div className={FIELD_CLASS}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 shrink-0 text-gray-400">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={form.email}
                onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                className={INPUT_CLASS}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className={LABEL_CLASS}>비밀번호</label>
            <div className={FIELD_CLASS}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 shrink-0 text-gray-400">
                <rect x="5" y="11" width="14" height="10" rx="2" />
                <path d="M8 11V7a4 4 0 0 1 8 0v4" />
              </svg>
              <input
                id="password"
                type="password"
                placeholder="비밀번호"
                value={form.password}
                onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                className={INPUT_CLASS}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="mt-6 h-11 w-full rounded-md bg-blue-600 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-blue-300"
        >
          로그인
        </button>

        <p className="mt-4 text-center text-xs text-gray-500">
          계정이 없나요?{" "}
          <Link to="/signup" className="font-semibold text-blue-600">회원가입</Link>
        </p>
      </form>
    </main>
  );
}