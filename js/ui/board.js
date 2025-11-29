import { boardIsValid } from '../engine/generator.js';

export function createBoard(board, solvedBoard) {
    const container = document.getElementById("sudoku-container");
    container.innerHTML = '';
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = document.createElement("input");
            cell.type = "text";
            cell.maxLength = 1;
            cell.dataset.row = row;
            cell.dataset.col = col;
        
            const boxRow = Math.floor(row / 3);
            const boxCol = Math.floor( col / 3);
            const boxNumber = boxRow * 3 + boxCol * 3;
            cell.classList.add(`box-${boxNumber}`);

        if (board[row][col] !== 0) {
            cell.value = board[row][col];
            cell.disabled = true;
        }

        cell.addEventListener("input", (event) => {
            const value = parseInt(event.target.value);
            updateCell(board, row, col, value, solvedBoard);
        });
        container.appendChild(cell);
        }
    }
}

export function updateCell(board, row, col, value, solvedBoard) {
    const cell = document.querySelector(`#sudoku-container input[data-row='${row}'][data-col='${col}']`);
    if (value < 1 || value > 9 || isNaN(value)) {
        cell.value = '';
        return;
    }
    const temp =board[row][col];
    board[row][col] = 0;

    if (!boardIsValid(board, row, col, value))  {
        cell.classList.add('invalid');
        board[row][col] = temp;
        return;
    }
    else {
        cell.classList.add('invalid');
        board[row][col] = value;
    }

    if (puzzleSolved(board, solvedBoard)) {
        document.getElementById('status').textContent = 'You did it!';
    }
}

export function puzzleSolved(board, solvedBoard) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] !== solvedBoard[row][col]) {
                return false;
            }
        }
    }
    return true;
}