import { Snake } from "./snake.js";

export class SnakeGame {
  #canvasId;
  #rows;
  #cols;
  #headStart;
  #startDirection;
  #timerInterval;
  #timerId;

  #appleCell;
  #snake;

  #elemCanvas;
  #elemCells;
  #elemGameOver;

  #keyDirectionMap;

  constructor({
    canvasId = "canvasId",
    rows = 3,
    cols = 3,
    startRow = 2,
    startCol = 2,
    startDirection = "right",
    timerInterval = 200,
  }) {
    this.#canvasId = canvasId;
    this.#rows = rows;
    this.#cols = cols;
    this.#timerInterval = timerInterval;
    this.#timerId = null;

    this.#headStart = (startRow - 1) * cols + startCol - 1;
    this.#startDirection = startDirection;

    this.#initHTMLElements();
    this.#resetCanvasLayout();
    this.#mapKeysToDirections();
    this.#mapKeys();
  }

  startGame() {
    this.#resetCanvas();
    this.#deliverSnake();
    this.#generateApple();
    this.#initGameLoop();
  }

  #initGameLoop() {
    this.#timerId = setInterval(() => {
      this.#advanceSnake();
      this.#checkGameOver();
      this.#checkSnakeApple();
    }, this.#timerInterval);
  }

  #advanceSnake() {
    const lastPart = this.#snake.move();
    this.#elemCells[lastPart].classList.remove("snake");
    this.#elemCells[this.#snake.head].classList.add("snake");
  }

  #checkGameOver() {
    if (!this.#snake.hasBittenSelf) {
      return;
    }
    clearInterval(this.#timerId);
    this.#elemGameOver.style.display = "block";
  }

  #checkSnakeApple() {
    if (this.#appleCell !== this.#snake.head) {
      return;
    }
    this.#snake.grow();
    this.#elemCells[this.#appleCell].classList.replace("apple", "snake");
    this.#generateApple();
  }

  #deliverSnake(headStart) {
    this.#snake = new Snake({
      rows: this.#rows,
      cols: this.#cols,
      head: this.#headStart,
      direction: this.#startDirection,
    });
    this.#elemCells[this.#snake.head].classList.add("snake");
  }

  #generateApple() {
    let randomCellIndex;

    do {
      randomCellIndex = (Math.random() * this.#elemCells.length) >> 0;
    } while (
      this.#snake.body.includes(randomCellIndex) ||
      this.#snake.head === randomCellIndex
    );

    this.#appleCell = randomCellIndex;
    this.#elemCells[randomCellIndex].classList.add("apple");
  }

  #initHTMLElements() {
    this.#elemCanvas = document.getElementById(this.#canvasId);
    this.#elemGameOver = document.getElementById("game-over");
  }

  #resetCanvas() {
    this.#resetCanvasLayout();
    this.#elemCells = this.#createBoard();
    this.#elemCanvas.replaceChildren(...this.#elemCells);
  }

  #resetCanvasLayout() {
    this.#elemCanvas.style.gridTemplateColumns = `repeat(${this.#cols}, 20px)`;
  }

  #createBoard() {
    const totalCells = this.#rows * this.#cols;

    return [...Array(totalCells).keys()].map((k) => {
      const cell = document.createElement("div");
      cell.id = `${k}`;
      // Currently only for DOM debugging purposes
      const p1Index = k + 1;
      cell.dataset.row = Math.ceil(p1Index / this.#cols) || 1;
      cell.dataset.col = Math.ceil(p1Index / this.#rows) || 1;
      return cell;
    });
  }

  #mapKeysToDirections() {
    this.#keyDirectionMap = new Map([
      ["ArrowLeft", "left"],
      ["ArrowUp", "up"],
      ["ArrowRight", "right"],
      ["ArrowDown", "down"],
    ]);
  }

  #mapKeys() {
    document.onkeyup = (({ key }) =>
      (this.#snake.direction = this.#keyDirectionMap.get(key))).bind(this);
  }
}
