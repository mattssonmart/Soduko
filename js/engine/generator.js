

export function createEmptyBoard(){
    const board = [];
    for (let i = 0; i < 9; i++){
        const row = [];
        for (let k = 0; k < 9; k++) {
            row.push(0);
        }
        board.push(row);
    }
    return board;
}

export function boardIsValid(board, row, col, number) {
    for (let colIndex = 0; colIndex < 9; colIndex++) {
        if (board[row][colIndex] === number) {
            return false;
        }
    }

    for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
        if (board[rowIndex][col] === number) {
            return false;
        }
    }

    let boxRow = Math.floor(row /3) * 3;
    let boxCol = Math.floor(col /3) * 3;
    for (let i = 0; i < 3; i++){
        for (let k = 0; k < 3; k++){
            if (board[boxRow + i][boxCol + k] === number) {
                return false;
            }
        }
    }
    return true;
}

export function shuffle(array){
    for (let i = array.length - 1; i > 0; i--) {
        let k = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[k];
        array[k] = temp;
    }
    return array;
}

export function generateSolution(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                let numbers = shuffle([1,2,3,4,5,6,7,8,9]);
                for (let num of numbers) {
                    if (boardIsValid(board, row, col, num)) {
                        board[row][col] = num;
                        if (generateSolution(board)) {
                            return true;
                        }
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}