import { Link } from '@tanstack/react-router';
import { useMeQuery } from '../../hooks/use-me-query';
import { useAuthStore } from '../../stores/auth-store';
export function ProfilePage() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const { data: profile, isLoading, isError } = useMeQuery();
  if (!accessToken) return <main className="single-page"><Link to="/login">로그인이 필요해요.</Link></main>;
  if (isLoading) return <main className="single-page" role="status">내 정보를 불러오는 중이에요.</main>;
  if (isError || !profile) return <main className="single-page" role="alert">내 정보를 불러오지 못했어요.</main>;
  return <main className="single-page"><section className="signup" aria-labelledby="profile-title"><span className="eyebrow">MY ACCOUNT</span><h1 id="profile-title">내 정보</h1><p className="description">나의 프로필을 확인하고 관리하세요.</p><div className="avatar" aria-hidden="true">{profile.nickname.slice(0, 1)}</div><h2>{profile.nickname}</h2><dl className="profile-details"><dt>이메일</dt><dd>{profile.email}</dd><dt>닉네임</dt><dd>{profile.nickname}</dd><dt>가입 시각</dt><dd>{profile.createdAt}</dd></dl><Link className="submit-button button-link" to="/mypage/edit">내 정보 수정</Link></section></main>;
}
