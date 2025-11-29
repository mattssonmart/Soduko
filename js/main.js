import { createEmptyBoard, generateSolution } from './engine/generator.js';
import { generatePuzzle } from './engine/puzzleGenerator.js';
import { createBoard } from './ui/board.js';

let solvedBoard;
let puzzleBoard;

function startNewGame(difficulty = 'easy') {
    let board = createEmptyBoard();
    generateSolution(board);
    solvedBoard = board;
    puzzleBoard = board.map(row => [...row]);
    let emptyCells;
    if (difficulty === 'easy') emptyCells = 35;
    else if (difficulty === 'medium') emptyCells = 45;
    else emptyCells = 55;
    generatePuzzle(puzzleBoard, emptyCells);
    createBoard(puzzleBoard, solvedBoard);
    document.getElementById('status').textContent = '';
}

document.getElementById('newgame').addEventListener('click', () => {
    const difficulty = document.getElementById('difficulty').value;
    startNewGame(difficulty);
});

document.getElementById('restart').addEventListener('click', () => {
    const difficulty = document.getElementById('difficulty').value;
    startNewGame(difficulty);
});

window.addEventListener('DOMContentLoaded', () => {
    startNewGame();
}) ;