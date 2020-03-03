import Player from "./player";
import KeyInput from "./key_input";


export default class EliteBaby {
    constructor(canvas){
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
    }

    clear(){
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

    gameUpdate(){
        this.clear();
        this.player.newPos();
        this.player.drawPlayer(this.ctx);
        requestAnimationFrame(this.gameUpdate);
    }

}