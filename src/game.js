import Player from "./player";
import KeyInput from "./key_input";
import Tile from "./tile";


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
    }

    newGame(){
        // let gameObjects;
        this.player = new Player(this.canvasWidth, this.canvasHeight);
        this.player.drawPlayer(this.ctx);
        new KeyInput(this.player);
        // this.object = new Tile(this.ctx, 900, 500, -1, 0)
        // this.object.drawTile();

        this.gameObjects = [ new Tile(this.ctx, 900, 500, -1, 0), 
                        new Tile(this.ctx, 1000, 400, -1, 0),
                        new Tile(this.ctx, 250, 0, 2, 2),
                        new Tile(this.ctx, 400, 150, 2, 2),
                        new Tile(this.ctx, 350, 75, -2, 2),
                        new Tile(this.ctx, 300, 300, 2, -2)
                    ];
        
    }

    rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
        // Check x and y for overlap
        if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2) {
            return false;
        }
        return true;
    }

    // detectCollisions() {
    //     let obj1;
    //     let obj2;
    
    //     //reset collision state
    //     for (let i = 0; i < this.gameObjects.length; i++){
    //         this.gameObjects[i].isColliding = false;
    //     }
    //     //check for collisions
    //     for (let i = 0; i < this.gameObjects.length; i++){
    //         obj1 = this.gameObjects[i];
    //         for (let j = i + 1; j< this.gameObjects.length; j++){
    //             obj2 = this.gameObjects[j];
    //             //compare obj1 to obj2
    //             if (this.rectIntersect(obj1.x, obj1.y, obj1.width, obj1.height, obj2.x, obj2.y, obj2.width, obj2.height)){
    //                 obj1.isColliding = true;
    //                 obj2.isColliding = true;
    //             }
    //         }
    //     }
    // }

    detectCollisions() {
       let player = this.player;
       let obj;

        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].isColliding = false;
            player.isColliding = false;
        }

        for (let i = 0; i < this.gameObjects.length; i++) {
            obj = this.gameObjects[i];
            if (this.rectIntersect(obj.x, obj.y, obj.width, obj.height, player.positionX, player.positionY, player.playerWidth, player.playerHeight)) {
                obj.isColliding = true;
                player.isColliding = true;
            }
        }
    }


    clear(){
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

    gameUpdate(){
        // for (let i = 0; i < gameObjects.length; i++)
        this.clear();
        this.player.newPos();
        this.player.drawPlayer(this.ctx);
        for (var i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].update();
        }
        this.detectCollisions();
        for (var i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].drawTile();
        }
        // this.object.update();
        // this.object.drawTile();
        requestAnimationFrame(this.gameUpdate);
    }

}