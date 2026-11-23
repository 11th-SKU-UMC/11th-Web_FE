import type { Metadata } from "next";
import { MyPageEdit } from "../../../../../screens/profile/my-page-edit";

export const metadata: Metadata = { title: "내 정보 수정" };

export default function ProfileEditPage() {
  return <MyPageEdit />;
}
