console.log("Hello, Web!");
        
        const level = 1;
        if (level === 0) {
            console.log("처음 시작합니다.");
        } else {
            console.log("한 단계 성장했습니다.");
        }

        const skills = ["HTML", "CSS", "JavaScript"];
        for (const skill of skills) {
            console.log(skill);
        }

        function makeGreeting(name) {
            return `${name}님, 반갑습니다!`;
        }

        // 변수명 중복 해결: greetingText와 messageElement로 구분
        const greetingText = makeGreeting("동균");
        console.log(greetingText);

        const messageElement = document.querySelector("#message");
        const greetingButton = document.querySelector("#greeting-button");

        greetingButton.addEventListener("click", function () {
            messageElement.textContent = "웹 개발을 시작합니다!";
        });
        const button = document.querySelector("#start-button");

        button.addEventListener("click", function () {
          console.log("시작합니다!");
        });