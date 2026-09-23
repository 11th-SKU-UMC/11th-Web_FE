/*스터디 회원 관리 프로그램 완성하기
    - 회원의 ID, 이름, 역할과 선택 값인 GitHub 아이디를 타입으로 표현하고,
     서로 다른 정보를 가진 회원 두 명 이상을 작성해요.
    - 회원 ID로 정보를 찾아 안내 문구를 만들고, GitHub 아이디가 없는 회원과
     존재하지 않는 회원도 오류 없이 처리해요.
    - 회원 ID `1`, `2`, `999`를 전달한 결과를 확인하고 
    `pnpm exec tsc --noEmit`, 컴파일과 실행을 모두 완료해요.
*/
type Member = {
    id: number;
    name: string;
    role: string;
    githubId?: string;
};

const members: Member[] = [
    {id: 1, name: "기범", role: "mentee", githubId: "kibeom-ui"},
    {id: 2, name: "범기", role: "menter", }
]

function findMember(memberId: number): string {
    const member = members.find((member)=>member.id === memberId);

    if(member === undefined) {
        return "해당 회원을 찾을 수 없습니다.";
    }

    const githubId = member.githubId ?? "등록되지 않음";
    return member.name + "님은 " + member.role + "이고, Gidhub 아이디는 " + githubId + "입니다.";
}

console.log(findMember(1));
console.log(findMember(2));
console.log(findMember(999));