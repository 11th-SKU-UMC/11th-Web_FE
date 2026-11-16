import { useState } from "react";
import { checkEmailDuplicate } from "../../api/members/check-email-duplicate";
import { checkNicknameDuplicate } from "../../api/members/check-nickname-duplicate";
import { signup } from "../../api/members/signup";
import { Link } from "@tanstack/react-router";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

const DEFAULT_FORM = {
  email: "",
  nickname: "",
  password: "",
  passwordConfirm: "",
};

type DefaultFormKey = keyof typeof DEFAULT_FORM;
type DefaultFormValue = (typeof DEFAULT_FORM)[DefaultFormKey];

// 중복 확인 상태 초기값
const DEFAULT_DUPLICATE_CHECK = {
  isChecking: false,
  isAvailable: false,
};
type DuplicateCheckKey = "email" | "nickname";

const INPUT_CLASS =
  "h-11 w-full rounded-md border border-gray-200 bg-white px-3 text-sm outline-none placeholder:text-gray-400 focus:border-blue-600 disabled:bg-gray-50";
const LABEL_CLASS = "mb-1.5 block text-sm font-semibold";
const ERROR_CLASS = "mt-1.5 text-xs text-red-500";
const CHECK_BUTTON_CLASS =
  "absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-blue-600 disabled:cursor-not-allowed";

