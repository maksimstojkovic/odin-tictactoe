const Player = (name, id, marker) => {
  const getName = () => name;
  const getID = () => id;
  const getMarker = () => marker;

  return {getName, getID, getMarker};
}

const Cell = () => {
  let value = 0;

  // Return current value of cell
  const getValue = () => value;

  // Update current value of cell
  const setValue = (player) => {
    value = player.getID();
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
  players[0] = Player('Player 1', 1, 'X');
  players[1] = Player('Player 2', 2, 'O');

  const board = GameBoard();

  let activePlayer = players[0];

  const getActivePlayer = () => activePlayer;
  const getPlayers = () => players;

  const switchPlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  }

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().getName()}'s turn`);
  }

  // 0 if game not over, 1 if draw, 2 if activePlayer won
  const checkGameOver = () => {
    const gameBoard = board.getBoard();

    // Check rows
    for (let i = 0; i < gameBoard.length; i++) {
      if (gameBoard[i].reduce((allEqual, cell) => allEqual && cell.getValue() ===
          activePlayer.getID(), true)) {
            return 2;
      }
    }

    // Check columns
    for (let i = 0; i < gameBoard[0].length; i++) {
      if (gameBoard.reduce((allEqual, row) => allEqual && row[i].getValue() ===
          activePlayer.getID(), true)) {
            return 2;
      }
    }

    // Check diagonals
    if (gameBoard.reduce((allEqual, row, index) => allEqual && row[index].getValue() ===
        activePlayer.getID(), true)) {
          return 2;
    }

    if (gameBoard.reduce((allEqual, row, index) => allEqual && row[gameBoard.length - index - 1].getValue() ===
        activePlayer.getID(), true)) {
          return 2;
    }

    // Check draw
    const isDraw = gameBoard.reduce((boardFull, row) => {
      return boardFull && row.every((cell) => cell.getValue() !== 0);
    }, true)

    if (isDraw) {
      return 1;
    }
    return 0;
  };

  const playRound = (row, col) => {
    if (!board.addMarker(row, col, activePlayer)) {
      return 0;
    }

    console.log(`Dropping ${activePlayer.getName()}'s token into row ${row}, column ${col}`);

    // Check win conditions
    const gameStatus = checkGameOver();

    if (gameStatus === 2) {
      board.printBoard();
      console.log(`${activePlayer.getName()} wins`);
      return gameStatus;

    } else if (gameStatus === 1) {
      board.printBoard();
      console.log('Draw');
      return gameStatus;
    }

    switchPlayer();
    printNewRound();
    return gameStatus;
  };

  printNewRound();

  return {playRound, getActivePlayer, getPlayers, getBoard: board.getBoard};
};

const DisplayController = () => {
  const game = GameController();
  const turnDiv = document.querySelector('.turn');
  const boardDiv = document.querySelector('.board');

  const updateDisplay = (gameStatus) => {
    boardDiv.replaceChildren();

    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    if (gameStatus === 2) {
      turnDiv.textContent = `${activePlayer.getName()} wins`;
    } else if (gameStatus === 1) {
      turnDiv.textContent = 'Draw';
    } else {
      turnDiv.textContent = `${activePlayer.getName()}'s turn`;
    }

    board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellButton = document.createElement('button');
        cellButton.classList.add('cell');

        cellButton.dataset.row = rowIndex;
        cellButton.dataset.column = colIndex;

        let cellText = '';

        game.getPlayers().every((player) => {
          if (cell.getValue() === player.getID()) {
            cellText = player.getMarker();
            return false;
          }
          return true;
        });

        cellButton.textContent = cellText;
        boardDiv.appendChild(cellButton);
      });
    });
  };

  const clickHandlerBoard = (e) => {
    const selectedRow = e.target.dataset.row;
    const selectedCol = e.target.dataset.column;

    if (!selectedRow || !selectedCol) {
      return;
    }

    const gameStatus = game.playRound(parseInt(selectedRow), parseInt(selectedCol));
    
    if (gameStatus != 0) {
      boardDiv.removeEventListener('click', clickHandlerBoard);
    }

    updateDisplay(gameStatus);
};

  boardDiv.addEventListener('click', clickHandlerBoard);
  updateDisplay();
};

DisplayController();
