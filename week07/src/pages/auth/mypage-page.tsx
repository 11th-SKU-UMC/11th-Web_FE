import { useState } from "react";

export function MyPage() {
  // 임시로 화면에 띄울 초기 데이터
  const [nickname, setNickname] = useState("steven"); 

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`닉네임이 '${nickname}'(으)로 수정되었습니다.`);
  };

  return (
    <form onSubmit={handleUpdate}>
      <h2>내 정보 조회 및 수정</h2>
      
      <div>
        <label>이메일 (수정 불가)</label>
        <br />
        <input
          type="email"
          value="rkdehdrbs7885@gmail.com"
          disabled
          style={{ 
            border: "1px solid #eee", 
            padding: "8px", 
            margin: "4px 0", 
            width: "200px",
            backgroundColor: "#f9f9f9" 
          }}
        />
      </div>

      <div>
        <label>닉네임 수정</label>
        <br />
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          style={{ border: "1px solid #ccc", padding: "8px", margin: "4px 0", width: "200px" }}
        />
      </div>

      <button type="submit" style={{ marginTop: "12px", padding: "6px 12px" }}>
        수정하기
      </button>
    </form>
  );
}