const courseName = "TypeScript";
console.log("이번 주 학습 주제: " + courseName);

const currentLevel: number = 1;
console.log("현재 레벨: " + currentLevel);

const memberNames = ["광수"];
console.log(memberNames[0].toUpperCase());

function introduceStudent(studentName: string, currentLevel: number) {
  return studentName + " 님은 현재 " + currentLevel + "레벨이에요.";
}

introduceStudent("광수", 1);

const firstMember = { name: "광수" };
const secondMember = { name: "광수" };
const sameMember = firstMember;

console.log(firstMember === secondMember); // false
console.log(firstMember === sameMember); // true

const studyMember = { name: "광수" };

studyMember.name = "지수";

console.log(studyMember.name); // "지수"

// studyMember = { name: "현우" };

type MemberProfile = {
  name: string;
};

type GithubProfile = {
  githubId: string;
};

type MemberWithGithub = MemberProfile & GithubProfile;

const gwangsooProfile: MemberWithGithub = {
  name: "광수",
  githubId: "gwangsoo",
};

console.log(gwangsooProfile.name, gwangsooProfile.githubId);

type StudentName = string;

interface StudyMember {
  name: StudentName;
}

interface StudyMember {
  level: number;
}

const member: StudyMember = {
  name: "광수",
  level: 1,
};