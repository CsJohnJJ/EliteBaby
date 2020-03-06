import Player from "./player";
import KeyInput from "./key_input";
import Tile from "./tile";
import Bottle from "./food";
import Candy from "./flag";


export default class EliteBaby {
    constructor(canvas){
        this.canvas = canvas
        this.ctx = canvas.getContext("2d");
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
        this.newGame();
        this.clear = this.clear.bind(this);
        this.gameUpdate = this.gameUpdate.bind(this);
        this.gameUpdate();
        this.gameObjects;
        this.player;
        this.isWon = false
        this.renderBottle = this.renderBottle.bind(this);
        // this.enterKey = this.enterKey.bind(this);
        // document.addEventListener('keydown', this.enterKey);
        this.restartKey = this.restartKey.bind(this);
        document.addEventListener('keydown', this.restartKey);
    }

    newGame(){
        // let gameObjects;
        this.player = new Player(this.canvasWidth, this.canvasHeight);
        this.player.drawPlayer(this.ctx);
        new KeyInput(this.player);

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
            new Tile(this.ctx, 1300, 350, -1, 0),
            new Tile(this.ctx, 1600, 300, -1, 0),
            new Tile(this.ctx, 1720, 300, -1, 0),
            new Bottle(this.ctx, 1690, 260, -1, 0),
            new Tile(this.ctx, 1840, 300, -1, 0),
            new Tile(this.ctx, 2080, 300, -1, 0),
            new Tile(this.ctx, 2200, 300, -1, 0),
            new Tile(this.ctx, 2400, 350, -1, 0),
            new Tile(this.ctx, 2600, 400, -1, 0),
            new Tile(this.ctx, 2800, 300, -1, 0),
            new Bottle(this.ctx, 1900, 250, -1, 0),
            new Bottle(this.ctx, 2000, 200, -1, 0),
            new Bottle(this.ctx, 2100, 250, -1, 0),
            new Candy(this.ctx, 3000, 300, -1, 0)
        ];
        
    }

    // enterKey(event){
    //     if(event.keyCode ===13){
    //         document.removeEventListener("keydown", this.enterKey);
    //         this.newGame();
    //     }
    // }

    restartKey(event) {
        if (event.keyCode === 82) {
            this.isWon = false;
            this.player.hitBottom = false
            this.newGame();
        }
    }

    youWin(){
        this.clear();
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0,0, this.canvasWidth, this.canvasHeight);
        this.ctx.font = "50px Georgia";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("You Won! You Are Growing Up So Fast!!", 80, 200)
        this.ctx.fillText("Press \'r\' to play again", 300, 300);
    }
    
    gameOver(){
            this.clear();
            this.ctx.fillStyle = "black";
            this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
            this.ctx.font = "50px Georgia";
            this.ctx.fillStyle = "white";
            this.ctx.fillText("You Lost, It's Time For Bed", 220, 200);
            this.ctx.fillText("Press \'r\' to try again", 300, 300);
    }

   
    rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
        // Check x and y for overlap
        if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2) 
        {
            return false;
        }
        return true;
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
            if (obj.constructor.name === "Tile" && this.rectIntersect(obj.x, obj.y, obj.width, obj.height, player.positionX, player.positionY, player.playerWidth, player.playerHeight)) {
                obj.isColliding = true;
                player.isColliding = true   
                player.positionX -= 1;
                player.positionY = obj.y - obj.height - 45;
            } else if (obj.constructor.name === "Bottle" && this.rectIntersect(obj.x, obj.y, obj.width, obj.height, player.positionX, player.positionY, player.playerWidth, player.playerHeight)) {
                obj.isColliding = true;
                player.isColliding = true; 
                obj.x = -100
                player.score += 1
            } 
            else if (obj.constructor.name === "Candy" && this.rectIntersect         (obj.x, obj.y, obj.width, obj.height, player.positionX,     player.positionY, player.playerWidth, player.playerHeight)){
                this.isWon = true
            } 
        }
    }

    renderBottle(bottle){
        this.ctx.font = "20px Georgia";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("Bottles:", this.canvasWidth - 150, 20);
        this.ctx.fillText(bottle, this.canvasWidth - 80, 20);
    }

    clear(){
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

    gameUpdate(){
        if(!this.isWon && this.player.hitBottom === false
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

            for (let i = 0; i < this.gameObjects.length; i++) {
                if (this.gameObjects[i].constructor.name === "Tile") {
                    this.gameObjects[i].drawTile();
                }
                else if (this.gameObjects[i].constructor.name === "Bottle"){
                    this.gameObjects[i].drawBottle(); 
                } else if (this.gameObjects[i].constructor.name === "Candy") {
                    this.gameObjects[i].drawCandyBottom();
                    this.gameObjects[i].drawCandyEnd();
                }
            }
        }else if (this.player.hitBottom){

            this.gameOver();
        }else{
            this.youWin();
        }
        requestAnimationFrame(this.gameUpdate);
    }

}