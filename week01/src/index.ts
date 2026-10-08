// const courseName = "TypeScript";
// console.log("이번 주 학습 주제: " + courseName);

// const currentLevel: number = 1;
// console.log("현재 레벨: " + currentLevel);

// const memberNames = ["광수"];
// console.log(memberNames[0].toUpperCase());

// function introduceStudent(studentName: string, currentLevel: number) {
//   return studentName + " 님은 현재 " + currentLevel + "레벨이에요.";
// }

// introduceStudent("광수", 1);

// const firstMember = { name: "광수" };
// const secondMember = { name: "광수" };
// const sameMember = firstMember;

// console.log(firstMember === secondMember); // false
// console.log(firstMember === sameMember); // true

// const studyMember = { name: "광수" };

// studyMember.name = "지수";

// console.log(studyMember.name); // "지수"

// // studyMember = { name: "현우" };

// type MemberProfile = {
//   name: string;
// };

// type GithubProfile = {
//   githubId: string;
// };

// type MemberWithGithub = MemberProfile & GithubProfile;

// const gwangsooProfile: MemberWithGithub = {
//   name: "광수",
//   githubId: "gwangsoo",
// };

// console.log(gwangsooProfile.name, gwangsooProfile.githubId);

// type StudentName = string;

// interface StudyMember {
//   name: StudentName;
// }

// interface StudyMember {
//   level: number;
// }

// const member: StudyMember = {
//   name: "광수",
//   level: 1,
// };

// type WeeklyGoal = {
//   title: string;
//   targetCount: number;
// };

// const weeklyGoal: WeeklyGoal = {
//   title: "TypeScript 예제 연습",
//   targetCount: 3,
// };

// function printGoal(goal: WeeklyGoal): string {
//   const result = `목표: ${goal.title}, 횟수: ${goal.targetCount}`;
//   console.log(result);
//   return result;
// }

type Role = 'ADMIN' | 'USER'

interface Member{
    id: number;
    name: String;
    role: Role;
    githubId?: String;
}

const members: Member[] = [
    {
        id: 1,
        name: "강동균",
        role: 'ADMIN',
        githubId: "rkdehdrbs7885-oss"
    },
    {
        id: 2,
        name: "김동균",
        role: 'USER'
    }
];

function getMember(id: number): String{
    const member = members.find((member) => member.id === id);
    if (!member){
        return `ID가 ${id}인 회원을 찾을 수 없습니다.`;
    }
    const githubText = member.githubId ?? '없음';
    return `[회원 정보] ID: ${member.id} | 이름: ${member.name} | 역할: ${member.role} | GitHub: ${githubText}`;
}

console.log(getMember(1));
console.log(getMember(2));
console.log(getMember(999));