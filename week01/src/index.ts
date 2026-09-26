type MemberRole = "스터디장" | "스터디원";

interface StudyMember {
  id: number;
  name: string;
  role: MemberRole;
  githubId?: string;
}

type StudyMemberType = {
  id: number;
  name: string;
  role: MemberRole;
  githubId?: string;
};

// type과 interface는 모두 객체가 가져야 할 프로퍼티와 타입을 정의 가능
// interface는 extends로 상속 가능, 동일 이름은 내용 합쳐짐.
// type은 여러 타입을 조합하거나 표현 가능

// 회원 id, 이름, 역할, 선택값 githubId
const members: StudyMember[] = [
  { id: 1, name: "민재", role: "스터디장", githubId: "codedbyminjae" },
  { id: 2, name: "민수", role: "스터디원" },
];

// 회원 아이디로 정보 조회
function createMemberGuide(memberId: number): string {
  const member = members.find(({ id }) => id === memberId);

  // 존재하지 않는 회원 처리
  if (!member) {
    return `ID가 ${memberId}인 회원을 찾을 수 없습니다.`;
  }

  // 깃허브 아이디 없는 회원 처리
  const githubGuide = member.githubId
    ? `GitHub 아이디는 ${member.githubId}입니다.`
    : "등록된 GitHub 아이디가 없습니다.";

  return `${member.name}님은 ${member.role}입니다. ${githubGuide}`;
}

// Test
[1, 2, 999].forEach((memberId) => {
  console.log(createMemberGuide(memberId));
});

const studyHour: number | undefined = 0;

console.log(studyHour || 1); // 1
console.log(studyHour ?? 1); // 0

// || 0을 falsy 값으로 판단 -> 1 반환
// ?? null undefined일 때만 오른쪽 값을 반환.

function formatMemberId(input: unknown): string {
  if (typeof input === "number") {
    return `숫자 회원 ID: ${input}`;
  }

  if (typeof input === "string") {
    return `문자열 회원 ID: ${input}`;
  }

  return "처리할 수 없는 회원 ID입니다.";
}

console.log(formatMemberId(1));
console.log(formatMemberId("2"));
console.log(formatMemberId(false));
