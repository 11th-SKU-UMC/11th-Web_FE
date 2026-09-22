"use strict";
const members = [
    { id: 1, name: "기범", role: "mentee", githubId: "kibeom-ui" },
    { id: 2, name: "범기", role: "menter", }
];
function findMember(memberId) {
    const member = members.find((member) => member.id === memberId);
    if (member === undefined) {
        return "해당 회원을 찾을 수 없습니다.";
    }
    const githubId = member.githubId ?? "등록되지 않음";
    return member.name + "님은 " + member.role + "이고, Gidhub 아이디는 " + githubId + "입니다.";
}
console.log(findMember(1));
console.log(findMember(2));
console.log(findMember(999));
