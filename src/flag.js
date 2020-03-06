import GameObject from "./game_object";

export default class Candy extends GameObject {
    constructor(ctx, x, y, vx, vy) {
        super(ctx, x, y, vx, vy);
        this.width = 140;
        this.height = 140;
    }

    // drawCandy() {
    //     // this.ctx.clearRect(0, 0, 1000, 600);
    //     const candyImage = new Image();
    //     candyImage.src = "./src/images/food/candyFlag.png";
    //     this.ctx.drawImage(candyImage, this.x, this.y, this.width, this.height)
    // }

    drawCandyEnd(){
        const candyImage = new Image();
        candyImage.src = "./src/images/food/candyFlagTop.png";
        this.ctx.drawImage(candyImage, this.x, this.y, 150, 150)
    }

    drawCandyBottom() {
        const candyImage = new Image();
        candyImage.src = "./src/images/food/candyFlagBottom.png";
        this.ctx.drawImage(candyImage, this.x + 75, this.y + 150, 20, 150)
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
    }
}