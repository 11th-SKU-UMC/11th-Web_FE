"use client";

import { useState } from "react";
import { useLoginMutation } from "../../hooks/use-login-mutation";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const loginMutation = useLoginMutation();

  const canSubmit =
    EMAIL_REGEX.test(form.email.trim()) && form.password.length > 0;

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit || loginMutation.isPending) return;

    loginMutation.mutate({
      email: form.email.trim(),
      password: form.password,
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2>로그인</h2>

      <div>
        <label>이메일</label>
        <br />
        <input
          type="email"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          style={{ border: "1px solid #ccc", padding: "8px", margin: "4px 0", width: "200px" }}
        />
      </div>

      <div>
        <label>비밀번호</label>
        <br />
        <input
          type="password"
          value={form.password}
          onChange={(e) => handleChange("password", e.target.value)}
          style={{ border: "1px solid #ccc", padding: "8px", margin: "4px 0", width: "200px" }}
        />
      </div>

      <button
        type="submit"
        disabled={!canSubmit || loginMutation.isPending}
        style={{ marginTop: "12px", padding: "6px 12px" }}
      >
        {loginMutation.isPending ? "로그인 중" : "로그인"}
      </button>
    </form>
  );
}
