import type { Metadata } from "next";
import { MyPage } from "../../../../screens/profile/my-page";

export const metadata: Metadata = { title: "마이페이지" };

export default function ProfilePage() {
  return <MyPage />;
}
