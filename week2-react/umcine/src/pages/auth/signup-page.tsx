import { Link } from "@tanstack/react-router";
import { useState, type SubmitEvent } from "react";
import { checkEmailDuplicate } from "../../api/members/check-email-duplicate";
import { checkNicknameDuplicate } from "../../api/members/check-nickname-duplicate";
import { signup } from "../../api/members/signup";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

const DEFAULT_FORM = {
  email: "",
  nickname: "",
  password: "",
  passwordConfirm: "",
};

const DEFAULT_DUPLICATE_CHECK = { isChecking: false, isAvailable: false };

type FormKey = keyof typeof DEFAULT_FORM;
type DuplicateCheckKey = "email" | "nickname";

const inputClassName =
  "min-w-0 w-full rounded-md border border-[#e1e4e8] bg-white px-4 py-3 text-sm text-[#17191d] outline-none placeholder:text-[#a5aab2] focus:border-[#4169e1] focus:ring-2 focus:ring-[#4169e1]/10 disabled:cursor-not-allowed disabled:opacity-60";
const duplicateButtonClassName =
  "shrink-0 cursor-pointer rounded-md border border-[#e1e4e8] bg-white px-4 py-3 text-xs font-bold text-[#4169e1] hover:bg-[#f3f6ff] disabled:cursor-not-allowed disabled:text-[#a5aab2]";

