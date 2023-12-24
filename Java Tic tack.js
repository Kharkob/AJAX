let currentPlayer = 'X';
  let board = ['', '', '', '', '', '', '', '', ''];
  let gameActive = true;

  const cells = document.getElementById('board');
  const turnIndicator = document.getElementById('turn-indicator');
  const winnerAlert = document.getElementById('winner-alert');

  // Create the game board
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', () => makeMove(i));
    cells.appendChild(cell);
  }

  updateTurnIndicator();

  function makeMove(index) {
    if (!gameActive || board[index] !== '') return;

    board[index] = currentPlayer;
    updateCell(index);
    checkGameResult();

    if (gameActive) {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      updateTurnIndicator();
    }
  }

  function updateCell(index) {
    const cell = cells.children[index];
    cell.textContent = board[index];
  }

  function updateTurnIndicator() {
    turnIndicator.textContent = `Turn: ${currentPlayer}`;
  }

  function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';

    for (let i = 0; i < cells.children.length; i++) {
      cells.children[i].textContent = '';
    }

    updateTurnIndicator();
    winnerAlert.style.display = 'none';
  }

  function checkGameResult() {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
        gameActive = false;
        winnerAlert.textContent = `${currentPlayer} wins!`;
        winnerAlert.style.display = 'block';
        return;
      }
    }

    if (!board.includes('')) {
      gameActive = false;
      winnerAlert.textContent = 'It\'s a draw!';
      winnerAlert.style.display = 'block';
    }
  }