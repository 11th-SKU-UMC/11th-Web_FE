const courseName = "TypeScript";
console.log("이번 주 학습 주제: " + courseName);

function introduceStudent(studentName: string, currentLevel: number) {
    return studentName + " 님은 현재 " + currentLevel + "레벨이에요.";
}

introduceStudent("광수", 1);

let studentName = "광수";
let currentLevel = 1;
let isCompleted = false;
const technologies: string[] = ["HTML", "CSS", "JavaScript", "TypeScript"];

console.log(studentName, currentLevel, isCompleted, technologies);

const user1 = { name: "Lee", age: 20 };
const user2 = { name: "Lee", age: 20 };

console.log(user1 === user2); // false


type StudyMembers = {
    name: string;
    level: number;
    isLeader: boolean;
};

const member: StudyMembers = {
    name: "광수",
    level: 1,
    isLeader: false
};

function createMemberCard(studyMembers: StudyMembers) {
    return studyMembers.name + " 님, " + studyMembers.level + "레벨";
}

console.log(createMemberCard(member));

type MemberRole = "leader" | "member";

function getRoleMessage(role: MemberRole): string {
    if (role === "leader") {
        return "스터디를 이끌어요.";
    }

    return "스터디에 참여해요.";
}

console.log(getRoleMessage("leader")); // 스터디를 이끌어요.
console.log(getRoleMessage("member")); // 스터디에 참여해요.

type StudyMember = {
    name: string;
    githubId?: string;
};

const members: StudyMember[] = [
    { name: "광수", githubId: "gwangsoo" },
    { name: "지수" },
];

let selectedMember: StudyMember | null = null;
const foundMember = members.find((member) => member.name === "현우");

console.log(selectedMember); // null
console.log(foundMember); // undefined

if (foundMember) {
    console.log(foundMember.name);
} else {
    console.log("회원을 찾지 못했습니다.");
}

const studyTime = 0;

console.log(studyTime || 1); // 1
console.log(studyTime ?? 1); // 0

const memberWithoutGithub = members[1];

console.log(memberWithoutGithub?.githubId ?? "등록되지 않음");


function formatStudyWeek(week: unknown) {
    if (typeof week === "number") {
        return `현재 ${week}주차예요.`;
    }

    if (typeof week === "string") {
        return `입력한 주차: ${week}`;
    }

    return "주차를 확인할 수 없어요.";
}

console.log(formatStudyWeek(3));       // 현재 3주차예요.
console.log(formatStudyWeek("4주차")); // 입력한 주차: 4주차
console.log(formatStudyWeek(true));    // 주차를 확인할 수 없어요.

type StudyMember_2 = {
    name: string;
    level: number;
};

function createBox<T>(value: T) {
    return { value };
}

const textBox = createBox("TypeScript");
const numberBox = createBox(11);

const memberBox = createBox<StudyMember_2>({
    name: "광수",
    level: 1,
});

type WeeklyGoal = {
    title: string;
    targetCount: number;
};

const weeklyGoal: WeeklyGoal = {
    title: "TypeScript 예제 연습",
    targetCount: 3,
};

function printGoal(goal: WeeklyGoal): string {
    return goal.title;
}

console.log(printGoal(weeklyGoal));

interface MemberProfile {
    id: number;
    name: string;
    role: "leader" | "member";
    githubId?: string;
}

const studyMembers: MemberProfile[] = [
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

function getMemberMessage(memberId: number): string {
    const member = studyMembers.find((item) => item.id === memberId);

    if (!member) {
        return "회원을 찾을 수 없어요.";
    }

    const githubMessage = member.githubId ?? "등록되지 않음";

    return `${member.name}님은 ${member.role}예요. GitHub: ${githubMessage}`;
}

console.log(getMemberMessage(1));
console.log(getMemberMessage(2));
console.log(getMemberMessage(999));

// 선택 미션 1
type StudyMemberType = {
    id: number;
    name: string;
    role: "leader" | "member";
    githubId?: string;
};

// interface와 type은 둘 다 객체의 형태를 정의할 수 있다.
// interface는 같은 이름으로 여러 번 선언하면 내용이 합쳐질 수 있다.
// type은 유니언 타입처럼 객체 외의 타입 조합에도 사용할 수 있다.

// 선택 미션 2
const studyHour: number | undefined = 0;

console.log(studyHour || 1); // 1
console.log(studyHour ?? 1); // 0

// ||는 0도 거짓으로 판단해 1을 반환한다.
// ??는 null 또는 undefined일 때만 기본값을 사용하므로 0을 유지한다.

// 선택 미션 3
function formatMemberId(input: unknown): string {
    if (typeof input === "number") {
        return `회원 ID: ${input}`;
    }

    if (typeof input === "string") {
        return `문자열 ID: ${input}`;
    }

    return "올바른 회원 ID가 아니에요.";
}

console.log(formatMemberId(1));
console.log(formatMemberId("member-1"));
console.log(formatMemberId(true));