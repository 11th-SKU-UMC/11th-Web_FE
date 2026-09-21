import { useState } from "react";
import { Link } from "react-router-dom";

const FIELD_CLASS =
  "flex min-h-12 items-center rounded-lg border border-border bg-surface px-[13px] py-[14px]";
const INPUT_CLASS =
  "min-w-0 flex-1 px-0.5 py-px text-sm text-primary outline-none placeholder:text-tertiary";
const LABEL_CLASS = "text-[13px] font-bold text-primary";
const CHECK_CLASS = "shrink-0 text-xs font-bold text-action";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

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
          회원가입
        </h1>

        <div className="flex flex-col gap-2">
          <label htmlFor="signup-email" className={LABEL_CLASS}>
            이메일
          </label>

          <div className={`${FIELD_CLASS} gap-[9px]`}>
            <input
              id="signup-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@example.com"
              className={INPUT_CLASS}
            />

            <button type="button" className={CHECK_CLASS}>
              중복 확인
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="signup-nickname" className={LABEL_CLASS}>
            닉네임
          </label>

          <div className={`${FIELD_CLASS} gap-[9px]`}>
            <input
              id="signup-nickname"
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
              placeholder="2–12자"
              className={INPUT_CLASS}
            />

            <button type="button" className={CHECK_CLASS}>
              중복 확인
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex flex-col gap-2">
            <label htmlFor="signup-password" className={LABEL_CLASS}>
              비밀번호
            </label>

            <div className={FIELD_CLASS}>
              <input
                id="signup-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="8자 이상"
                className={INPUT_CLASS}
              />
            </div>
          </div>

          <p className="text-[11px] text-tertiary">
            영문 대·소문자, 숫자, 특수문자를 모두 포함해 8자 이상 입력해 주세요
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="signup-password-confirm" className={LABEL_CLASS}>
            비밀번호 확인
          </label>

          <div className={FIELD_CLASS}>
            <input
              id="signup-password-confirm"
              type="password"
              value={passwordConfirm}
              onChange={(event) => setPasswordConfirm(event.target.value)}
              placeholder="다시 입력"
              className={INPUT_CLASS}
            />
          </div>
        </div>

        <button
          type="submit"
          className="flex h-12 w-full items-center justify-center rounded-lg border border-surface bg-action px-4 text-center text-sm font-bold text-surface"
        >
          가입하기
        </button>

        <div className="flex items-end justify-center">
          <span className="text-[13px] text-secondary">
            이미 계정이 있나요?&nbsp;
          </span>

          <Link to="/login" className="text-xs font-bold text-action">
            로그인
          </Link>
        </div>
      </form>
    </main>
  );
}
