export class Snake {
  head;
  direction;
  body;

  #rows;
  #cols;
  #directionActionMap;

  constructor({ rows, cols, head = 5, direction = "right" }) {
    this.#rows = rows;
    this.#cols = cols;
    this.direction = direction;
    this.head = head;
    this.body = [];

    this.#directionActionMap = new Map([
      ["left", this.#moveHeadLeft.bind(this)],
      ["up", this.#moveHeadUp.bind(this)],
      ["right", this.#moveHeadRight.bind(this)],
      ["down", this.#moveHeadDown.bind(this)],
    ]);
  }

  get hasBittenSelf() {
    return this.body.includes(this.head);
  }

  /**
   * Enforces rule that snake cannot be reversed, it will cause self-bite.
   */
  move() {
    const oldHead = this.head;

    this.#directionActionMap.get(this.direction)();

    this.body.unshift(oldHead);

    return this.body.pop();
  }

  grow() {
    this.body.unshift(this.head);
  }

  // moveHead* uses mathematical algorithms to detect edges.
  // Y composed them partly by trial and error.
  #moveHeadLeft() {
    if ((this.head / this.#cols) % 1) {
      this.head--;
    } else {
      this.head += this.#cols - 1;
    }
  }

  #moveHeadUp() {
    if (this.head < this.#cols) {
      this.head += (this.#cols - 1) * this.#rows;
    } else {
      this.head -= this.#rows;
    }
  }

  #moveHeadRight() {
    if (((this.head + 1) / this.#cols) % 1) {
      this.head++;
    } else {
      this.head -= this.#cols - 1;
    }
  }

  #moveHeadDown() {
    if (this.head >= this.#rows * this.#cols - this.#rows) {
      this.head -= (this.#cols - 1) * this.#rows;
    } else {
      this.head += this.#rows;
    }
  }
}
