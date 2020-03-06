import GameObject from "./game_object";

export default class Tile extends GameObject {
    constructor(ctx, x, y, vx, vy){
        super(ctx, x, y, vx, vy);
        this.width = 120;
        this.height = 40;
    }

    drawTile(){
        // this.ctx.clearRect(0, 0, 1000, 600);
        const tileImage = new Image();
        tileImage.src = "./src/images/tile/cloudtile.png";
        this.ctx.drawImage(tileImage, this.x, this.y, this.width, this.height)
    }

    update(){
        this.x += this.vx;
        this.y += this.vy;
    }


}