// ================================
// catch rakhi
// Version 1.0
// ================================

// Canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Buttons
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");
const popup = document.getElementById("popup");

const popupTitle = document.getElementById("popupTitle");

const popupMessage = document.getElementById("popupMessage");

const popupScore = document.getElementById("popupScore");

const popupBtn = document.getElementById("popupBtn");
// Score
const scoreText = document.getElementById("score");
const highScoreText = document.getElementById("highscore");
const timerText = document.getElementById("timer");
const loveMeter = document.getElementById("loveMeter");
const missionText = document.getElementById("missionText");
const giftBtn = document.getElementById("giftBtn");

// Canvas Size
const WIDTH = canvas.width;
const HEIGHT = canvas.height;



// ================================
// PLAYER (Rakhi Thali)
// ================================

const player = {

    x: WIDTH / 2 - 45,
    y: HEIGHT - 30,

    width: 90,
    height: 20,

    speed: 10

};

// ================================
// GAME VARIABLES
// ================================

let score = 0;
let timeLeft = 30;

let gameRunning = false;

let animationId;

let timerInterval;

let objects = [];

let leftPressed = false;
let rightPressed = false;

// High Score

let highScore = Number(localStorage.getItem("rakhiHighScore")) || 0;

highScoreText.innerHTML = highScore;

// ================================
// DRAW BACKGROUND
// ================================

function drawBackground(){

    let sky = ctx.createLinearGradient(
        0,
        0,
        0,
        HEIGHT
    );

    sky.addColorStop(0,"#7fd3ff");
    sky.addColorStop(1,"#fff7d9");

    ctx.fillStyle = sky;

    ctx.fillRect(
        0,
        0,
        WIDTH,
        HEIGHT
    );

}

// ================================
// DRAW THALI
// ================================

