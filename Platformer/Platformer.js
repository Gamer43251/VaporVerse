//board
  
let board;
let boardWidth = 1080;
let boardHeight = 640;
let context;

let playerX = 100;
let playerY = 100;
let playerWidth = 25;
let playerHeight = 25;

let gravity = 1.5;
let velocityX = 25;
let velocityY = 0;
let isJumping = false;
let jumpSpeed = -10;

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    document.addEventListener("keydown", updateMovement);
    requestAnimationFrame(update);
}

function update() {
    context.fillStyle = "white";
    context.fillRect(0, 0, boardWidth, boardHeight);

    context.fillStyle = "red";
    context.fillRect(playerX, playerY, playerWidth, playerHeight);

    // Apply gravity
    if (playerY + playerHeight < boardHeight) {
        velocityY += gravity;
    } else {
        velocityY = 0;
        playerY = boardHeight - playerHeight;
        isJumping = false;
    }

    // Update player position
    playerY += velocityY;

    requestAnimationFrame(update);
}

function updateMovement(e) {
    if (e.code == "KeyW" && !isJumping && playerY + playerHeight >= boardHeight) {
        velocityY = jumpSpeed; // Set jump velocity
        isJumping = true;
    } else if (e.code == "KeyA") {
        playerX -= velocityX;
    } else if (e.code == "KeyD") {
        playerX += velocityX;
    }
}
