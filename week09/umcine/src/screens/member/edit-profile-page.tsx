"use client";

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMeQuery } from '../../hooks/use-me-query';
import { useUpdateMeMutation } from '../../hooks/use-update-me-mutation';
import { useAuthStore } from '../../stores/auth-store';
import type { MemberInfo } from '../../api/members/me';

export function EditProfilePage() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const { data: profile, isLoading, isError } = useMeQuery();
  if (!accessToken) return <main className="single-page"><Link href="/login">로그인이 필요해요.</Link></main>;
  if (isLoading) return <main className="single-page" role="status">내 정보를 불러오는 중이에요.</main>;
  if (isError || !profile) return <main className="single-page" role="alert">내 정보를 불러오지 못했어요.</main>;
  return <EditProfileForm profile={profile} />;
}

function EditProfileForm({ profile }: { profile: MemberInfo }) {
  const [nickname, setNickname] = useState(profile.nickname);
  const updateMeMutation = useUpdateMeMutation();
  const router = useRouter();
  const canSubmit = nickname.trim().length >= 2 && nickname.trim().length <= 12;
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit || updateMeMutation.isPending) return;
    updateMeMutation.mutate({ nickname: nickname.trim() }, {
      onSuccess: () => { router.push('/mypage'); },
    });
  }
  return <main className="single-page"><section className="signup" aria-labelledby="edit-title">
    <span className="eyebrow">EDIT PROFILE</span><h1 id="edit-title">내 정보 수정</h1>
    <p className="description">닉네임을 변경하고 저장해 주세요.</p>
    <form onSubmit={handleSubmit} aria-busy={updateMeMutation.isPending}>
      <div className="field"><label htmlFor="profile-email">이메일</label><input id="profile-email" type="email" autoComplete="email" readOnly value={profile.email} /></div>
      <div className="field"><label htmlFor="profile-nickname">닉네임</label><input id="profile-nickname" autoComplete="nickname" required value={nickname} disabled={updateMeMutation.isPending} onChange={e => setNickname(e.target.value)} aria-invalid={!canSubmit} aria-describedby="nickname-hint" /><p id="nickname-hint" className={`hint ${!canSubmit ? 'error' : ''}`}>닉네임은 2~12자로 입력해 주세요.</p></div>
      <button type="submit" className="submit-button" disabled={!canSubmit || updateMeMutation.isPending}>{updateMeMutation.isPending ? '저장 중' : '저장'}</button>
      <Link className="button-link cancel-link" href="/mypage">취소</Link>
    </form>
  </section></main>;
}
