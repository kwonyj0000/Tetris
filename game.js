const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const nextCanvas = document.getElementById('nextPieceCanvas');
const nextCtx = nextCanvas.getContext('2d');
const scoreElement = document.getElementById('score');
const levelElement = document.getElementById('level');
const gameOverElement = document.getElementById('gameOver');
const finalScoreElement = document.getElementById('finalScore');

const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;
const COLORS = [
    null,
    '#FF6B6B', // I
    '#4ECDC4', // O
    '#45B7D1', // T
    '#FFA07A', // S
    '#98D8C8', // Z
    '#F7B731', // J
    '#5F27CD'  // L
];

const SHAPES = [
    [], // 0
    [[1,1,1,1]], // I
    [[2,2],[2,2]], // O
    [[0,3,0],[3,3,3]], // T
    [[0,4,4],[4,4,0]], // S
    [[5,5,0],[0,5,5]], // Z
    [[6,0,0],[6,6,6]], // J
    [[0,0,7],[7,7,7]]  // L
];

let board = [];
let score = 0;
let level = 1;
let linesCleared = 0;
let currentPiece = null;
let nextPiece = null;
let gameLoop = null;
let isGameOver = false;
let dropInterval = 500;

// Audio context
let audioContext = null;
let backgroundMusic = null;
let isMusicPlaying = false;

function initBoard() {
    board = Array(ROWS).fill().map(() => Array(COLS).fill(0));
}

function drawSquare(context, x, y, color) {
    context.fillStyle = color;
    context.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    context.strokeStyle = '#fff';
    context.lineWidth = 2;
    context.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
}

function drawBoard() {
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (board[row][col]) {
                drawSquare(ctx, col, row, COLORS[board[row][col]]);
            }
        }
    }
}

function drawPiece(piece, context = ctx, offsetX = 0, offsetY = 0) {
    piece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                drawSquare(context, piece.x + x + offsetX, piece.y + y + offsetY, COLORS[value]);
            }
        });
    });
}

function drawNextPiece() {
    nextCtx.fillStyle = '#f8f9fa';
    nextCtx.fillRect(0, 0, nextCanvas.width, nextCanvas.height);

    if (nextPiece) {
        const offsetX = (4 - nextPiece.shape[0].length) / 2;
        const offsetY = (4 - nextPiece.shape.length) / 2;

        nextPiece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value) {
                    drawSquare(nextCtx, x + offsetX, y + offsetY, COLORS[value]);
                }
            });
        });
    }
}

function createPiece() {
    const shapeIndex = Math.floor(Math.random() * 7) + 1;
    return {
        shape: SHAPES[shapeIndex].map(row => [...row]),
        x: Math.floor(COLS / 2) - Math.floor(SHAPES[shapeIndex][0].length / 2),
        y: 0
    };
}

function collision(piece, offsetX = 0, offsetY = 0) {
    for (let y = 0; y < piece.shape.length; y++) {
        for (let x = 0; x < piece.shape[y].length; x++) {
            if (piece.shape[y][x]) {
                const newX = piece.x + x + offsetX;
                const newY = piece.y + y + offsetY;

                if (newX < 0 || newX >= COLS || newY >= ROWS) {
                    return true;
                }

                if (newY >= 0 && board[newY][newX]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function merge() {
    currentPiece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                const boardY = currentPiece.y + y;
                const boardX = currentPiece.x + x;
                if (boardY >= 0) {
                    board[boardY][boardX] = value;
                }
            }
        });
    });
}

function clearLines() {
    let linesClearedNow = 0;

    for (let row = ROWS - 1; row >= 0; row--) {
        if (board[row].every(cell => cell !== 0)) {
            board.splice(row, 1);
            board.unshift(Array(COLS).fill(0));
            linesClearedNow++;
            row++;
        }
    }

    if (linesClearedNow > 0) {
        score += linesClearedNow * 100;
        linesCleared += linesClearedNow;
        scoreElement.textContent = score;
        updateLevel();
        playSound(523.25, 0.1); // Line clear sound
    }
}

function updateLevel() {
    const newLevel = Math.floor(linesCleared / 10) + 1;
    if (newLevel !== level) {
        level = newLevel;
        levelElement.textContent = level;
        updateGameSpeed();
    }
}

function updateGameSpeed() {
    dropInterval = Math.max(100, 500 - (level - 1) * 50);

    if (gameLoop) {
        clearInterval(gameLoop);
        gameLoop = setInterval(() => {
            moveDown();
            draw();
        }, dropInterval);
    }
}

function rotate(piece) {
    const newShape = piece.shape[0].map((_, i) =>
        piece.shape.map(row => row[i]).reverse()
    );

    const rotatedPiece = {
        ...piece,
        shape: newShape
    };

    if (!collision(rotatedPiece)) {
        piece.shape = newShape;
    }
}

function moveDown() {
    if (!collision(currentPiece, 0, 1)) {
        currentPiece.y++;
    } else {
        merge();
        clearLines();

        currentPiece = nextPiece;
        nextPiece = createPiece();

        if (collision(currentPiece)) {
            endGame();
        }
    }
}

function hardDrop() {
    while (!collision(currentPiece, 0, 1)) {
        currentPiece.y++;
    }
    moveDown();
}

function endGame() {
    isGameOver = true;
    clearInterval(gameLoop);
    isMusicPlaying = false;
    stopBackgroundMusic();
    gameOverElement.style.display = 'block';
    finalScoreElement.textContent = `최종 점수: ${score}`;
    playSound(220.00, 0.5); // Game over sound
}

