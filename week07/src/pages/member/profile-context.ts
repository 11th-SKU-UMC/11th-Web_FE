import { createContext, useContext } from 'react';
export type Profile = { email: string; nickname: string; introduction: string };
export const initialProfile: Profile = { email: 'movie@example.com', nickname: '영화팬', introduction: '좋아하는 영화를 함께 이야기해요.' };
export const ProfileContext = createContext<{ profile: Profile; updateProfile: (value: Profile) => void } | null>(null);
export function useProfile() {
  const value = useContext(ProfileContext);
  if (!value) throw new Error('ProfileProvider가 필요해요.');
  return value;
}
