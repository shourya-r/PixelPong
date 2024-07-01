import { Ball } from "./ball.js";

const ball = new Ball(document.querySelector("#ball"));
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

window.requestAnimationFrame(update);
