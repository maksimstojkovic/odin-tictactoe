const Player = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;

  return {getName, getMarker};
}

const Cell = () => {
  let value = 0;

  // Return current value of cell
  const getValue = () => value;

  // Update current value of cell
  const setValue = (player) => {
    value = player.getMarker();
  };

  return {getValue, setValue};
};

const GameBoard = () => {
  const rows = 3;
  const cols = 3;

  const board = [];

  // Create 2d board
  // Top-left corner has indices 0,0 => board[0][0]
  for (let i = 0; i < rows; i++) {
    board[i] = []

    for (let j = 0; j < cols; j++) {
      board[i][j] = Cell();
    }
  }

  const getBoard = () => board;

  const addMarker = (row, col, player) => {
    if (board[row][col].getValue() === 0) {
      board[row][col].setValue(player);
      return true
    }
    return false;
  }

  const printBoard = () => {
    const boardCellValues = board.map((row) => row.map((cell) => cell.getValue()));
    console.log(boardCellValues);
  }

  return {getBoard, addMarker, printBoard};
};

const GameController = () => {
  const players = [];
  players[0] = Player('Player 1', 1);
  players[1] = Player('Player 2', 2);

  const board = GameBoard();

  let activePlayer = players[0];

  const getActivePlayer = () => activePlayer;

  const switchPlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  }

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().getName()}'s turn`);
  }

  const playRound = (row, col) => {
    if (!board.addMarker(row, col, activePlayer)) {
      return;
    }

    console.log(`Dropping ${activePlayer.getName()}'s token into row ${row}, column ${col}`);

    switchPlayer();
    printNewRound();
  };

  printNewRound();

  return {playRound, getActivePlayer};
};

const game = GameController();
