const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const scoreText = document.getElementById("score");

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

// Bird
const bird = {
    x: 100,
    y: 300,
    radius: 18,
    velocity: 0
};

// Game Settings
const gravity = 0.5;
const jumpForce = -9;
const pipeWidth = 70;
const pipeGap = 170;
const pipeSpeed = 3;

// Variables
let pipes = [];
let score = 0;
let gameRunning = false;
let animationId;
function drawBackground(){

    ctx.fillStyle = "#87CEEB";
    ctx.fillRect(0,0,WIDTH,HEIGHT);

}
function drawBird(){

    ctx.beginPath();

    ctx.arc(
        bird.x,
        bird.y,
        bird.radius,
        0,
        Math.PI*2
    );

    ctx.fillStyle = "yellow";
    ctx.fill();

    ctx.closePath();

    // Eye
    ctx.beginPath();

    ctx.arc(
        bird.x+6,
        bird.y-5,
        3,
        0,
        Math.PI*2
    );

    ctx.fillStyle = "black";
    ctx.fill();

    // Beak
    ctx.fillStyle = "orange";

    ctx.fillRect(
        bird.x+15,
        bird.y-3,
        10,
        6
    );

}
function createPipe(){

    let topHeight = Math.random()*220 + 60;

    pipes.push({

        x: WIDTH,

        top: topHeight,

        bottom: topHeight + pipeGap,

        passed: false

    });

}
function drawPipes(){

    ctx.fillStyle = "green";

    for(let pipe of pipes){

        // Top Pipe
        ctx.fillRect(
            pipe.x,
            0,
            pipeWidth,
            pipe.top
        );

        // Bottom Pipe
        ctx.fillRect(
            pipe.x,
            pipe.bottom,
            pipeWidth,
            HEIGHT-pipe.bottom
        );

    }

}
function updateBird(){

    bird.velocity += gravity;

    bird.y += bird.velocity;

    if(bird.y < bird.radius){

        bird.y = bird.radius;

        bird.velocity = 0;

    }

    if(bird.y > HEIGHT - bird.radius){

        bird.y = HEIGHT - bird.radius;

        gameOver();

    }

}

function updatePipes(){

    for(let i=0;i<pipes.length;i++){

        pipes[i].x -= pipeSpeed;

        if(!pipes[i].passed && pipes[i].x + pipeWidth < bird.x){

            pipes[i].passed = true;

            score++;

            scoreText.innerHTML = score;

        }

        if(pipes[i].x + pipeWidth < 0){

            pipes.splice(i,1);

            i--;

        }

    }

    if(pipes.length == 0 || pipes[pipes.length-1].x < 220){

        createPipe();

    }

}

function checkCollision(){

    for(let pipe of pipes){

        if(

            bird.x + bird.radius > pipe.x &&

            bird.x - bird.radius < pipe.x + pipeWidth

        ){

            if(

                bird.y - bird.radius < pipe.top ||

                bird.y + bird.radius > pipe.bottom

            ){

                gameOver();

            }

        }

    }

}

function jump(){

    if(!gameRunning) return;

    bird.velocity = jumpForce;

}

function gameOver(){

    gameRunning = false;

    cancelAnimationFrame(animationId);

    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(0,0,WIDTH,HEIGHT);

    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.fillText("Game Over!",90,250);

    ctx.font = "24px Arial";
    ctx.fillText("Score : " + score,145,300);

}
function gameLoop(){

    if(!gameRunning) return;

    drawBackground();

    updateBird();

    updatePipes();

    checkCollision();

    drawPipes();

    drawBird();

    animationId = requestAnimationFrame(gameLoop);

}
document.addEventListener("keydown",function(e){

    if(e.code==="Space" || e.code==="ArrowUp"){

        e.preventDefault();

        jump();

    }

});
canvas.addEventListener("click",jump);

canvas.addEventListener("touchstart",function(e){

    e.preventDefault();

    jump();

});
startBtn.addEventListener("click",function(){

    bird.y = 300;
    bird.velocity = 0;

    pipes = [];

    score = 0;
    scoreText.innerHTML = score;

    createPipe();

    gameRunning = true;

    cancelAnimationFrame(animationId);

    gameLoop();

});
restartBtn.addEventListener("click",function(){

    bird.y = 300;
    bird.velocity = 0;

    pipes = [];

    score = 0;
    scoreText.innerHTML = score;

    createPipe();

    gameRunning = true;

    cancelAnimationFrame(animationId);

    gameLoop();

});
nitializeGame()
window.onload = function () {

    const popup = document.getElementById("popup");

    // Show popup
    popup.style.display = "block";

    // Hide after 5 seconds
    setTimeout(function () {
        popup.style.display = "none";
    }, 5000);
}