export function SignupPage() {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [duplicateCheck, setDuplicateCheck] = useState({
    email: { ...DEFAULT_DUPLICATE_CHECK },
    nickname: { ...DEFAULT_DUPLICATE_CHECK },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEmailValid = EMAIL_REGEX.test(form.email.trim());
  const nicknameLength = form.nickname.trim().length;
  const isNicknameValid = nicknameLength >= 2 && nicknameLength <= 12;
  const isPasswordValid = PASSWORD_REGEX.test(form.password);
  const isPasswordConfirmValid =
    form.passwordConfirm.length > 0 && form.password === form.passwordConfirm;
  const isFormValid =
    isEmailValid && isNicknameValid && isPasswordValid && isPasswordConfirmValid;
  const canSubmit =
    isFormValid &&
    duplicateCheck.email.isAvailable &&
    duplicateCheck.nickname.isAvailable;

  const handleChangeField = (key: FormKey, value: string) => {
    if (key === "email" || key === "nickname") {
      if (duplicateCheck[key].isChecking) return;
      setDuplicateCheck((previous) => ({
        ...previous,
        [key]: { ...DEFAULT_DUPLICATE_CHECK },
      }));
    }
    setForm((previous) => ({ ...previous, [key]: value }));
  };

  const handleCheckDuplicate = async (key: DuplicateCheckKey) => {
    const isValid = key === "email" ? isEmailValid : isNicknameValid;
    if (!isValid || duplicateCheck[key].isChecking) return;

    const label = key === "email" ? "이메일" : "닉네임";
    setDuplicateCheck((previous) => ({
      ...previous,
      [key]: { isChecking: true, isAvailable: false },
    }));

    try {
      const response =
        key === "email"
          ? await checkEmailDuplicate(form.email.trim())
          : await checkNicknameDuplicate(form.nickname.trim());
      setDuplicateCheck((previous) => ({
        ...previous,
        [key]: { ...previous[key], isAvailable: response.available },
      }));
      alert(
        response.available
          ? `사용할 수 있는 ${label}이에요.`
          : `이미 사용 중인 ${label}이에요.`,
      );
    } catch {
      setDuplicateCheck((previous) => ({
        ...previous,
        [key]: { ...previous[key], isAvailable: false },
      }));
      alert("중복 확인에 실패했어요. 다시 시도해 주세요.");
    } finally {
      setDuplicateCheck((previous) => ({
        ...previous,
        [key]: { ...previous[key], isChecking: false },
      }));
    }
  };

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await signup({
        email: form.email.trim(),
        nickname: form.nickname.trim(),
        password: form.password,
      });
      alert(response.message);
      // 로그인 페이지 연결 후 이동을 추가해요.
    } catch {
      alert("회원가입에 실패했어요. 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-[calc(100vh-72px)] w-full max-w-[430px] flex-col justify-center px-5 py-12 sm:py-16">
      <h1 className="mb-4 text-[30px] font-extrabold tracking-[-0.04em] text-[#17191d]">
        회원가입
      </h1>

      <form
        className="grid gap-4"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="grid gap-2">
          <label className="text-sm font-bold text-[#17191d]" htmlFor="signup-email">
            이메일
          </label>
          <div className="flex gap-2">
            <input
              className={inputClassName}
              id="signup-email"
              type="email"
              autoComplete="email"
              placeholder="이메일을 입력해 주세요"
              value={form.email}
              onChange={(event) => handleChangeField("email", event.target.value)}
              disabled={duplicateCheck.email.isChecking}
              aria-invalid={form.email.length > 0 && !isEmailValid}
              aria-describedby={form.email.length > 0 && !isEmailValid ? "signup-email-error" : undefined}
            />
            <button
              className={duplicateButtonClassName}
              type="button"
              disabled={!isEmailValid || duplicateCheck.email.isChecking}
              onClick={() => handleCheckDuplicate("email")}
            >
              {duplicateCheck.email.isChecking ? "확인 중" : "중복 확인"}
            </button>
          </div>
          {form.email.length > 0 && !isEmailValid && (
            <p className="text-xs text-red-600" id="signup-email-error">
              올바른 이메일 형식으로 입력해 주세요.
            </p>
          )}
          {duplicateCheck.email.isAvailable && (
            <p className="text-xs text-green-700">사용 가능한 이메일이에요.</p>
          )}
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-bold text-[#17191d]" htmlFor="signup-nickname">
            닉네임
          </label>
          <div className="flex gap-2">
            <input
              className={inputClassName}
              id="signup-nickname"
              type="text"
              autoComplete="nickname"
              placeholder="2~12자로 입력해 주세요"
              value={form.nickname}
              onChange={(event) => handleChangeField("nickname", event.target.value)}
              disabled={duplicateCheck.nickname.isChecking}
              aria-invalid={form.nickname.length > 0 && !isNicknameValid}
              aria-describedby={form.nickname.length > 0 && !isNicknameValid ? "signup-nickname-error" : undefined}
            />
            <button
              className={duplicateButtonClassName}
              type="button"
              disabled={!isNicknameValid || duplicateCheck.nickname.isChecking}
              onClick={() => handleCheckDuplicate("nickname")}
            >
              {duplicateCheck.nickname.isChecking ? "확인 중" : "중복 확인"}
            </button>
          </div>
          {form.nickname.length > 0 && !isNicknameValid && (
            <p className="text-xs text-red-600" id="signup-nickname-error">
              닉네임은 2~12자로 입력해 주세요.
            </p>
          )}
          {duplicateCheck.nickname.isAvailable && (
            <p className="text-xs text-green-700">사용 가능한 닉네임이에요.</p>
          )}
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-bold text-[#17191d]" htmlFor="signup-password">
            비밀번호
          </label>
          <input
            className={inputClassName}
            id="signup-password"
            type="password"
            autoComplete="new-password"
            placeholder="비밀번호를 입력해 주세요"
            value={form.password}
            onChange={(event) => handleChangeField("password", event.target.value)}
            aria-invalid={form.password.length > 0 && !isPasswordValid}
            aria-describedby="signup-password-hint"
          />
          <p
            className={`text-xs ${form.password.length > 0 && !isPasswordValid ? "text-red-600" : "text-[#969da8]"}`}
            id="signup-password-hint"
          >
            영문 대소문자, 숫자, 특수문자(!@#$%^&*)를 포함해 8자 이상 입력해 주세요.
          </p>
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-bold text-[#17191d]" htmlFor="signup-password-confirm">
            비밀번호 확인
          </label>
          <input
            className={inputClassName}
            id="signup-password-confirm"
            type="password"
            autoComplete="new-password"
            placeholder="비밀번호를 다시 입력해 주세요"
            value={form.passwordConfirm}
            onChange={(event) => handleChangeField("passwordConfirm", event.target.value)}
            aria-invalid={form.passwordConfirm.length > 0 && !isPasswordConfirmValid}
            aria-describedby={form.passwordConfirm.length > 0 && !isPasswordConfirmValid ? "signup-password-confirm-error" : undefined}
          />
          {form.passwordConfirm.length > 0 && !isPasswordConfirmValid && (
            <p className="text-xs text-red-600" id="signup-password-confirm-error">
              비밀번호가 일치하지 않아요.
            </p>
          )}
        </div>

        <button
          className="mt-2 cursor-pointer rounded-md bg-[#4169e1] px-4 py-3.5 font-bold text-white transition-colors hover:bg-[#3159d4] disabled:cursor-not-allowed disabled:bg-[#b8c7f2]"
          type="submit"
          disabled={!canSubmit || isSubmitting}
        >
          {isSubmitting ? "가입 중" : "가입하기"}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-[#777f8c]">
        이미 계정이 있으신가요? <Link className="font-bold text-[#4169e1] no-underline hover:underline" to="/login">로그인</Link>
      </p>
    </main>
  );
}
