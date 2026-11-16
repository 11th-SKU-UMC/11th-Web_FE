import { Link } from '@tanstack/react-router';
import { useProfile } from './profile-context';
export function ProfilePage() {
  const { profile } = useProfile();
  return <main className="single-page"><section className="signup" aria-labelledby="profile-title"><span className="eyebrow">MY ACCOUNT</span><h1 id="profile-title">내 정보</h1><p className="description">나의 프로필을 확인하고 관리하세요.</p><div className="avatar" aria-hidden="true">{profile.nickname.slice(0, 1)}</div><h2>{profile.nickname}</h2><dl className="profile-details"><dt>이메일</dt><dd>{profile.email}</dd><dt>닉네임</dt><dd>{profile.nickname}</dd><dt>자기소개</dt><dd>{profile.introduction || '아직 작성한 소개가 없어요.'}</dd></dl><Link className="submit-button button-link" to="/mypage/edit">내 정보 수정</Link><p className="hint">입력한 정보는 현재 화면 실습 중에만 유지되며 새로고침하면 초기화돼요.</p></section></main>;
}
