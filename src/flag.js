import GameObject from "./game_object";

export default class Candy extends GameObject {
    constructor(ctx, x, y, vx, vy) {
        super(ctx, x, y, vx, vy);
        this.width = 150;
        this.height = 300;
    }

    drawCandy() {
        // this.ctx.clearRect(0, 0, 1000, 600);
        const candyImage = new Image();
        candyImage.src = "./src/images/food/candyFlag.png";
        this.ctx.drawImage(candyImage, this.x, this.y, this.width, this.height)
    }
    drawCandyEnd(){
        const candyImage = new Image();
        candyImage.src = "./src/images/food/candyFlagTop.png";
        this.ctx.drawImage(candyImage, this.x, this.y, this.width, this.height)
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
    }
}