import "./styles/index.scss";
import EliteBaby from "./game";

const canvas = document.getElementById("canvas");
let game = new EliteBaby(canvas);





// // refactored 

// function newPos(){
//     player.x += player.dx;
//     player.y += player.dy;

//     detectWalls();
// }

// function detectWalls(){
//     //left wall
//     if (player.x < 0) {
//         player.x = 0;
//     }
//     //right wall
//     if (player.x + player.w > canvas.width){
//         player.x = canvas.width - player.w;
//     }
//     //top wall
//     if (player.y < 0){
//         player.y = 0;
//     }
//     //bottom wall
//     if (player.y + player.h > canvas.height){
//         player.y = canvas.height - player.h;
//     }
// }

// function update() {
//     clear();
//     drawPlayer();
//     newPos();
//     requestAnimationFrame(update);
// }

// update();
