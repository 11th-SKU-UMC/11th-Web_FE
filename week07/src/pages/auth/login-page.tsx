import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useProfile } from '../member/profile-context';
export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { profile, updateProfile } = useProfile();
  const navigate = useNavigate();
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // 화면 실습용이며 실제 인증은 서버 연동 시 구현해요.
    updateProfile({ ...profile, email: email.trim() });
    setPassword('');
    void navigate({ to: '/mypage' });
  }
  return <main className="single-page"><section className="signup" aria-labelledby="login-title"><span className="eyebrow">WELCOME BACK</span><h1 id="login-title">로그인</h1><p className="description">다시 만나 반가워요.</p><p className="demo-notice">화면 실습용입니다. 실제 인증 없이 입력한 이메일을 내 정보에 반영해요.</p><form onSubmit={handleSubmit}><div className="field"><label htmlFor="login-email">이메일</label><input id="login-email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} /></div><div className="field"><label htmlFor="login-password">비밀번호</label><input id="login-password" type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} /></div><button className="submit-button" disabled={!email.trim() || !password}>로그인</button></form><p className="page-link">아직 계정이 없으신가요? <Link to="/signup">회원가입</Link></p></section></main>;
}
