const message = document.querySelector("#message");
const cheerButton = document.querySelector("#cheer-button");

let isCheered = false;

cheerButton.addEventListener("click", function () {
  if (isCheered) {
    message.textContent = "HTML, CSS, JavaScript를 배우고 있습니다.";
  } else {
    message.textContent = "좋아요! 작은 코드부터 직접 바꾸어 봅시다. 🚀";
  }

  isCheered = !isCheered;
});