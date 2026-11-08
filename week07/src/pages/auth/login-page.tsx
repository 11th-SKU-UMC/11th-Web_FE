import { useState } from "react";

export function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("로그인 시도 데이터:", form);
    alert("로그인 버튼을 눌렀습니다.");
    // 8주차에서 실제 로그인 API 연동 예정
  };

  return (
    <form onSubmit={handleSubmit}>
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

      <button type="submit" style={{ marginTop: "12px", padding: "6px 12px" }}>
        로그인
      </button>
    </form>
  );
}