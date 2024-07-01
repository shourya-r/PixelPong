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
  update(delta) {
    this.x = 5;
  }
}

export { Ball };
