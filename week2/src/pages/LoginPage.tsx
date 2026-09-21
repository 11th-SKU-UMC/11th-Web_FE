import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "../components/Icon";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <main className="flex flex-1 items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex w-[430px] max-w-full flex-col gap-4"
      >
        <h1 className="text-[34px] font-bold tracking-[-1.53px] text-primary">
          로그인
        </h1>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="login-email"
            className="text-[13px] font-bold text-primary"
          >
            이메일
          </label>

          <div className="flex min-h-12 items-center gap-1 rounded-lg border border-border bg-surface px-[13px] py-[14px]">
            <Icon name="mail" className="size-4 text-secondary" />

            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@example.com"
              className="min-w-0 flex-1 px-0.5 py-px text-sm text-primary outline-none placeholder:text-tertiary"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="login-password"
            className="text-[13px] font-bold text-primary"
          >
            비밀번호
          </label>

          <div className="flex min-h-12 items-center gap-1 rounded-lg border border-border bg-surface px-[13px] py-[14px]">
            <Icon name="lock" className="size-4 text-secondary" />

            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="비밀번호"
              className="min-w-0 flex-1 px-0.5 py-px text-sm text-primary outline-none placeholder:text-tertiary"
            />
          </div>
        </div>

        <button
          type="submit"
          className="flex h-12 w-full items-center justify-center rounded-lg border border-surface bg-action px-4 text-center text-sm font-bold text-surface"
        >
          로그인
        </button>

        <div className="flex items-end justify-center pt-[5px]">
          <span className="text-[13px] text-secondary">처음이신가요?&nbsp;</span>

          <Link to="/signup" className="text-xs font-bold text-action">
            회원가입
          </Link>
        </div>
      </form>
    </main>
  );
}
