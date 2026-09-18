type MemberRole = "leader" | "member";

type StudyMember = {
  id: number;
  name: string;
  role: MemberRole;
  githubId?: string;
};

const members: StudyMember[] = [
  {
    id: 1,
    name: "광수",
    role: "leader",
    githubId: "gwangsoo",
  },
  {
    id: 2,
    name: "지수",
    role: "member",
  },
];

function getMemberInfo(id: number): string {
  const member = members.find((member) => member.id === id);

  if (!member) {
    return "존재하지 않는 회원입니다.";
  }

  const githubId = member.githubId ?? "등록되지 않음";

  return (
    "이름: " +
    member.name +
    ", 역할: " +
    member.role +
    ", GitHub ID: " +
    githubId
  );
}

console.log(getMemberInfo(1));
console.log(getMemberInfo(2));
console.log(getMemberInfo(999));

interface StudyMemberInterface {
  id: number;
  name: string;
  role: MemberRole;
  githubId?: string;
}

const studyHour: number | undefined = 0;

console.log(studyHour || 1);
console.log(studyHour ?? 1);

function formatMemberId(input: unknown): string {
  if (typeof input === "number") {
    return "숫자 ID: " + input;
  }

  if (typeof input === "string") {
    return "문자열 ID: " + input;
  }

  return "올바르지 않은 ID입니다.";
}

console.log(formatMemberId(1));
console.log(formatMemberId("2"));
console.log(formatMemberId(true));