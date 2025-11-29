import { shuffle, boardIsValid } from './generator.js';

export function generatePuzzle(board, emptyCells) {
    let removed = 0;
    let positions = [];

    for (let row = 0; row < 9; row++) {
        for ( let col = 0; col < 9; col++){
            positions.push([row, col]);
        }
    }
    positions = shuffle(positions);

    let i = 0;
    while (removed < emptyCells && i < positions.length) {
        let [row1, col1] = positions[i];
        let [row2, col2] = [8 - row1, 8 - col1];

        if (board[row1][col1] !== 0 && board[row2][col2] !== 0) {
            let sameCell = (row1 === row2 && col1 === col2) ;
            let temp1 = board[row1][col1];
            let temp2 = sameCell ? null : board[row2][col2];
            if (!sameCell) {
                board[row1][col1] = 0;
                board[row2][col2] = 0;
                }
                else {
                    board[row1][col1] = 0;
                }
                if (possibleSolutions(board) === 1) {
                    removed += sameCell ? 1 : 2;
                }
                else {
                    board[row1][col1] = temp1;
                   if (!sameCell) board[row2][col2] = temp2;
                }
        }
        i++;
    }
    return board;
}

export function possibleSolutions(board) {
    let solutions = 0;

    function solve(board) {
        for (let row = 0; row < 9; row++){
            for (let col =0; col < 9; col++) {
                if (board[row][col] === 0) {
                    for (let num = 1; num <=9; num++) {
                        if (boardIsValid(board, row, col, num)) {
                            board[row][col] = num;
                            solve(board);
                            board[row][col] = 0;
                        }
                    }
                    return;
                }
            }
        }
        solutions++;
    }
    solve(board);
    return solutions;
}

