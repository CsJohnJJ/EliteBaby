import "./styles/index.scss";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
// const baby = document.getElementById("run0");



const player = {
  w: 60,
  h: 80,
  x: 50,
  y: 400,
  speed: 4,
  dx: 0,
  dy: 5
};


function drawPlayer() {
    const playerImage = new Image();
    playerImage.src = "./src/images/Idle/Idle_000.png";
    ctx.drawImage(playerImage, player.x, player.y, player.w, player.h);
}

function clear(){
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
}

function newPos(){
    player.x += player.dx;
    player.y += player.dy;

    detectWalls();
}

function detectWalls(){
    //left wall
    if (player.x < 0) {
        player.x = 0;
    }
    //right wall
    if (player.x + player.w > canvas.width){
        player.x = canvas.width - player.w;
    }
    //top wall
    if (player.y < 0){
        player.y = 0;
    }
    //bottom wall
    if (player.y + player.h > canvas.height){
        player.y = canvas.height - player.h;
    }
}

function update() {
    clear();
    drawPlayer();
    newPos();
    requestAnimationFrame(update);
}

function moveRight(){
    player.dx = player.speed
}

function moveLeft() {
    player.dx = -player.speed;
}

function moveUp() {
    player.dy = -player.speed;
}

//testing bottomwall
function moveDown(){
    player.dy = player.speed
}


function keyDown(e) {
    if (e.key === "ArrowRight" || e.key === "Right") {
        moveRight();
    }
    if (e.key === "ArrowLeft" || e.key === "Left") {
        moveLeft();
    }
    if (e.key === " " || e.key === "ArrowUp") {
        moveUp();
    }
    //testing down
    if (e.key === "ArrowDown" || e.key === "Down") {
        moveDown();
    }
}

function keyUp(e) {
    if ( e.key == "Right" || e.key == "ArrowRight" || e.key == "Left" || e.key == "ArrowLeft" || e.key == " " || e.key == "ArrowUp"
    ) {
      player.dx = 0;
      player.dy = 3;
    }
}

update();

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);