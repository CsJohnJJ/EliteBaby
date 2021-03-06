import Player from "./player";
import KeyInput from "./key_input";
import Tile from "./tile";
import Bottle from "./food";
import Candy from "./flag";
import Cabbage from "./enemy";


export default class EliteBaby {
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
        this.setSound();
        this.muted= false;
        this.newGame();
        this.clear = this.clear.bind(this);
        this.gameUpdate = this.gameUpdate.bind(this);
        this.gameUpdate();
        this.gameObjects;
        this.player;
        this.gotHit = false
        this.isWon = false;
        this.playingGame = false;
        this.musicOn = true;
        this.play = this.play.bind(this);
        this.gameMusic;
        this.loseSound;
        this.renderBottle = this.renderBottle.bind(this);
        this.enterKey = this.enterKey.bind(this);
        document.addEventListener('keydown', this.enterKey);
        this.restartKey = this.restartKey.bind(this);
        document.addEventListener('keydown', this.restartKey);
        this.musicPlayPause = this.musicPlayPause.bind(this);
        document.addEventListener("keydown", this.musicPlayPause);
    }

    newGame(){
        //hard code level map
        this.gameObjects = [
            new Tile(this.ctx, 100, 560, -1, 0),
            new Tile(this.ctx, 220, 560, -1, 0),
            new Bottle(this.ctx, 300, 520, -1, 0),    
            new Bottle(this.ctx, 350, 400, -1, 0), 
            new Tile(this.ctx, 440, 450, -1, 0),
            new Bottle(this.ctx, 500, 410, -1, 0),
            new Tile(this.ctx, 700, 400, -1, 0),
            new Bottle(this.ctx, 950, 210, -1, 0),
            new Tile(this.ctx, 900, 500, -1, 0),
            new Tile(this.ctx, 1100, 450, -1, 0),
            new Cabbage(this.ctx, 1500, 400, -1.5, 0),
            new Cabbage(this.ctx, 1100, 480, -2, 0),
            new Tile(this.ctx, 1300, 350, -1, 0),
            new Tile(this.ctx, 1600, 300, -1, 0),
            new Tile(this.ctx, 1720, 300, -1, 0),
            new Bottle(this.ctx, 1690, 260, -1, 0),
            new Tile(this.ctx, 1840, 300, -1, 0),
            new Tile(this.ctx, 2080, 300, -1, 0),
            new Tile(this.ctx, 2200, 300, -1, 0),
            new Cabbage(this.ctx, 2300, 260, -1.5, 0),
            new Tile(this.ctx, 2400, 350, -1, 0),
            new Tile(this.ctx, 2600, 400, -1, 0),
            new Tile(this.ctx, 2800, 300, -1, 0),
            new Bottle(this.ctx, 1900, 250, -1, 0),
            new Bottle(this.ctx, 2000, 200, -1, 0),
            new Bottle(this.ctx, 2100, 250, -1, 0),
            new Candy(this.ctx, 3000, 300, -1, 0)
        ];

        // for (let i = 0; i < this.gameObjects.length; i++) {
        //     if (this.gameObjects[i] instanceof Tile) {
        //         this.gameObjects[i].drawTile();
        //     }
        //     else if (this.gameObjects[i] instanceof Bottle) {
        //         this.gameObjects[i].drawBottle();
        //     } else if (this.gameObjects[i] instanceof Candy) {
        //         this.gameObjects[i].drawCandyBottom();
        //         this.gameObjects[i].drawCandyEnd();
        //     }
        //     else if (this.gameObjects[i] instanceof Cabbage) {
        //         this.gameObjects[i].drawCabbage();
        //     }
        // }
        
        // create player
        this.player = new Player(this.canvasWidth, this.canvasHeight);
        this.player.drawPlayer(this.ctx);
        new KeyInput(this.player);
        this.playingGame = true;
        this.play(this.gameMusic)
    }
    
    enterKey(event){
        if(event.keyCode ===13){
            document.removeEventListener("keydown", this.enterKey);
            this.newGame();
        }
    }
    
    restartKey(event) {
        if (event.keyCode === 82) {
            this.isWon = false;
            this.player.gameOver = false
            this.newGame();
        }
    }

    musicPlayPause(event){
        if (event.keyCode === 77) {
            if (this.musicOn){
                this.pause(this.gameMusic);
                // this.musicOn = false;
            } else {
                this.play(this.gameMusic);
                // this.musicOn = true;
            }
        }
    }
    
    setSound() {
        this.gameMusic = new Audio("./src/audio/music/gameMusic.mp3");
        this.gameMusic.volume = .4;
        this.gameMusic.loop = true;
        this.bottleSound = new Audio("./src/audio/sound/bottle.mp3");
        this.bottleSound.volume = .4;
        this.winSound = new Audio("./src/audio/sound/win.mp3");
        this.winSound.volume = .4;
        this.loseSound = new Audio("./src/audio/sound/lose.mp3");
        this.loseSound.volume = 0.4;
    }

    gameMenu(){
        this.clear();
        this.ctx.shadowColor = "black";
        this.ctx.shadowBlur = 10;
        this.ctx.font = "50px Georgia";
        this.ctx.fillStyle = "lightgray";
        this.ctx.fillText("Press \'enter\' to play", 500, 400);
        const title = new Image();
        title.src ="./src/images/ebdetail.png";
        this.ctx.drawImage(title, 10, 100)
    }

    youWin(){
        this.clear();
        const wonImg = new Image();
        wonImg.src = "./src/images/background/winbackground.png";
        this.ctx.drawImage(wonImg, 0, 0, this.canvasWidth, this.canvasHeight);
        this.ctx.shadowColor = "black";
        this.ctx.shadowBlur = 10;
        this.ctx.font = "50px Georgia";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("You Won! You Are Growing Up So Fast!!", 500, 300)
        this.ctx.fillText("Press \'r\' to play again", 500, 400);
    }
    
    gameOver(){
        // this.play(this.loseSound);
        this.clear();
        const gameOverImg = new Image();
        gameOverImg.src = "./src/images/background/losebackground.png";
        this.ctx.drawImage(gameOverImg, 0, 0, this.canvasWidth, this.canvasHeight)
        this.ctx.shadowColor = "black";
        this.ctx.shadowBlur = 10;
        this.ctx.font = "50px Georgia";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("Game Over", 500, 150);
        if (this.gotHit){
            this.ctx.fillText("Veggies Got You", 500, 250);
        }else{
            this.ctx.fillText("Jump Higher Next Time", 500, 250);
        }
        this.ctx.fillText("Press \'r\' to try again", 500, 350);
        const gameOverBaby = new Image();
        gameOverBaby.src = "./src/images/gameover.png";
        this.ctx.drawImage(gameOverBaby, 310, 400, 130, 130);  
    }



    play(sound) {
        sound.currentTime = 0;
        this.musicOn = true
        sound.play();
    }

    pause(sound){
        this.musicOn = false
        sound.pause();
    }
   
    objCollision(x1, y1, w1, h1, x2, y2, w2, h2) {
        // Check x and y for overlap, obj to player
        if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2) 
        {
            return false;
        }
        return true;
    }

    // objCollision(x1, y1, w1, h1, x2, y2, w2, h2) {
    //     if (x1 < x2 + w2 
    //         &&
    //         x1 + w1 > x2 
    //         &&
    //         y1 < y2 + h2 
    //         &&
    //         y1 + h1 > y2
    //         ){
    //             return true;
    //         }
    //     return false;
    // }

    tileCollision(x1, y1, w1, h1, x2, y2, w2, h2){
        if (y2 < y1 - h1){
            return true; 
        }
        return false;
    }

    detectCollisions() {
       let player = this.player;
       let obj;

        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].isColliding = false;
            player.isColliding = false;
        }

        for (let i = 0; i < this.gameObjects.length; i++) {
            obj = this.gameObjects[i];
            //  let prev = obj.y - obj.height - 55
            if (obj instanceof Tile && this.objCollision(obj.x, obj.y, obj.width, obj.height, player.positionX, player.positionY, player.playerWidth, player.playerHeight)) {
                obj.isColliding = true;
                player.isColliding = true;
                player.jumping = false;   
                player.ground = true;
                player.positionX -= 1;
                this.gotHit = false;
                player.positionY = obj.y - obj.height - 54;
            } else if (obj instanceof Bottle && this.objCollision(obj.x, obj.y, obj.width, obj.height, player.positionX, player.positionY, player.playerWidth, player.playerHeight)) {
                this.play(this.bottleSound);
                obj.isColliding = true;
                player.isColliding = true; 
                obj.x = -100
                this.gotHit = false;
                player.score += 1
            } 
            else if (obj instanceof Candy && this.objCollision(obj.x, obj.y, obj.width, obj.height, player.positionX,     player.positionY, player.playerWidth, player.playerHeight)){
                this.play(this.winSound);
                this.gotHit = false;
                this.isWon = true;
            } 
            else if (obj instanceof Cabbage && this.objCollision(obj.x, obj.y, obj.width, obj.height, player.positionX, player.positionY, player.playerWidth, player.playerHeight)) {
                this.player.gameOver = true;
                this.gotHit = true
                this.pause(this.gameMusic)
                this.play(this.loseSound);
            } 
        }
    }

    renderBottle(bottle){
        this.ctx.font = "30px Georgia";
        this.ctx.fillStyle = "white";
        this.ctx.textAlign = "center";
        this.ctx.fillText("Bottles:", this.canvasWidth - 500, 30);
        this.ctx.fillText(bottle, this.canvasWidth - 430, 30);
    }

    clear(){
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

    gameUpdate(){
        if(!this.isWon && this.player.gameOver === false && this.playingGame === true
            ){
            this.clear();
            // this.player.newPos();
            // this.player.drawPlayer(this.ctx);
            this.renderBottle(this.player.score)

            for (var i = 0; i < this.gameObjects.length; i++) {
                this.gameObjects[i].update();
            }

            this.detectCollisions();
            this.player.newPos();
            this.player.drawPlayer(this.ctx);
            // this.player.drawRunning();

            for (let i = 0; i < this.gameObjects.length; i++) {
                if (this.gameObjects[i] instanceof Tile) {
                    this.gameObjects[i].drawTile();
                }
                else if (this.gameObjects[i] instanceof Bottle){
                    this.gameObjects[i].drawBottle(); 
                } else if (this.gameObjects[i] instanceof Candy) {
                    this.gameObjects[i].drawCandyBottom();
                    this.gameObjects[i].drawCandyEnd();
                }
                else if (this.gameObjects[i] instanceof Cabbage) {
                    this.gameObjects[i].drawCabbage();
                }
            }
        }else if (this.player.gameOver){
            this.pause(this.gameMusic);
            // setTimeout(this.gameOver(), 2000);
            this.gameOver();
        } else if (!this.playingGame) {
            this.gameMenu();
        }else{
            this.pause(this.gameMusic);
            this.youWin();
        }
        requestAnimationFrame(this.gameUpdate);
    }

}