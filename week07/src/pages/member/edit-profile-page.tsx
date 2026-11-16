import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useProfile } from './profile-context';
export function EditProfilePage() {
  const { profile, updateProfile } = useProfile();
  const [form, setForm] = useState(profile);
  const navigate = useNavigate();
  const nicknameValid = form.nickname.trim().length >= 2 && form.nickname.trim().length <= 12;
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!nicknameValid) return;
    updateProfile({ email: form.email.trim(), nickname: form.nickname.trim(), introduction: form.introduction.trim() });
    void navigate({ to: '/mypage' });
  }
  return <main className="single-page"><section className="signup" aria-labelledby="edit-title"><span className="eyebrow">EDIT PROFILE</span><h1 id="edit-title">내 정보 수정</h1><p className="description">변경한 내용은 저장 후 내 정보에서 확인할 수 있어요.</p><form onSubmit={handleSubmit}><div className="field"><label htmlFor="profile-email">이메일</label><input id="profile-email" type="email" autoComplete="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div><div className="field"><label htmlFor="profile-nickname">닉네임</label><input id="profile-nickname" autoComplete="nickname" required value={form.nickname} onChange={e => setForm({ ...form, nickname: e.target.value })} aria-invalid={!nicknameValid} aria-describedby="nickname-hint" /><p id="nickname-hint" className={`hint ${!nicknameValid ? 'error' : ''}`}>닉네임은 2~12자로 입력해 주세요.</p></div><div className="field"><label htmlFor="profile-introduction">자기소개</label><textarea id="profile-introduction" rows={4} maxLength={200} value={form.introduction} onChange={e => setForm({ ...form, introduction: e.target.value })} /><p className="hint">{form.introduction.length}/200</p></div><button className="submit-button" disabled={!nicknameValid}>저장하기</button><Link className="button-link cancel-link" to="/mypage">취소</Link></form></section></main>;
}