function drawPlayer(){

    // Plate

    ctx.beginPath();

    ctx.arc(
        player.x + 45,
        player.y + 10,
        38,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "#b8860b";

    ctx.fill();

    // Center

    ctx.beginPath();

    ctx.arc(
        player.x + 45,
        player.y + 10,
        18,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "#ffd700";

    ctx.fill();

}

// ================================
// PLAYER MOVEMENT
// ================================

function updatePlayer(){

    if(leftPressed){

        player.x -= player.speed;

    }

    if(rightPressed){

        player.x += player.speed;

    }

    if(player.x < 0){

        player.x = 0;

    }

    if(player.x + player.width > WIDTH){

        player.x = WIDTH - player.width;

    }

}

// ================================
// DRAW FIRST SCREEN
// ================================

drawBackground();

drawPlayer();
// ================================
// OBJECT TYPES
// ================================

const itemTypes = [

    { emoji: "🎀", type: "rakhi", points: 10 },

    { emoji: "❤️", type: "heart", points: 5 },

    { emoji: "🍫", type: "chocolate", points: 10 },

    { emoji: "🧸", type: "teddy", points: 10 },

    { emoji: "🌸", type: "flower", points: 8 },

    { emoji: "💎", type: "diamond", points: 20 },

    { emoji: "💣", type: "bomb", points: -50}

];

// ================================
// CREATE NEW OBJECT
// ================================

function createObject() {

    let random = Math.random();

let item;

if(random < 0.30){

    item = itemTypes.find(i => i.type === "bomb");

}else{

    item = itemTypes[Math.floor(Math.random() * (itemTypes.length - 1))];

}

    objects.push({

        x: Math.random() * (WIDTH - 40),

        y: -40,

        width: 40,

        height: 40,

        speed: 7+ Math.random() * 7,

        emoji: item.emoji,

        type: item.type,

        points: item.points

    });

}

// ================================
// DRAW OBJECTS
// ================================

function drawObjects() {

    ctx.font = "34px Arial";

    ctx.textAlign = "center";

    for (let obj of objects) {

        ctx.fillText(

            obj.emoji,

            obj.x,

            obj.y

        );

    }

}

// ================================
// UPDATE OBJECTS
// ================================

function updateObjects() {

    for (let i = objects.length - 1; i >= 0; i--) {

        objects[i].y += objects[i].speed;

        // Remove if outside screen

        if (objects[i].y > HEIGHT + 50) {

            objects.splice(i, 1);

        }

    }

}

// ================================
// SPAWN OBJECTS
// ================================

setInterval(function () {

    if (!gameRunning) return;

    createObject();

    if (gameLevel >= 2) createObject();

    if (gameLevel >= 4) createObject();

},700);
// =======================================
// KEYBOARD CONTROLS
// =======================================

document.addEventListener("keydown", function(e){

    if(e.key==="ArrowLeft"){

        leftPressed=true;

    }

    if(e.key==="ArrowRight"){

        rightPressed=true;

    }

});

document.addEventListener("keyup", function(e){

    if(e.key==="ArrowLeft"){

        leftPressed=false;

    }

    if(e.key==="ArrowRight"){

        rightPressed=false;

    }

});

// =======================================
// MOBILE CONTROLS
// =======================================

leftBtn.addEventListener("touchstart",()=>leftPressed=true);
leftBtn.addEventListener("touchend",()=>leftPressed=false);

rightBtn.addEventListener("touchstart",()=>rightPressed=true);
rightBtn.addEventListener("touchend",()=>rightPressed=false);

leftBtn.addEventListener("mousedown",()=>leftPressed=true);
leftBtn.addEventListener("mouseup",()=>leftPressed=false);

rightBtn.addEventListener("mousedown",()=>rightPressed=true);
rightBtn.addEventListener("mouseup",()=>rightPressed=false);

// =======================================
// COLLISION
// =======================================

function checkCollision(){

    for(let i=objects.length-1;i>=0;i--){

        let obj=objects[i];

        if(

            obj.x>player.x &&

            obj.x<player.x+player.width &&

            obj.y+20>=player.y &&

            obj.y<=player.y+40

        ){

            // Bomb

            if(obj.type==="bomb"){

                gameOver();

                return;

            }

            // Good Item

            score+=obj.points;

            scoreText.innerHTML=score;

            // Love Meter

            let love=Math.min(score,300);

            loveMeter.style.width=love+"%";

            // Win

            if(score>=300){

                winGame();

                return;

            }

            objects.splice(i,1);

        }

    }

}
// =======================================
// TIMER
// =======================================

function startTimer(){

    clearInterval(timerInterval);

    timeLeft = 30;

    timerText.innerHTML = timeLeft;

    timerInterval = setInterval(function(){

        if(!gameRunning) return;

        timeLeft--;

        timerText.innerHTML = timeLeft;

      if (timeLeft <= 0) {

    clearInterval(timerInterval);

    gameOver();

} 
    },1000);

}

// =======================================
// GAME LOOP
// =======================================

function gameLoop(){

    if(!gameRunning) return;

    drawBackground();

    updatePlayer();

    updateObjects();

    checkCollision();

    drawObjects();

    drawPlayer();

    animationId = requestAnimationFrame(gameLoop);

}

// =======================================
// START GAME
// =======================================

startBtn.addEventListener("click",function(){

    objects = [];

    score = 0;

    scoreText.innerHTML = score;

    loveMeter.style.width = "0%";

    player.x = WIDTH/2-player.width/2;

    gameRunning = true;

    cancelAnimationFrame(animationId);

    createObject();

    startTimer();

    gameLoop();

});

// =======================================
// RESTART
// =======================================

restartBtn.addEventListener("click",function(){

    objects = [];

    score = 0;

    scoreText.innerHTML = score;

    loveMeter.style.width = "0%";

    player.x = WIDTH/2-player.width/2;

    gameRunning = true;

    cancelAnimationFrame(animationId);

    createObject();

    startTimer();

    gameLoop();

});
function gameOver() {

 gameRunning = false;

    clearInterval(timerInterval);

    cancelAnimationFrame(animationId);

    if(score > highScore){

        highScore = score;

        localStorage.setItem("rakhiHighScore", highScore);

        highScoreText.innerHTML = highScore;

    }

    popup.style.display = "flex";

    popupTitle.innerHTML = "💔 GAME OVER";

    popupMessage.innerHTML = "Your sister is waiting for more gifts!";

    popupScore.innerHTML = "Final Score : " + score;

}
function winGame(){

    gameRunning = false;

    clearInterval(timerInterval);

    cancelAnimationFrame(animationId);

    popup.style.display = "flex";

    popupTitle.innerHTML = "🏆 YOU WIN!";

    popupMessage.innerHTML = "You collected enough Rakhi Gifts! ❤️";

    popupScore.innerHTML = "Score : " + score;

}