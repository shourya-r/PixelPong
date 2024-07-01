import { Ball } from "./ball.js";
import { Paddle } from "./paddle.js";
const startModal = document.querySelector(".start-modal");
startModal.showModal();
const endModal = document.querySelector(".end-modal");
const playAgainButton = document.querySelector(".play-again-button");
const startButton = document.querySelector(".start-button");
const ball = new Ball(document.querySelector("#ball"));
const playerPaddle = new Paddle(document.querySelector("#player-paddle"));
const computerPaddle = new Paddle(document.querySelector("#computer-paddle"));
const computerScore = document.querySelector(".computer-score");
const playerScore = document.querySelector(".player-score");

startButton.addEventListener("click", () => {
  startModal.close();
  window.requestAnimationFrame(update);
});

playAgainButton.addEventListener("click", () => {
  endModal.close();
  startModal.showModal();
});

let lastTime;
function update(time) {
  // If score = 5 then end game
  if (playerScore.textContent == 5 || computerScore.textContent == 5) {
    resetGame();
    return;
  }
  // if lastTime is not NULL then we update
  if (lastTime != null) {
    // find time which has passed since next frame
    const delta = time - lastTime;
    // we pass delta because it fluctuates
    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
    computerPaddle.update(delta, ball.y);

    const hue = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--hue")
    );
    document.documentElement.style.setProperty("--hue", hue + delta * 0.01);

    if (isBallOut()) {
      handleLose();
    }
  }

  lastTime = time;
  window.requestAnimationFrame(update);
}
function resetGame() {
  playerScore.textContent = 0;
  computerScore.textContent = 0;
  endModal.showModal();
}

function isBallOut() {
  const rect = ball.rect();
  return rect.left <= 0 || rect.right >= window.innerWidth;
}

function handleLose() {
  const rect = ball.rect();
  if (rect.right >= window.innerWidth) {
    const currScore = Number(playerScore.textContent);
    playerScore.textContent = currScore + 1;
  } else {
    const currScore = Number(computerScore.textContent);
    computerScore.textContent = currScore + 1;
  }
  ball.reset();
  computerPaddle.reset();
}

// player paddle will move wherever the mouse moves
document.addEventListener("mousemove", (e) => {
  playerPaddle.position = (e.y / window.innerHeight) * 100;
});
