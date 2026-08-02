const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreElement = document.getElementById("score");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const box = 20;
const canvasSize = 400;

let snake = [];
let food = {};
let direction = "RIGHT";
let score = 0;
let game = null;

// Initialize Game
function initializeGame() {
    snake = [
        { x: 9 * box, y: 10 * box }
    ];

    direction = "RIGHT";
    score = 0;
    scoreElement.innerHTML = score;

    createFood();

    if (game) {
        clearInterval(game);
    }

    drawGame();
}

// Create Food
function createFood() {
    food = {
        x: Math.floor(Math.random() * (canvasSize / box)) * box,
        y: Math.floor(Math.random() * (canvasSize / box)) * box
    };
}

// Keyboard Controls
document.addEventListener("keydown", changeDirection);

function changeDirection(e) {

    if (e.key === "ArrowLeft" && direction !== "RIGHT") {
        direction = "LEFT";
    }

    if (e.key === "ArrowRight" && direction !== "LEFT") {
        direction = "RIGHT";
    }

    if (e.key === "ArrowUp" && direction !== "DOWN") {
        direction = "UP";
    }

    if (e.key === "ArrowDown" && direction !== "UP") {
        direction = "DOWN";
    }

}

document.getElementById("up").onclick = () => {
    if(direction !== "DOWN") direction = "UP";
};

document.getElementById("down").onclick = () => {
    if(direction !== "UP") direction = "DOWN";
};

document.getElementById("left").onclick = () => {
    if(direction !== "RIGHT") direction = "LEFT";
};

document.getElementById("right").onclick = () => {
    if(direction !== "LEFT") direction = "RIGHT";
};

// Draw Game
function drawGame() {

    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    // Draw Snake
    for (let i = 0; i < snake.length; i++) {

        ctx.fillStyle = (i === 0) ? "#00ff00" : "#66ff66";

        ctx.fillRect(
            snake[i].x,
            snake[i].y,
            box,
            box
        );

    }

    // Draw Food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === "LEFT") snakeX -= box;
    if (direction === "RIGHT") snakeX += box;
    if (direction === "UP") snakeY -= box;
    if (direction === "DOWN") snakeY += box;

    // Eat Food
    if (snakeX === food.x && snakeY === food.y) {

        score++;
        scoreElement.innerHTML = score;

        createFood();

    } else {

        snake.pop();

    }

    const newHead = {
        x: snakeX,
        y: snakeY
    };

    // Wall Collision
    if (
        snakeX < 0 ||
        snakeY < 0 ||
        snakeX >= canvasSize ||
        snakeY >= canvasSize ||
        collision(newHead, snake)
    ) {

        clearInterval(game);

        alert("Game Over!\nYour Score: " + score);

        return;
    }

    snake.unshift(newHead);

}

// Check Collision
function collision(head, array) {

    for (let i = 0; i < array.length; i++) {

        if (
            head.x === array[i].x &&
            head.y === array[i].y
        ) {
            return true;
        }

    }

    return false;
}

// Start Game
startBtn.addEventListener("click", function () {

    initializeGame();

    game = setInterval(drawGame, 120);

});

// Restart Game
restartBtn.addEventListener("click", function () {

    initializeGame();

    game = setInterval(drawGame, 120);

});

// Start Once
initializeGame()
window.onload = function () {

    const popup = document.getElementById("popup");

    // Show popup
    popup.style.display = "block";

    // Hide after 5 seconds
    setTimeout(function () {
        popup.style.display = "none";
    }, 5000);

};