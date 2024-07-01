const SPEED_EASY = 0.1;
const SPEED_MEDIUM = 0.07;
const SPEED_HARD = 0.02;
class Paddle {
  constructor(paddleElem) {
    this.paddleElem = paddleElem;
    this.reset();
  }

  get position() {
    return parseFloat(
      getComputedStyle(this.paddleElem).getPropertyValue("--position")
    );
  }

  set position(value) {
    this.paddleElem.style.setProperty("--position", value);
  }

  reset() {
    this.position = 50;
  }

  rect() {
    return this.paddleElem.getBoundingClientRect();
  }
  update(delta, ballHeight, difficulty) {
    let SPEED;
    // SPEED * delta introduces some error
    if (difficulty == "easy") SPEED = SPEED_EASY;
    else if (difficulty == "medium") SPEED = SPEED_MEDIUM;
    else SPEED = SPEED_HARD;
    this.position += SPEED * delta * (ballHeight - this.position);
  }
}

export { Paddle };
