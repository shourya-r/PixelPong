import { Ball } from "./ball.js";
import { Paddle } from "./paddle.js";

const ball = new Ball(document.querySelector("#ball"));
const playerPaddle = new Paddle(document.querySelector("#player-paddle"));
const computerPaddle = new Paddle(document.querySelector("#computer-paddle"));
let lastTime;
function update(time) {
  // if lastTime is not NULL then we update
  if (lastTime != null) {
    // find time which has passed since next frame
    const delta = time - lastTime;
    // we pass delta because it fluctuates
    ball.update(delta);
  }

  lastTime = time;
  window.requestAnimationFrame(update);
}
// player paddle will move wherever the mouse moves
document.addEventListener("mousemove", (e) => {
  playerPaddle.position = (e.y / window.innerHeight) * 100;
});

window.requestAnimationFrame(update);
