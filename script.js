import { Ball } from "./ball.js";
import { Paddle } from "./paddle.js";

const startModal = document.querySelector(".start-modal");
startModal.showModal();
const endModal = document.querySelector(".end-modal");
const playAgainButton = document.querySelector(".play-again-button");
const startButton = document.querySelector(".start-button");
const easyButton = document.querySelector(".difficulty-button.easy");
const mediumButton = document.querySelector(".difficulty-button.medium");
const hardButton = document.querySelector(".difficulty-button.hard");
const ball = new Ball(document.querySelector("#ball"));
const playerPaddle = new Paddle(document.querySelector("#player-paddle"));
const computerPaddle = new Paddle(document.querySelector("#computer-paddle"));
const computerScore = document.querySelector(".computer-score");
const playerScore = document.querySelector(".player-score");

let difficulty;

// Function to initialize scores (new function)
function initializeScores() {
  playerScore.textContent = 0;
  computerScore.textContent = 0;
}

// Updated startButton event listener to reset scores when the game starts
startButton.addEventListener("click", () => {
  initializeScores(); // Reset scores
  ball.reset();
  startModal.close();
  window.requestAnimationFrame(update);
});

// Updated playAgainButton event listener to reset scores when playing again
playAgainButton.addEventListener("click", () => {
  initializeScores(); // Reset scores
  endModal.close();
  startModal.showModal();
});

easyButton.addEventListener("click", () => {
  difficulty = "easy";
});

mediumButton.addEventListener("click", () => {
  difficulty = "medium";
});

hardButton.addEventListener("click", () => {
  difficulty = "hard";
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
    computerPaddle.update(delta, ball.y, difficulty);

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

// Updated resetGame function to reset scores when the game resets
function resetGame() {
  initializeScores(); // Reset scores
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
