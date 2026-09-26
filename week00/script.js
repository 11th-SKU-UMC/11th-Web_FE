const message = document.querySelector("#message");
const cheerButton = document.querySelector("#cheer-button");
const introduceMessage = "Spring, React, JavaScript를 배우고 있습니다.";
const cheerMessage = "좋아요! 작은 코드부터 직접 바꾸어 봅시다. 🚀";

cheerButton.addEventListener("click", function () {
  if (message.textContent === introduceMessage) {
    message.textContent = cheerMessage;
  } else {
    message.textContent = introduceMessage;
  }
});
