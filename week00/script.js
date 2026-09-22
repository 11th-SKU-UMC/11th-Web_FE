const message = document.querySelector("#message");
const cheerButton = document.querySelector("#cheer-button");
let isCheered = false;

cheerButton.addEventListener("click", function () {
  if (!isCheered) {
    message.textContent = "응원 감사합니다. 힘이 나요. ㄴ0o0ㄱ";
  } else {
    message.textContent = "응원이 과해요..";
  }
  isCheered = !isCheered;
});