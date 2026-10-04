"use strict";
const members = [
    { id: 1, name: "기범", role: "nomal", githubId: "kibeom" },
    { id: 2, name: "광수", role: "leader" },
];
function foundMember(memberId) {
    const member = members.find((member) => member.id === memberId);
    if (member) {
        const github = member.githubId ?? "깃허브 아이디 없음";
        return member.id + "번 회원의 깃허브 아이디는 " + github;
    }
    return "등록되지 않은 회원";
}
console.log(foundMember(1));
console.log(foundMember(2));
console.log(foundMember(999));
