import { createFileRoute } from "@tanstack/react-router";
import { MyPageEdit } from "../../pages/profile/my-page-edit";

export const Route = createFileRoute("/(protected)/_authenticated/mypage_/edit")({ component: MyPageEdit });
