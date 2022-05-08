# html5-snake-game

## About Algorithm

All _cells_ that make up games-board/canvas are rendered as collection of 1-dimensional array of `div`. elements.

These cells as HTMLElement instances are also captured into an 1-dimensional array. It supports easy _apple_ generation and simpler data structures (`Number` vs `{}`) that are supposed to be sent around in the game or to ge compared etc.

Game UI state (board cell classes: _apple_ and _snake_) are applied to DOM directly. DOM node access is direct via array of HTMLElement instances array, it is not performed via DOM query APIs.

### Snake movement management

If snake's head is advanced by one cell, _next_ cell in DOM is decorated by _snake_ class. In case of _next_ cell is _apple_ then in-place class swap is performed.

`Snake.move()` method returns popped, e.g. body's last cell and by this value canvas' exact cell will get _snake_ class removed.

## UI rendering

As mentioned before no tabular HTML is used as it allows to keep things more simpler.
Instead, array of `div`-s is "folded" to row br **CSS grid**.

There is _default_ structure and rules for canvas in _.html ja and _.css files. On `snakeGame` instantataion the property of `element.style.gridTemplateColumns` is corrected so styling wont' suffer.

### Advantages

- No need to have duplicate internal artifacts.
- If there are las artifacts, then there will be less state management work to be done.
  - There are no separate internal state refresh taks.
- Less system resources and time needed to manage game's and UI state.
  - There are no specific UI refresh taks, that will redraw all teh canvas' state.

### Disadvantages

- Lack of 2-dimensional internal state bit it more difficult to create moving algorithms in `Snake.moveHead*()` methods. But it is one-time work anyway and can be mitigated by documentation.

## Classes description

1. `Snake` class manages head and body as array of body part positions on canvas.
1. `SnakeGame` class manages canvas or UI and interaction with game objects.

Both classes have constructor that supports granular initialization desides adequate
default values, that in general should provide zero configuration usage as well.
