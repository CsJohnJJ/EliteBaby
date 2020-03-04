import GameObject from "./game_object";

export default class Tile extends GameObject {
    constructor(ctx, x, y, vx, vy){
        super(ctx, x, y, vx, vy);
        this.width = 50;
        this.height = 40;
    }

    drawTile(){
        // ctx.clearRect(0, 0, 1000, 600);
        // const tileImage = new Image();
        // tileImage.src = "./src/images/tile/cloudtile.png";
        // this.ctx.drawImage(tileImage, this.x, this.y, this.width, this.height)
        // imgPosX += imgX
        // if (imgPosX >= canvasWidth) {
        //     imgPosX = 1000;
        // } 

        //placeholder, square
        this.ctx.fillStyle = this.isColliding ? '#ff8080' : '#0099b0';
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update(){
        this.x += this.vx;
        this.y += this.vy;
    }


}