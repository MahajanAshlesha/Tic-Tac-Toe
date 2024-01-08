const gameBoard = document.getElementById('game-board');
const gameStatus = document.getElementById('game-status');

let currentPlayer = 'X';
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];

// Initialize the game board
function initializeBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', () => handleCellClick(i));
        gameBoard.appendChild(cell);
    }
}

// Handle a cell click
function handleCellClick(index) {
    if (!gameActive || boardState[index] !== '') {
        return;
    }

    boardState[index] = currentPlayer;
    renderBoard();
    checkGameResult();

    if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateGameStatus();
    }
}

// Render the game board
function renderBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.textContent = boardState[index];
    });
}

// Update the game status display
function updateGameStatus() {
    gameStatus.textContent = `Player ${currentPlayer}'s turn`;
}

// Check if the game has a winner or is a draw
function checkGameResult() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (boardState[a] !== '' && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            gameActive = false;
            gameStatus.textContent = `Player ${currentPlayer} wins!`;
            return;
        }
    }

    if (!boardState.includes('')) {
        gameActive = false;
        gameStatus.textContent = 'It\'s a draw!';
    }
}

// Reset the game
function resetGame() {
    currentPlayer = 'X';
    gameActive = true;
    boardState = ['', '', '', '', '', '', '', '', ''];
    renderBoard();
    updateGameStatus();
}

// Initialize the game board when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeBoard();
    updateGameStatus();
});
