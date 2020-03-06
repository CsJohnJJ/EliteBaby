export default class BackgroundLayer{
    
    constructor(canvas, imgSrc, v){
        this.canvas = canvas;
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
        this.ctx = canvas.getContext("2d");
        this.imgX = v["imgX"];
        // this.imgX = 0; // positive scroll right, neg scroll left
        this.imgY = 0;
        this.imgPosX = 0;
        this.imgPosY = 0;
        this.layerImg = new Image();
        this.layerImg.src = `${imgSrc}`;
        this.drawLayer = this.drawLayer.bind(this);
        
        
    }

    scroll() {
        this.imgPosX += this.imgX;
    }


    // drawLayer(){
    //     const layerImg = new Image();
    //     layerImg.src = "./src/images/background/platformer_background_2.png"
    //     // this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    //     this.ctx.drawImage(layerImg, this.imgPosX, this.imgPosY, this.canvasWidth, this.canvasHeight);
    //     this.canvasWidth += this.imgX
    // }

    drawLayer(){
        //  
        let { canvas, ctx, canvasWidth, canvasHeight, layerImg, imgPosX, imgPosY, imgX } = this;

        function loop(){
            //  
            ctx.clearRect(0,0, 1000, 600);

            ctx.drawImage(layerImg, imgPosX, 0, canvasWidth, canvasHeight);
            ctx.drawImage(layerImg, imgPosX + canvasWidth, 0, canvasWidth, canvasHeight);

            imgPosX += imgX

            if (imgPosX >= canvasWidth) {
                imgPosX = 1000;
            } 
            else if (imgPosX < -(canvasWidth)){
                imgPosX = 1;
            }

            requestAnimationFrame(loop);
        }
        loop();
    }

}