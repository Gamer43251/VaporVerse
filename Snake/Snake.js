// board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

// snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

// food
var foodX;
var foodY;

var gameOver = false;
var score = 0;


window.onload = function(){
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000/10);
}

function update(){
    context.fillStyle = "white";
    context.font = "45px sans-serif";
    if (gameOver){
        context.fillText("Game Over",   ((cols * blockSize) /2) - (context.measureText("Game Over").width / 2),
                                        ((rows * blockSize) / 2) - 45 / 2);
        return;
    }

    context.fillText(score, 5, 45)

    context.fillStyle = "black";
    context.fillRect(0,0, board.width, board.height);

    if (snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX,foodY]);
        score ++;
        placeFood();
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];  // Safely shift each part
    }
    if (snakeBody.length > 0){
        snakeBody[0] = [snakeX,snakeY];
    }

    context.fillStyle = "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX,snakeY,blockSize,blockSize);
    for (let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize,blockSize);
    }

    // Game over conditions

    if(snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize){
        gameOver = true;
    }
    for (let i = 0; i < snakeBody.length; i++){
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameOver = true;
        }
    }

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);
    
    context.fillStyle = "white";
    context.font = "45px sans-serif";
    context.fillText(score, 5, 45)
}

function changeDirection(e){
    if (e.code == "KeyW" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "KeyS" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "KeyA" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "KeyD" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood(){
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}