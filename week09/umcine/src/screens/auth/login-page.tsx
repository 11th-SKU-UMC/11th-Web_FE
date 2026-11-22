"use client";

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useLoginMutation } from '../../hooks/use-login-mutation';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginMutation = useLoginMutation();
  const canSubmit = EMAIL_REGEX.test(email.trim()) && password.length > 0;
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit || loginMutation.isPending) return;
    loginMutation.mutate({ email: email.trim(), password });
  }
  return <main className="single-page"><section className="signup" aria-labelledby="login-title"><span className="eyebrow">WELCOME BACK</span><h1 id="login-title">로그인</h1><p className="description">다시 만나 반가워요.</p><form onSubmit={handleSubmit} aria-busy={loginMutation.isPending}><div className="field"><label htmlFor="login-email">이메일</label><input id="login-email" type="email" autoComplete="email" required disabled={loginMutation.isPending} value={email} onChange={e => setEmail(e.target.value)} /></div><div className="field"><label htmlFor="login-password">비밀번호</label><input id="login-password" type="password" autoComplete="current-password" required disabled={loginMutation.isPending} value={password} onChange={e => setPassword(e.target.value)} /></div><button type="submit" className="submit-button" disabled={!canSubmit || loginMutation.isPending}>{loginMutation.isPending ? '로그인 중' : '로그인'}</button></form><p className="page-link">아직 계정이 없으신가요? <Link href="/signup">회원가입</Link></p></section></main>;
}
