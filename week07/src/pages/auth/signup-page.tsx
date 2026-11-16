import { useRef, useState, type FormEvent } from 'react';
import { checkEmailDuplicate } from '../../api/members/check-email-duplicate';
import { checkNicknameDuplicate } from '../../api/members/check-nickname-duplicate';
import { signup } from '../../api/members/signup';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
const DEFAULT_FORM = { email: '', nickname: '', password: '', passwordConfirm: '' };
type Field = keyof typeof DEFAULT_FORM;
type DuplicateField = 'email' | 'nickname';
const EMPTY_CHECK = { isChecking: false, isAvailable: false };
const fields = [
  { key: 'email', label: '이메일', type: 'email', placeholder: 'example@email.com', hint: '올바른 이메일 주소를 입력해 주세요.', autoComplete: 'email' },
  { key: 'nickname', label: '닉네임', type: 'text', placeholder: '사용할 닉네임', hint: '닉네임은 2~12자로 입력해 주세요.', autoComplete: 'nickname' },
  { key: 'password', label: '비밀번호', type: 'password', placeholder: '비밀번호 입력', hint: '영문 대문자·소문자, 숫자, 특수문자(!@#$%^&*)를 모두 포함해 8자 이상 입력해 주세요.', autoComplete: 'new-password' },
  { key: 'passwordConfirm', label: '비밀번호 확인', type: 'password', placeholder: '비밀번호 다시 입력', hint: '비밀번호가 일치하지 않아요.', autoComplete: 'new-password' },
] as const;

export function SignupPage() {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [duplicateCheck, setDuplicateCheck] = useState({ email: EMPTY_CHECK, nickname: EMPTY_CHECK });
  const [isSubmitting, setIsSubmitting] = useState(false);
  // 같은 렌더 안에서 연속 호출돼도 요청을 한 번만 보내요.
  const requests = useRef({ email: false, nickname: false, submit: false });
  const valid = {
    email: EMAIL_REGEX.test(form.email.trim()),
    nickname: form.nickname.trim().length >= 2 && form.nickname.trim().length <= 12,
    password: PASSWORD_REGEX.test(form.password),
    passwordConfirm: form.passwordConfirm.length > 0 && form.password === form.passwordConfirm,
  };
  const canSubmit = Object.values(valid).every(Boolean) && duplicateCheck.email.isAvailable && duplicateCheck.nickname.isAvailable;

  function handleChangeField(key: Field, value: string) {
    if (requests.current.submit) return;
    if (key === 'email' || key === 'nickname') {
      if (requests.current[key]) return;
      setDuplicateCheck(prev => ({ ...prev, [key]: EMPTY_CHECK }));
    }
    setForm(prev => ({ ...prev, [key]: value }));
  }

  async function handleCheckDuplicate(key: DuplicateField) {
    if (!valid[key] || requests.current[key] || requests.current.submit) return;
    requests.current[key] = true;
    setDuplicateCheck(prev => ({ ...prev, [key]: { isChecking: true, isAvailable: false } }));
    try {
      const response = await (key === 'email' ? checkEmailDuplicate(form.email.trim()) : checkNicknameDuplicate(form.nickname.trim()));
      const isAvailable = response.available === true;
      setDuplicateCheck(prev => ({ ...prev, [key]: { isChecking: false, isAvailable } }));
      const label = key === 'email' ? '이메일' : '닉네임';
      alert(isAvailable ? `사용할 수 있는 ${label}이에요.` : `이미 사용 중인 ${label}이에요.`);
    } catch {
      setDuplicateCheck(prev => ({ ...prev, [key]: EMPTY_CHECK }));
      alert('중복 확인에 실패했어요. 다시 시도해 주세요.');
    } finally {
      requests.current[key] = false;
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit || requests.current.submit) return;
    requests.current.submit = true;
    setIsSubmitting(true);
    try {
      const response = await signup({ email: form.email.trim(), nickname: form.nickname.trim(), password: form.password });
      if (!response.isSuccess) {
        alert(response.message || '회원가입에 실패했어요. 다시 시도해 주세요.');
        return;
      }
      alert(response.message);
      setForm(DEFAULT_FORM);
      setDuplicateCheck({ email: EMPTY_CHECK, nickname: EMPTY_CHECK });
      // 로그인 페이지는 8주차에 연결해요.
    } catch {
      alert('회원가입에 실패했어요. 다시 시도해 주세요.');
    } finally {
      requests.current.submit = false;
      setIsSubmitting(false);
    }
  }

  return (
    <div className="app">
      <header><a href="/" className="brand">UMC<span>영화와 함께하는 일상</span></a><span className="week">WEEK 07</span></header>
      <main>
        <div className="intro"><span className="eyebrow">WELCOME TO UMC</span><h1>반가워요!<br />함께 시작해 볼까요?</h1><p>나만의 취향을 발견하는 첫걸음,<br />회원가입으로 시작하세요.</p><div className="intro-line" /><span className="intro-caption">당신의 다음 영화가 기다리고 있어요.</span></div>
        <section className="signup" aria-labelledby="signup-title">
          <h2 id="signup-title">회원가입</h2><p className="description">아래 정보를 입력해 계정을 만들어 주세요.</p>
          <form onSubmit={handleSubmit} noValidate aria-busy={isSubmitting}>
            {fields.map(field => {
              const key = field.key;
              const check = key === 'email' || key === 'nickname' ? duplicateCheck[key] : null;
              const showError = form[key].length > 0 && !valid[key];
              return <div className="field" key={key}>
                <label htmlFor={key}>{field.label}</label>
                <div className="input-row">
                  <input id={key} name={key} type={field.type} placeholder={field.placeholder} autoComplete={field.autoComplete} required value={form[key]} onChange={e => handleChangeField(key, e.target.value)} disabled={isSubmitting || check?.isChecking} aria-invalid={showError} aria-describedby={`${key}-hint`} />
                  {(key === 'email' || key === 'nickname') && <button type="button" className="check-button" disabled={!valid[key] || isSubmitting || check?.isChecking} onClick={() => handleCheckDuplicate(key)} aria-label={`${field.label} 중복 확인`}>{check?.isChecking ? '확인 중' : '중복 확인'}</button>}
                </div>
                <p id={`${key}-hint`} className={`hint ${showError ? 'error' : check?.isAvailable ? 'success' : ''}`} aria-live="polite">{showError ? field.hint : check?.isAvailable ? `사용 가능한 ${field.label}이에요.` : key === 'email' || key === 'nickname' ? '입력 후 중복 확인을 해 주세요.' : key === 'password' ? field.hint : '비밀번호를 한 번 더 입력해 주세요.'}</p>
              </div>;
            })}
            <button className="submit-button" type="submit" disabled={!canSubmit || isSubmitting}>{isSubmitting ? '가입 중' : '가입하기'}</button>
          </form>
        </section>
      </main><footer>UMC · University MakeUs Challenge</footer>
    </div>
  );
}
