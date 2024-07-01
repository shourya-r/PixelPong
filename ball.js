const INITIAL_VALUE = 0.25;
class Ball {
  constructor(ballElem) {
    this.ballElem = ballElem;
    this.reset();
  }

  // update x and y position with getter and setter
  get x() {
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"));
  }

  set x(value) {
    this.ballElem.style.setProperty("--x", value);
  }

  get y() {
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"));
  }

  set y(value) {
    this.ballElem.style.setProperty("--y", value);
  }

  // 1.set ball to be in center initially
  // 2.the direction is 0 initially
  // 3.we have direction as unit vector so only velocity determines
  // how fast we are going
  reset() {
    this.x = 50;
    this.y = 50;
    this.direction = { x: 0 };
    // check to make sure ball isn't moving only horizontally or vertically
    while (
      Math.abs(this.direction.x) <= 0.2 ||
      Math.abs(this.direction.x) >= 0.9
    ) {
      // get a random direction between 0 and 360
      const heading = randomNumberBetween(0, 2 * Math.PI);
      // then get the direction using cos and sin
      this.direction = { x: Math.cos(heading), y: Math.sin(heading) };
    }
    this.velocity = INITIAL_VALUE;
  }

  update(delta) {
    this.x += this.direction.x * this.velocity;
    this.y += this.direction.y * this.velocity;
  }
}
function randomNumberBetween(min, max) {
  return Math.random() * (max - min) + min;
}
export { Ball };
