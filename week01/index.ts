// ----------------------------
// 스터디 회원 관리 프로그램 완성하기
// ----------------------------
// 회원의 ID, 이름, 역할과 선택 값인 GitHub 아이디를 타입으로 표현하고, 서로 다른 정보를 가진 회원 두 명 이상을 작성해요.
// 회원 ID로 정보를 찾아 안내 문구를 만들고, GitHub 아이디가 없는 회원과 존재하지 않는 회원도 오류 없이 처리해요.
// 회원 ID 1, 2, 999를 전달한 결과를 확인하고 pnpm exec tsc --noEmit, 컴파일과 실행을 모두 완료해요.

type Role = "leader" | "member";

interface StudyMember {
    id: number,
    name: string,
    role: Role,
    githubId?: string,
}

const members: StudyMember[] = [
    { id: 1, name: "나윤", role: "member", githubId: "kxxnayun" },
    { id: 2, name: "현강", role: "leader" },
    { id: 3, name: "윤재", role: "member" },
    { id: 4, name: "주영", role: "member" },
    { id: 5, name: "재인", role: "member", githubId: "dlwodls" },
];


function getRoleLabel(role: Role): string {
    if (role === "leader") {
        return "리더";
    }
    return "멤버";
}


function findMemberById(id: number): StudyMember | undefined {
    return members.find((member) => member.id === id);
}


function createMemberGuide(id: number): string {
    const member = findMemberById(id);

    if (!member) {
        return `ID ${id} 회원은 없습니다.`;
    }

    // GitHub 아이디가 없는 회원 처리
    const githubId = member.githubId ?? "등록되지 않음";

    return `${member.name} 님은 스터디 ${getRoleLabel(member.role)}입니다. GitHub: ${githubId}`;
}

// 회원 ID 진단 결과 확인
console.log(createMemberGuide(1));     // 나윤 님은 스터디 멤버입니다. GitHub: kxxnayun
console.log(createMemberGuide(2));     // 현강 님은 스터디 리더입니다. GitHub: 등록되지 않음
console.log(createMemberGuide(999));   // ID 999 회원은 없습니다.