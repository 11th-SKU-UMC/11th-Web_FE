// 2.
// const courseName = "TypeScript";
// console.log("이번 주 학습 주제: " + courseName);

// const currentLevel: number = 1;
// console.log("현재 레벨: " + currentLevel);

// // const memberNames = ["광수"];
// // console.log(memberNames[5].toUpperCase());

// function introduceStudent(studentName: string, currentLevel: number) {
//   return studentName + " 님은 현재 " + currentLevel + "레벨이에요.";
// }

// introduceStudent("광수", 1);

// 3.
// let studentName = "광수";
// let currentLevel = 1;
// let isCompleted = false;

// console.log(studentName, currentLevel, isCompleted);

// const firstMember = { name: "광수" };
// const secondMember = { name: "광수" };
// const sameMember = firstMember;

// console.log(firstMember === secondMember); // false
// console.log(firstMember === sameMember); // true

// const studyMember = { name: "광수" };

// studyMember.name = "지수";

// console.log(studyMember.name); // "지수"

// // studyMember = { name: "현우" };

// const studentNames: string[] = ["광수", "지수", "현우"];
// const weeklyScores: number[] = [80, 90, 100];

// studentNames.push("수빈");
// // studentNames.push(123); // number는 넣을 수 없다는 오류가 보여요.

// 3. 미니 실습
// const myName = "김나윤"; // string
// const currentWeek = 1; // number
// const isCompleted = true; // boolean

// const skill = ["react", "tailwind css", "typescript"];

// // skill.push(1);

// const myAge = { age: 23 };
// const yourAge = { age: 23 };

// console.log(myAge === yourAge);

// 4.
// const student: {
//   name: string;
//   level: number;
//   isCompleted: boolean;
// } = {
//   name: "광수",
//   level: 1,
//   isCompleted: false,
// };

// type Student = {
//   name: string;
//   level: number;
//   isCompleted: boolean;
//   githubId?: string;
// };

// const nayun: Student = {
//   name: "나윤",
//   level: 1,
//   isCompleted: true,
// };

// function createGreeting(studentName: string) {
//   console.log("반가워요, ", studentName, "님!");
// }

// const greetingMessage = createGreeting("나윤");

// type memberProfile = {
//   name: string;
// };

// type githubProfile = {
//   github: string;
// };

// type profile = memberProfile & githubProfile;

// const nayunProfile: profile = {
//   name: "김나윤",
//   github: "kxxnayun",
// };

// console.log(nayunProfile);
// console.log(nayunProfile.name, nayunProfile.github);

// interface StudyMember {
//   name: string;
// }

// interface StudyMember {
//   level: number;
// }

// const member: StudyMember = {
//   name: "나윤",
//   level: 1,
// };

// 4. 미니 실습
// type StudyMember = {
//   name: string;
//   level: number;
//   isLeader?: string;
// };

// const member: StudyMember = {
//   name: "나윤",
//   level: 1,
// };

// function createMemberCard(studyMember: StudyMember) {
//   return studyMember.name + "님 " + studyMember.level + "레벨입니다.";
// }

// console.log(createMemberCard(member));

// 5.
// function printMemberId(memberId: string | number) {
//   console.log(memberId);
// }

// printMemberId("Id-1");
// printMemberId(1);

// function formatMemberId(memberId: string | number) {
//   if (typeof memberId === "string") {
//     return memberId.toUpperCase();
//   }
//   return "MEMBER-" + memberId;
// }

// type MemberRole = "leader" | "member";
// type AttendanceStatus = "present" | "late" | "absent";

// const nayunRole: MemberRole = "member";
// const todayStatus = "present";

// type StudyResult =
//   | { status: "success"; completedCount: number }
//   | { status: "error"; message: string };

// function printStudyResult(result: StudyResult) {
//   if (result.status === "success") {
//     console.log("완료한 과제: " + result.completedCount);
//     return;
//   }

//   console.log("오류: " + result.message);
// }

// 5. 미니 실습
// type MemberRole = "leader" | "member";

// function RoleMessage(role: MemberRole) {
//   if (role === "leader") {
//     console.log("스터디를 이끌어요.");
//     return;
//   }

//   console.log("스터디에 참여해요.");
// }

// RoleMessage("leader");

// 6.
// type StudyMember = {
//   name: string;
//   githubId?: string;
// };

// const members: StudyMember[] = [
//   { name: "광수", githubId: "gwangsoo" },
//   { name: "지수" },
// ];

// let selectedMember: StudyMember | null = null;
// const foundMember = members.find((member) => member.name === "현우");

// console.log(selectedMember); // null
// console.log(foundMember); // undefined

// 6. 미니 실습
// type StudyMember = {
//   name: string;
//   githubId?: string;
// };
// const members: StudyMember[] = [
//   { name: "광수", githubId: "gwangsoo" },
//   { name: "지수" },
// ];

// let selectedMember: StudyMember | null = null;

// selectedMember = members.find((member) => member.name === "광수") ?? null;

// if (selectedMember) {
//   console.log(selectedMember.name);
// }

// const studyTime = 0;
// console.log(studyTime || 60);
// console.log(studyTime ?? 60);

// const nayun = members.find((member) => member.name === "나윤");
// console.log(nayun?.githubId ?? "등록되지 않음");

// 7.
// function printNickname(nickname: unknown) {
//   if (typeof nickname === "string") {
//     console.log(nickname.toUpperCase());
//     return;
//   }

//   console.log("닉네임은 문자열이어야 해요.");
// }

// printNickname("gwangsoo");
// printNickname(123);

// 7. 미니실습
// function formatStudyWeek(week: unknown) {
//   if (typeof week === "number") {
//     console.log("현재 " + week + "주차예요.");
//     return;
//   } else if (typeof week === "string") {
//     console.log("입력한 주차: " + week);
//     return;
//   } else {
//     console.log("주차를 확인할 수 없어요.");
//   }
// }

// formatStudyWeek(1);
// formatStudyWeek("1주차");
// formatStudyWeek(true);

// 8.
// function keepValue<T>(value: T) {
//   return value;
// }

// const studentName = keepValue<string>("광수");
// const currentLevel = keepValue<number>(1);
// const isCompleted = keepValue(false);

// 8. 미니 실습
// type Member = {
//   name: string;
//   level: number;
// };
// function createBox<T>(value: T) {
//   return { value };
// }

// const nameBox = createBox<string>("나윤");
// const levelBox = createBox<number>(1);

// const member: Member = {
//   name: "광수",
//   level: 2,
// };

// const memberBox = createBox(member);

// 9. 미니 실습
// type WeeklyGoal = {
//   title: string;
//   targetCount: number;
// };

// const weeklyGoal: WeeklyGoal = {
//   title: "TypeScript 예제 연습",
//   targetCount: 3,
// };

// function printGoal(goal: WeeklyGoal): void {
//   console.log(goal.title);
// }
