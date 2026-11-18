import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import Icon from "../components/icon";
import { useLoginMutation } from "../hooks/use-login-mutation";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useLoginMutation();
  const canSubmit = EMAIL_REGEX.test(email.trim()) && password.length > 0;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit || loginMutation.isPending) return;

    loginMutation.mutate({ email: email.trim(), password });
  };

  return (
    <main className="flex flex-1 items-center justify-center">
      <form
        id="login-form"
        onSubmit={handleSubmit}
        className="flex w-[430px] flex-col gap-4"
      >
        <h1 className="text-[34px] leading-[41px] font-bold tracking-[-1.53px]">
          로그인
        </h1>

        <div className="flex flex-col gap-2">
          <label htmlFor="login-email" className="text-[13px] font-extrabold">
            이메일
          </label>
          <div className="flex min-h-12 items-center gap-1 rounded-lg border border-gray-200 bg-white px-[13px] py-3.5 text-gray-600">
            <Icon name="mail" size={16} />
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@example.com"
              className="flex-1 bg-transparent px-0.5 py-px text-sm text-ink outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="login-password" className="text-[13px] font-extrabold">
            비밀번호
          </label>
          <div className="flex min-h-12 items-center gap-1 rounded-lg border border-gray-200 bg-white px-[13px] py-3.5 text-gray-600">
            <Icon name="lock" size={16} />
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="비밀번호"
              className="flex-1 bg-transparent px-0.5 py-px text-sm text-ink outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!canSubmit || loginMutation.isPending}
          className="flex h-12 w-full items-center justify-center rounded-lg border border-white bg-primary text-sm font-extrabold text-white"
        >
          {loginMutation.isPending ? "로그인 중" : "로그인"}
        </button>

        <p className="flex items-end justify-center pt-[5px] text-[13px] text-gray-600">
          처음이신가요?&nbsp;
          <Link to="/signup" className="text-xs font-extrabold text-primary">
            회원가입
          </Link>
        </p>
      </form>
    </main>
  );
}

export default LoginPage;
