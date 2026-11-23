"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useState, type SubmitEvent } from "react";
import { getMe, type MemberInfo } from "../../api/members/me";
import { useUpdateMeMutation } from "../../hooks/use-update-me-mutation";
import { useAuthStore } from "../../stores/auth-store";

export function MyPageEdit() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const meQuery = useQuery({
    queryKey: ["members", "me"],
    queryFn: getMe,
    enabled: Boolean(accessToken),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  if (!accessToken) {
    return (
      <main className="mx-auto w-full max-w-[1200px] px-5 py-8 sm:px-8">
        <Link className="text-sm font-bold text-[#4169e1]" href="/login">로그인 후 내 정보를 수정해 주세요.</Link>
      </main>
    );
  }

  if (meQuery.isLoading) {
    return <main className="px-5 py-8" role="status">내 정보를 불러오는 중이에요.</main>;
  }

  if (meQuery.isError || !meQuery.data) {
    return <main className="px-5 py-8 text-red-600" role="alert">내 정보를 불러오지 못했어요. 다시 시도해 주세요.</main>;
  }

  return <ProfileEditForm key={meQuery.data.email} member={meQuery.data} />;
}

function ProfileEditForm({ member }: { member: MemberInfo }) {
  const [form, setForm] = useState({ nickname: member.nickname });
  const updateMeMutation = useUpdateMeMutation();
  const router = useRouter();
  const nickname = form.nickname.trim();
  const canSubmit = nickname.length >= 2 && nickname.length <= 12;

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit || updateMeMutation.isPending) return;

    updateMeMutation.mutate({ nickname }, {
      onSuccess: () => router.push("/mypage"),
    });
  };

  return (
    <main className="mx-auto min-h-[calc(100vh-72px)] w-full max-w-[1200px] px-5 py-8 sm:px-8">
      <h1 className="text-[28px] font-extrabold tracking-[-0.04em]">내 정보 수정</h1>
      <p className="mt-2 text-sm text-[#969da8]">닉네임은 2~12자로 변경할 수 있어요.</p>
      <div className="mt-10 grid gap-10 md:grid-cols-[180px_minmax(0,1fr)]">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="grid size-28 place-items-center rounded-full bg-[#e8eaee]" aria-hidden="true">
            <img className="size-12" src="/icons/movie-icons/person.svg" alt="" />
          </div>
          <p className="text-sm font-bold">프로필 이미지</p>
        </div>
        <form className="grid max-w-[520px] content-start gap-5" onSubmit={handleSubmit} noValidate>
          <div className="grid gap-2">
            <label className="text-sm font-bold" htmlFor="profile-nickname">닉네임</label>
            <input className="rounded-md border border-[#e1e4e8] bg-white px-4 py-3 text-sm outline-none focus:border-[#4169e1]" id="profile-nickname" value={form.nickname} onChange={(event) => setForm({ nickname: event.target.value })} minLength={2} maxLength={12} required />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-bold" htmlFor="profile-email">이메일</label>
            <input className="rounded-md border border-[#e1e4e8] bg-[#f0f2f5] px-4 py-3 text-sm text-[#777f8c]" id="profile-email" type="email" value={member.email} readOnly />
          </div>
          <button className="w-fit rounded-md bg-[#4169e1] px-6 py-3 text-sm font-bold text-white hover:bg-[#3159d4] disabled:cursor-not-allowed disabled:bg-[#b8c7f2]" type="submit" disabled={!canSubmit || updateMeMutation.isPending}>
            {updateMeMutation.isPending ? "저장 중" : "저장"}
          </button>
        </form>
      </div>
    </main>
  );
}
