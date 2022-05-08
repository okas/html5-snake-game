import { SnakeGame } from "./snake-game.js";

// Games bootstrap code.
// speed, board shape, ect.
const snake = new SnakeGame({
  canvasId: "game-canvas",
  rows: 20,
  cols: 20,
  startRow: 2,
  startCol: 2,
  timerInterval: 100,
});

snake.startGame();
