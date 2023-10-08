// Factories


// Modules

const Player = (marker) => {
  return {marker}
};

const displayController = (() => {
  const status = document.querySelector('#status');
  const gridElement = document.querySelector('#grid');
  const grid = [];

  for (let i = 0; i < 3; i++) {
    grid.push([]);

    for (let j = 0; j < 3; j++) {
      const currentCell = gridElement.querySelector(`#cell-${i + 1}-${j + 1}`);
      grid[i].push(currentCell);
    }
  }

  const setStatus = (msg) => {
    status.textContent = msg;
  };

  const updateGrid = (board) => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        grid[i][j].textContent = board[i][j];
      }
    }
  };

  const clearEventListeners = (board) => {
    grid.forEach(row => {
      row.forEach(cell => {
        cell.remove;
      });
    });
  };

  const updateEventListeners = (player, board) => {
    grid.forEach(row => {
      row.forEach(cell => {
        cell.addEventListener('click', () => {
          console.log('test');
        });
      });
    });
  };

  return {setStatus, updateGrid, updateEventListeners};
})();

const gameboard = (() => {
  const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];

  const addMarker = (player, row, col) => {
    board[row][col] = player.marker;
    displayController.updateGrid();
  };

  return {addMarker};
})();

const game = (() => {
  const player1 = Player('O');
  const player2 = Player('X');

  let currentPlayer = player1;
  displayController.updateEventListeners(currentPlayer);
  displayController.setStatus(`${currentPlayer.marker}'s Turn`);


})();
