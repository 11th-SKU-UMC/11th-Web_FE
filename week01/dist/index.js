"use strict";
const members = [
    { id: 1, name: "코라", role: "leader", githubId: "kora" },
    { id: 2, name: "도비", role: "member" },
];
function findMemberById(memberId) {
    return members.find((member) => member.id === memberId);
}
function createRoleMessage(role) {
    if (role === "leader") {
        return "스터디를 이끌어요.";
    }
    return "스터디에 참여해요.";
}
function createMemberMessage(memberId) {
    const foundMember = findMemberById(memberId);
    if (!foundMember) {
        return `${memberId}번 회원을 찾지 못했어요.`;
    }
    const displayGithubId = foundMember.githubId ?? "등록되지 않음";
    const roleMessage = createRoleMessage(foundMember.role);
    return `${foundMember.name} 님 (${roleMessage}) / GitHub: ${displayGithubId}`;
}
console.log(createMemberMessage(1));
console.log(createMemberMessage(2));
console.log(createMemberMessage(999));
const typeMember = { id: 3, name: "선미1", role: "member" };
console.log(typeMember);
// 선택 미션 2
const studyHour = 0;
console.log(studyHour || 1);
console.log(studyHour ?? 1);
// 선택 미션 3
function formatMemberId(input) {
    if (typeof input === "number") {
        return "MEMBER-" + input;
    }
    if (typeof input === "string") {
        return input.toUpperCase();
    }
    return "회원 ID를 확인할 수 없어요.";
}
console.log(formatMemberId(1));
console.log(formatMemberId("member-01"));
console.log(formatMemberId(true));
