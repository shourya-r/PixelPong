const INITIAL_VALUE = 0.025;
const VELOCITY_INCREASE = 0.00001;
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

  rect() {
    return this.ballElem.getBoundingClientRect();
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
    this.x += this.direction.x * this.velocity * delta;
    this.y += this.direction.y * this.velocity * delta;
    this.velocity += VELOCITY_INCREASE * delta;
    const rect = this.rect();
    // rect returns the ball's DOMRect Object with properties of size and position
    if (rect.bottom >= window.innerHeight || rect.top <= 0) {
      this.direction.y *= -1;
    }
  }
}
function randomNumberBetween(min, max) {
  return Math.random() * (max - min) + min;
}
export { Ball };
