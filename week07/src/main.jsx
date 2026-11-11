import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INITIAL = { email: 'member@example.com', nickname: '챌린저' };
const KEY = 'umc-week7-demo-profile';
function loadProfile() {
  try {
    const value = JSON.parse(sessionStorage.getItem(KEY));
    if (value && typeof value.email === 'string' && typeof value.nickname === 'string') return value;
  } catch { /* 저장 데이터가 없거나 잘못됐으면 예시 정보를 사용한다. */ }
  return INITIAL;
}
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const valid = EMAIL.test(email.trim()) && password.length > 0;
  return <section><span className="eyebrow">WELCOME BACK</span><h1>다시 만나 반가워요</h1><p className="description">이메일과 비밀번호를 입력해 주세요.</p>
    <form noValidate onSubmit={e => { e.preventDefault(); if (valid) setMessage('입력 확인 완료! 실제 로그인 API는 다음 주차에 연결해요.'); }}>
      <label htmlFor="email">이메일</label><input id="email" type="email" autoComplete="username" placeholder="hello@example.com" value={email} onChange={e => { setEmail(e.target.value); setMessage(''); }} aria-describedby="email-error"/>
      <p id="email-error" className="error">{email && !EMAIL.test(email.trim()) ? '올바른 이메일 형식을 입력해 주세요.' : ''}</p>
      <label htmlFor="password">비밀번호</label><input id="password" type="password" autoComplete="current-password" placeholder="비밀번호 입력" value={password} onChange={e => { setPassword(e.target.value); setMessage(''); }}/>
      <button disabled={!valid}>로그인</button><p role="status" className="message">{message}</p>
    </form><div className="notice">화면 구현 미션 · 실제 인증은 수행하지 않아요.</div></section>;
}
function Profile({ profile }) {
  return <section><span className="eyebrow">MY ACCOUNT</span><h1>내 정보</h1><p className="description">나의 프로필을 확인하고 관리해요.</p><div className="avatar" aria-hidden="true">{profile.nickname.slice(0, 1)}</div><h2>{profile.nickname}님</h2><dl><dt>이메일</dt><dd>{profile.email}</dd><dt>닉네임</dt><dd>{profile.nickname}</dd></dl><a className="primary" href="#/mypage/edit">내 정보 수정</a><div className="notice">서버에서 조회한 정보가 아닌 예시 데이터예요.</div></section>;
}
function Edit({ profile, onSave }) {
  const [nickname, setNickname] = useState(profile.nickname);
  const [error, setError] = useState('');
  const trimmed = nickname.trim();
  const valid = trimmed.length >= 2 && trimmed.length <= 12;
  function submit(e) {
    e.preventDefault(); if (!valid) return;
    try { const next = { ...profile, nickname: trimmed }; sessionStorage.setItem(KEY, JSON.stringify(next)); onSave(next); location.hash = '/mypage'; }
    catch { setError('저장하지 못했어요. 브라우저 저장소 설정을 확인해 주세요.'); }
  }
  return <section><span className="eyebrow">EDIT PROFILE</span><h1>내 정보 수정</h1><p className="description">새로운 닉네임으로 프로필을 바꿔 보세요.</p><form onSubmit={submit}><label htmlFor="profile-email">이메일</label><input id="profile-email" value={profile.email} readOnly/><label htmlFor="nickname">닉네임</label><input id="nickname" value={nickname} onChange={e => { setNickname(e.target.value); setError(''); }} aria-describedby="nickname-hint"/><p id="nickname-hint" className={valid ? 'hint' : 'error'}>닉네임은 앞뒤 공백을 제거한 기준으로 2~12자를 입력해 주세요.</p><p className="error" role="alert">{error}</p><button disabled={!valid}>저장하기</button><a className="secondary" href="#/mypage">취소</a></form><div className="notice">수정한 예시 정보는 현재 탭의 세션에 저장돼요.</div></section>;
}
function App() {
  const [route, setRoute] = useState(location.hash.slice(1) || '/login');
  const [profile, setProfile] = useState(loadProfile);
  useEffect(() => { const handler = () => setRoute(location.hash.slice(1) || '/login'); window.addEventListener('hashchange', handler); return () => window.removeEventListener('hashchange', handler); }, []);
  return <><header><a className="brand" href="#/login">UMC<span> / WEEK 07</span></a><nav aria-label="화면 이동"><a href="#/login" aria-current={route === '/login' ? 'page' : undefined}>로그인</a><a href="#/mypage" aria-current={route.startsWith('/mypage') ? 'page' : undefined}>내 정보</a></nav></header><main><aside><span className="tag">AUTHENTICATION & AUTHORIZATION</span><h2>작은 입력에서<br/>시작하는 연결.</h2><p>인증의 개념을 이해하고,<br/>회원 화면의 흐름을 완성해요.</p><div className="circle">07</div></aside><div className="card" key={route}>{route === '/login' ? <Login/> : route === '/mypage' ? <Profile profile={profile}/> : route === '/mypage/edit' ? <Edit profile={profile} onSave={setProfile}/> : <section><h1>페이지를 찾을 수 없어요</h1><a href="#/login">로그인 화면으로</a></section>}</div></main><footer>UMC FRONTEND · 7주차 필수 미션 / 화면 구현</footer></>;
}
createRoot(document.getElementById('root')).render(<App/>);