function draw() {
    drawBoard();
    if (currentPiece) {
        drawPiece(currentPiece);
    }
    drawNextPiece();
}

function restartGame() {
    isGameOver = false;
    score = 0;
    level = 1;
    linesCleared = 0;
    dropInterval = 500;
    scoreElement.textContent = score;
    levelElement.textContent = level;
    gameOverElement.style.display = 'none';
    initBoard();
    currentPiece = createPiece();
    nextPiece = createPiece();

    if (gameLoop) {
        clearInterval(gameLoop);
    }

    gameLoop = setInterval(() => {
        moveDown();
        draw();
    }, dropInterval);

    // Start background music automatically
    if (!isMusicPlaying) {
        isMusicPlaying = true;
        initAudio();
        playBackgroundMusic();
        document.getElementById('soundBtn').textContent = '🔊 음악 ON';
    }

    draw();
}

document.addEventListener('keydown', (e) => {
    if (isGameOver) return;

    switch(e.key) {
        case 'ArrowLeft':
            e.preventDefault();
            if (!collision(currentPiece, -1, 0)) {
                currentPiece.x--;
            }
            break;
        case 'ArrowRight':
            e.preventDefault();
            if (!collision(currentPiece, 1, 0)) {
                currentPiece.x++;
            }
            break;
        case 'ArrowDown':
            e.preventDefault();
            moveDown();
            break;
        case 'ArrowUp':
            e.preventDefault();
            rotate(currentPiece);
            break;
        case ' ':
            e.preventDefault();
            hardDrop();
            playSound(440.00, 0.05); // Drop sound
            break;
    }
    draw();
});

// Web Audio API setup
function initAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
}

// Tetris melody notes
const melody = [
    { freq: 659.25, duration: 0.4 }, // E5
    { freq: 493.88, duration: 0.2 }, // B4
    { freq: 523.25, duration: 0.2 }, // C5
    { freq: 587.33, duration: 0.4 }, // D5
    { freq: 523.25, duration: 0.2 }, // C5
    { freq: 493.88, duration: 0.2 }, // B4
    { freq: 440.00, duration: 0.4 }, // A4
    { freq: 440.00, duration: 0.2 }, // A4
    { freq: 523.25, duration: 0.2 }, // C5
    { freq: 659.25, duration: 0.4 }, // E5
    { freq: 587.33, duration: 0.2 }, // D5
    { freq: 523.25, duration: 0.2 }, // C5
    { freq: 493.88, duration: 0.6 }, // B4
    { freq: 523.25, duration: 0.2 }, // C5
    { freq: 587.33, duration: 0.4 }, // D5
    { freq: 659.25, duration: 0.4 }, // E5
    { freq: 523.25, duration: 0.4 }, // C5
    { freq: 440.00, duration: 0.4 }, // A4
    { freq: 440.00, duration: 0.4 }, // A4
    { freq: 0, duration: 0.2 },       // Rest
    { freq: 587.33, duration: 0.4 }, // D5
    { freq: 698.46, duration: 0.2 }, // F5
    { freq: 880.00, duration: 0.4 }, // A5
    { freq: 783.99, duration: 0.2 }, // G5
    { freq: 698.46, duration: 0.2 }, // F5
    { freq: 659.25, duration: 0.6 }, // E5
    { freq: 523.25, duration: 0.2 }, // C5
    { freq: 659.25, duration: 0.4 }, // E5
    { freq: 587.33, duration: 0.2 }, // D5
    { freq: 523.25, duration: 0.2 }, // C5
    { freq: 493.88, duration: 0.4 }, // B4
    { freq: 493.88, duration: 0.2 }, // B4
    { freq: 523.25, duration: 0.2 }, // C5
    { freq: 587.33, duration: 0.4 }, // D5
    { freq: 659.25, duration: 0.4 }, // E5
    { freq: 523.25, duration: 0.4 }, // C5
    { freq: 440.00, duration: 0.4 }, // A4
    { freq: 440.00, duration: 0.4 }, // A4
];

function playNote(freq, duration, startTime) {
    if (freq === 0 || !audioContext) return; // Rest or no audio context

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(freq, startTime);

    gainNode.gain.setValueAtTime(0.1, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
}

function playMelody() {
    if (!isMusicPlaying || !audioContext) return;

    let time = audioContext.currentTime;

    melody.forEach(note => {
        playNote(note.freq, note.duration, time);
        time += note.duration;
    });

    // Calculate delay in milliseconds for the loop
    const melodyDuration = melody.reduce((sum, note) => sum + note.duration, 0);

    // Loop the melody
    backgroundMusic = setTimeout(() => {
        if (isMusicPlaying) {
            playMelody();
        }
    }, melodyDuration * 1000);
}

// Play a simple melody using Web Audio API
function playBackgroundMusic() {
    initAudio();

    // Stop any existing music first
    stopBackgroundMusic();

    playMelody();
}

function stopBackgroundMusic() {
    if (backgroundMusic) {
        clearTimeout(backgroundMusic);
        backgroundMusic = null;
    }
}

function toggleSound() {
    const soundBtn = document.getElementById('soundBtn');

    if (isMusicPlaying) {
        isMusicPlaying = false;
        stopBackgroundMusic();
        soundBtn.textContent = '🔇 음악 OFF';
    } else {
        isMusicPlaying = true;
        initAudio();
        playBackgroundMusic();
        soundBtn.textContent = '🔊 음악 ON';
    }
}

// Sound effects
function playSound(freq, duration) {
    if (!audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);

    gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
}

restartGame();
