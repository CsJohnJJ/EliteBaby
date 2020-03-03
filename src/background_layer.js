export default class BackgroundLayer{
    constructor(canvasWidth, canvasHeight){
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.imgX = 0; // positive scroll right, neg scroll left
        this.imgY = 0;
        this.imgPosX = 0;
        this.imgPosY = 0;
    }

    scroll() {
        this.imgPosX += this.imgX;
        this.imgPosY += this.imgY;
    }


    drawLayer(ctx){
        const layerImg = new Image();
        layerImg.src = "./src/images/background/platformer_background_2.png"
        // this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        ctx.drawImage(layerImg, this.imgPosX, this.imgPosY, this.canvasWidth, this.canvasHeight);
        this.canvasWidth += this.imgX
    }


    // loop(){
    //     ctx.drawImage(layerImg, this.imgPosX, this.imgPosY, this.canvasWidth, this.canvasHeight);
    // }

}