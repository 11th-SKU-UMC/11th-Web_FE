import { useState, type ReactNode } from 'react';
import { ProfileContext, initialProfile } from './profile-context';
export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, updateProfile] = useState(initialProfile);
  return <ProfileContext.Provider value={{ profile, updateProfile }}>{children}</ProfileContext.Provider>;
}
