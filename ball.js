class Ball {
  constructor(ballElem) {
    this.ballElem = ballElem;
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

  update(delta) {
    this.x = 60;
    this.y = 59;
  }
}

export { Ball };
