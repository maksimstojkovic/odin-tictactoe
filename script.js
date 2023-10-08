const Player = (marker) => {
  return {marker};
};

const DisplayController = (board) => {
  const updateBoard = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const cell = document.querySelector(`.cell[data-row="${i + 1}"][data-col="${j + 1}"]`);
        cell.textContent = board[i][j];
      }
    }
  };

  const setStatus = (msg) => {
    const status = document.querySelector('#status');
    status.textContent = msg;
  };
  
  return {updateBoard, setStatus};
};

const Game = (() => {
  const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];

  const display = DisplayController(board)
  const player1 = Player('O');
  const player2 = Player('X');
  let currentPlayer = player1;

  // Returns true if game is over, else alternates currentPlayer
  const checkStatus = (switchPlayer = true) => {
    // Check rows and columns
    for (let i = 0; i < 3; i++) {
      if ((board[i][0] !== '' && board[i][0] === board[i][1] && board[i][0] === board[i][2]) ||
          (board[0][i] !== '' && board[0][i] === board[1][i] && board[0][i] === board[2][i])) {
            display.setStatus(`${currentPlayer.marker} wins`);
            return true;
      }
    }

    // Check diagonals
    if ((board[0][0] !== '' && board[0][0] === board[1][1] && board[0][0] === board[2][2]) ||
        (board[2][0] !== '' && board[2][0] === board[1][1] && board[2][0] === board[0][2])) {
          display.setStatus(`${currentPlayer.marker} wins`);
          return true;
    }

    // Check draw
    const values = board.reduce((count, row) => {
      count += row.join().length
    });

    if (values >= 9) {
      display.setStatus('Draw');
      return;
    }

    // Update player
    if (switchPlayer) {
      if (currentPlayer === player1) {
        currentPlayer = player2;
      } else {
        currentPlayer = player1;
      }
    }

    display.setStatus(`${currentPlayer.marker}'s move`);
  }

  const init = () => {
    const gameover = checkStatus();

    if (!gameover) {
      display.updateBoard();
    }

    // loop until win or draw

    // while (true) {
    //   // clear and add new event listeners for player
    //   // trigger textContent and board update
    //   // check for win conditions
  
    // }
  }

  return {init};
})();

Game.init();