export function SignupPage() {
  const [form, setForm] = useState(DEFAULT_FORM);
  // 이메일, 닉네임 각각의 "확인 중인지 / 사용 가능한지"
  const [duplicateCheck, setDuplicateCheck] = useState({
    email: DEFAULT_DUPLICATE_CHECK,
    nickname: DEFAULT_DUPLICATE_CHECK,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEmailValid = EMAIL_REGEX.test(form.email.trim());
  const isNicknameValid =
    form.nickname.trim().length >= 2 && form.nickname.trim().length <= 12;
  const isPasswordValid = PASSWORD_REGEX.test(form.password);
  const isPasswordConfirmValid =
    form.passwordConfirm.length > 0 && form.password === form.passwordConfirm;

  const showEmailError = form.email.length > 0 && !isEmailValid;
  const showNicknameError = form.nickname.length > 0 && !isNicknameValid;
  const showPasswordError = form.password.length > 0 && !isPasswordValid;
  const showPasswordConfirmError =
    form.passwordConfirm.length > 0 && !isPasswordConfirmValid;

  const isFormValid =
    isEmailValid && isNicknameValid && isPasswordValid && isPasswordConfirmValid;

  // 형식 + 두 중복 확인까지 통과해야 제출 가능
  const canSubmit =
    isFormValid &&
    duplicateCheck.email.isAvailable &&
    duplicateCheck.nickname.isAvailable;

  // 이메일/닉네임을 고치면 확인 결과 초기화
  const handleChangeField = (key: DefaultFormKey, value: DefaultFormValue) => {
    if (key === "email" || key === "nickname") {
      if (duplicateCheck[key].isChecking) return;
      setDuplicateCheck((prev) => ({ ...prev, [key]: DEFAULT_DUPLICATE_CHECK }));
    }
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // 중복 확인 요청
  const handleCheckDuplicate = async (key: DuplicateCheckKey) => {
    const isValid = key === "email" ? isEmailValid : isNicknameValid;
    if (!isValid || duplicateCheck[key].isChecking) return;

    const label = key === "email" ? "이메일" : "닉네임";
    setDuplicateCheck((prev) => ({
      ...prev,
      [key]: { isChecking: true, isAvailable: false },
    }));

    try {
      const response =
        key === "email"
          ? await checkEmailDuplicate(form.email.trim())
          : await checkNicknameDuplicate(form.nickname.trim());
      const isAvailable = response.available;
      setDuplicateCheck((prev) => ({
        ...prev,
        [key]: { ...prev[key], isAvailable },
      }));
      alert(isAvailable ? `사용할 수 있는 ${label}이에요.` : `이미 사용 중인 ${label}이에요.`);
    } catch {
      setDuplicateCheck((prev) => ({
        ...prev,
        [key]: { ...prev[key], isAvailable: false },
      }));
      alert("중복 확인에 실패했어요. 다시 시도해 주세요.");
    } finally {
      setDuplicateCheck((prev) => ({
        ...prev,
        [key]: { ...prev[key], isChecking: false },
      }));
    }
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (!canSubmit || isSubmitting) return;

  setIsSubmitting(true);
  try {
    const response = await signup({
      email: form.email.trim(),
      nickname: form.nickname.trim(),
      password: form.password,
    });
    alert(response.message);
    // 로그인 페이지 만든 뒤: navigate({ to: "/login" });
  } catch {
    alert("회원가입에 실패했어요. 다시 시도해 주세요.");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <main className="flex justify-center px-4 py-24">
      <form onSubmit={handleSubmit} noValidate className="w-full max-w-[360px]">
        <h1 className="mb-6 text-2xl font-bold">회원가입</h1>

        <div className="space-y-4">
          {/* 이메일 */}
          <div>
            <label htmlFor="email" className={LABEL_CLASS}>이메일</label>
            <div className="relative">
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={form.email}
                disabled={duplicateCheck.email.isChecking}
                onChange={(e) => handleChangeField("email", e.target.value)}
                className={`${INPUT_CLASS} pr-20`}
              />
              <button
                type="button"
                disabled={!isEmailValid || duplicateCheck.email.isChecking}
                onClick={() => handleCheckDuplicate("email")}
                className={CHECK_BUTTON_CLASS}
              >
                {duplicateCheck.email.isChecking ? "확인 중" : "중복 확인"}
              </button>
            </div>
            {showEmailError && <p className={ERROR_CLASS}>이메일 형식을 확인해 주세요.</p>}
          </div>

          {/* 닉네임 */}
          <div>
            <label htmlFor="nickname" className={LABEL_CLASS}>닉네임</label>
            <div className="relative">
              <input
                id="nickname"
                type="text"
                placeholder="2~12자"
                value={form.nickname}
                disabled={duplicateCheck.nickname.isChecking}
                onChange={(e) => handleChangeField("nickname", e.target.value)}
                className={`${INPUT_CLASS} pr-20`}
              />
              <button
                type="button"
                disabled={!isNicknameValid || duplicateCheck.nickname.isChecking}
                onClick={() => handleCheckDuplicate("nickname")}
                className={CHECK_BUTTON_CLASS}
              >
                {duplicateCheck.nickname.isChecking ? "확인 중" : "중복 확인"}
              </button>
            </div>
            {showNicknameError && <p className={ERROR_CLASS}>닉네임은 2~12자로 입력해 주세요.</p>}
          </div>

          {/* 비밀번호 */}
          <div>
            <label htmlFor="password" className={LABEL_CLASS}>비밀번호</label>
            <input
              id="password"
              type="password"
              placeholder="8자 이상"
              value={form.password}
              onChange={(e) => handleChangeField("password", e.target.value)}
              className={INPUT_CLASS}
            />
            <p className="mt-1.5 text-xs text-gray-400">
              영문 대소문자, 숫자, 특수문자를 모두 포함해 8자 이상 입력해 주세요
            </p>
            {showPasswordError && <p className={ERROR_CLASS}>비밀번호를 다시 한 번 확인해주세요.</p>}
          </div>

          {/* 비밀번호 확인 */}
          <div>
            <label htmlFor="passwordConfirm" className={LABEL_CLASS}>비밀번호 확인</label>
            <input
              id="passwordConfirm"
              type="password"
              placeholder="다시 입력"
              value={form.passwordConfirm}
              onChange={(e) => handleChangeField("passwordConfirm", e.target.value)}
              className={INPUT_CLASS}
            />
            {showPasswordConfirmError && <p className={ERROR_CLASS}>비밀번호가 일치하지 않아요.</p>}
          </div>
        </div>

        <button
            type="submit"
            disabled={!canSubmit || isSubmitting}
             className="mt-6 h-11 w-full rounded-md bg-blue-600 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-blue-300"
        >
            {isSubmitting ? "가입 중" : "가입하기"}
        </button>

        <p className="mt-4 text-center text-xs text-gray-500">
          이미 계정이 있나요?{" "}
          <Link to="/login" className="font-semibold text-blue-600">로그인</Link>
        </p>
      </form>
    </main>
  );
}