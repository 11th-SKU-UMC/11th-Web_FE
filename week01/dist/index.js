"use strict";
// const courseName = "TypeScript";
// console.log("이번 주 학습 주제: " + courseName);
const members = [
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
function getMember(id) {
    const member = members.find((member) => member.id === id);
    if (!member) {
        return `ID가 ${id}인 회원을 찾을 수 없습니다.`;
    }
    const githubText = member.githubId ?? '없음';
    return `[회원 정보] ID: ${member.id} | 이름: ${member.name} | 역할: ${member.role} | GitHub: ${githubText}`;
}
console.log(getMember(1));
console.log(getMember(2));
console.log(getMember(999));
