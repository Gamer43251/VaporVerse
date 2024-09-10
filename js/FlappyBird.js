
//board
  
let board;
let boardWidth = 1080;
let boardHeight = 640;
let context;


//bird 

let birdWidth = 34;
let birdHeight = 24;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;
let birdImg;

let bird = {
    x : birdX,
    y : birdY,
    width : birdWidth,
    height : birdHeight
}

// pipes

let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

//physics
let velocityX = -2; // pipes moving left speed
let velocityY = 0; // bird jump speed
let gravity = 0;

let gameOver = false;
let startGame = false;
let Score = 0;


window.onload = function() {

      board = document.getElementById("board");
      board.height = boardHeight;
      board.width = boardWidth;
      context = board.getContext("2d");

      // draw Flappy bird
      //context.fillStyle = "green";
      //context.fillRect(bird.x, bird.y, bird.width, bird.height);

      // load image

      birdImg = new Image();
      birdImg.src = "img/FlappyBird/FlappyBird.png";
      birdImg.onload = function(){
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
      }

      topPipeImg = new Image();
      topPipeImg.src = "img/FlappyBird/toppipeorange.png"

      bottomPipeImg = new Image();
      bottomPipeImg.src = "img/FlappyBird/bottompipeorange.png"

      groundImg = new Image();
      groundImg.src = "img/FlappyBird/flappybirdGround.png"

      requestAnimationFrame(update);
      setInterval(placePipes, 1500);
      board.addEventListener("click", moveBird);
      
}

function update(){
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }
    context.clearRect(0, 0, board.width, board.height);

    //bird
    velocityY += gravity;
    //bird.y += velocityY;
    bird.y = Math.max(bird.y + velocityY, 0); // apply gravity to current bird.y limit the bird.y to top of canvas
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    if (bird.y  > (boardHeight - 61) - birdHeight){
        bird.y = (boardHeight - 61) + birdHeight
        gameOver = true
    } 

    //pipes
    for (let i = 0; i < pipeArray.length; i++){
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if(!pipe.passed && bird.x > pipe.x + pipe.width){
            Score += 0.5; // 0.5 for bottom + 0.5 for top = 1
            pipe.passed = true;
        }

        if (detectCollision(bird, pipe)){
            gameOver = true;
        }
    }

    //clear pipes
    while (pipeArray.length > 0 && pipeArray[0].x <0 - pipeWidth){
        pipeArray.shift(); // removes first element from the array
    }

    //Score
    context.fillStyle = "orange";
    context.font = "45px sans-serif";
    context.fillText(Score, (boardWidth /2) -(context.measureText(Score).width / 2) ,45);
    context.drawImage(groundImg, 0, boardHeight - 61, boardWidth, 61);

    if (!startGame){
        context.fillStyle = "white";
        context.fillText("Click Anywhere To Start",(boardWidth /2) - (context.measureText("Click Anywhere To Start").width / 2),
                                                        (boardHeight / 2) - 45 / 2);
    }
    // gameOver
    if (gameOver){
        context.fillStyle = "white";
        context.fillText("Game Over",   (boardWidth /2) - (context.measureText("Game Over").width / 2),
                                        (boardHeight / 2) - 45 / 2);
        context.fillText("Click Anywhere To Play Again",(boardWidth /2) - (context.measureText("Click Anywhere To Play Again").width / 2),
                                                        (boardHeight / 2) + 45 / 2);
    }
}


function placePipes(){
    if (gameOver || !startGame) {
        return;
    }
    
    //(0-1) * pipeHeight / 2
    // 0 -> 128 (pipeHeight/4)
    // 1 -> 128 - 256 (pipeHeight / 4 - pipeHeight / 2) = - 3/4 pipeHeight
    let randomPipeY = pipeY - pipeHeight / 4 - Math.random()*(pipeHeight/2);
    let openingSpace = board.height/4;

    let topPipe = {
        img : topPipeImg,
        x : pipeX,
        y : randomPipeY,
        width : pipeWidth,
        height: pipeHeight,
        passed : false
    }

    pipeArray.push(topPipe);

    let bottomPipe = {
        img : bottomPipeImg,
        x : pipeX,
        y : randomPipeY + pipeHeight + openingSpace,
        width : pipeWidth,
        height: pipeHeight,
        passed : false
    }
    
    pipeArray.push(bottomPipe);
}

function moveBird(){
    
        if (!startGame){
            gravity = 0.4;
            startGame = true;
        }
        //jump
        velocityY = -6;

        // reset game
        if (gameOver){
            bird.y = birdY;
            pipeArray = [];
            Score = 0;
            gameOver = false;
        }
    
}

function detectCollision(a, b){
    return  a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y;
}

  



