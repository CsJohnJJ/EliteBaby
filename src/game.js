import Player from "./player";
import KeyInput from "./key_input";

import BackgroundLayer from "./background_layer";


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
    }

    newGame(){
        this.player = new Player(this.canvasWidth, this.canvasHeight);
        this.player.drawPlayer(this.ctx);
        new KeyInput(this.player);

        // this.backgroundlayer = new BackgroundLayer(this.canvasWidth, this.canvasHeight);
        // this.backgroundlayer.drawLayer(this.ctx);
    }

    clear(){
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

    gameUpdate(){
        this.clear();

        // this.backgroundlayer.drawLayer(this.ctx);  //draw 1 layer background
        this.player.newPos();
        this.player.drawPlayer(this.ctx);
        requestAnimationFrame(this.gameUpdate);
    }

}