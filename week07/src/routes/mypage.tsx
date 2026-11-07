import { createFileRoute } from '@tanstack/react-router';
import { ProfilePage } from '../pages/member/profile-page';
export const Route = createFileRoute('/mypage')({ component: () => <div className="account-ui"><ProfilePage /></div> });
