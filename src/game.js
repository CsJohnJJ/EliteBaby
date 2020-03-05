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
        this.renderBottle = this.renderBottle.bind(this);
    }

    newGame(){
        // let gameObjects;
        this.player = new Player(this.canvasWidth, this.canvasHeight);
        this.player.drawPlayer(this.ctx);
        new KeyInput(this.player);
        // this.object = new Tile(this.ctx, 900, 500, -1, 0)
        // this.object.drawTile();


        //hard code level map
        this.gameObjects = [
                        new Tile(this.ctx, 100, 560, -1, 0),
            new Bottle(this.ctx, 300, 520, -1, 0),    
                        new Tile(this.ctx, 220, 560, -1, 0),
                        new Tile(this.ctx, 900, 500, -1, 0),
            new Bottle(this.ctx, 300, 400, -1, 0), 
                        new Tile(this.ctx, 1000, 400, -1, 0),
                        new Tile(this.ctx, 1200, 450, -1, 0),
                        new Tile(this.ctx, 1300, 350, -1, 0),
            new Bottle(this.ctx, 600, 400, -1, 0),
                        new Tile(this.ctx, 1400, 200, -1, 0),
                        new Tile(this.ctx, 1400, 100, -1, 0),
                        new Tile(this.ctx, 1600, 200, -1, 0),
                        new Tile(this.ctx, 1600, 300, -1, 0),
                        new Tile(this.ctx, 1720, 300, -1, 0),
                        new Tile(this.ctx, 1840, 300, -1, 0),
                        new Tile(this.ctx, 1960, 300, -1, 0),
                        new Tile(this.ctx, 2080, 300, -1, 0),
                        new Tile(this.ctx, 2200, 300, -1, 0),
            new Candy(this.ctx, 500, 300, -1, 0)
                    ];
        
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
                // player.positionX = obj.x;
                player.positionY = obj.y - obj.height - 45;
            } else if (obj.constructor.name === "Bottle" && this.rectIntersect(obj.x, obj.y, obj.width, obj.height, player.positionX, player.positionY, player.playerWidth, player.playerHeight)) {
                obj.isColliding = true;
                player.isColliding = true; 
                obj.x = -100
                player.score += 1
            } 
            else if (obj.constructor.name === "Candy" && this.rectIntersect         (obj.x, obj.y, obj.width, obj.height, player.positionX,     player.positionY, player.playerWidth, player.playerHeight)){
                console.log("you win")
            } 
        }
    }

    renderBottle(bottle){
        // debugger
        this.ctx.font = "20px Georgia";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("Bottles:", this.canvasWidth - 150, 20);
        this.ctx.fillText(bottle, this.canvasWidth - 80, 20);
    }

    clear(){
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

    gameUpdate(){
        // for (let i = 0; i < gameObjects.length; i++)
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
                this.gameObjects[i].drawCandy();
                // this.gameObjects[i].drawCandyEnd();
            }
        }
        // this.object.update();
        // this.object.drawTile();
        requestAnimationFrame(this.gameUpdate);
    }

}