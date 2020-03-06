import GameObject from "./game_object";

export default class Cabbage extends GameObject {
    constructor(ctx, x, y, vx, vy) {
        super(ctx, x, y, vx, vy);
        this.width = 41;
        this.height = 40;
    }

    drawCabbage() {
        // this.ctx.clearRect(0, 0, 1000, 600);
        const bottleImage = new Image();
        bottleImage.src = "./src/images/food/veg1.png";
        this.ctx.drawImage(bottleImage, this.x, this.y, this.width, this.height)
        // this.x += vx;
        // if (this.x >= canvasWidth) {
        //     this.x = 1000;
        // } 
    }

    // // clearImg(){
    // //     this.ctx.clearRect(0, 0, 1000, 600);
    // // }

    update() {
        this.x += this.vx;
        this.y += this.vy;
    }

}