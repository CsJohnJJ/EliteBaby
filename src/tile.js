export default class Tile {
    constructor(){

    }

    drawTile(){
        ctx.clearRect(0, 0, 1000, 600);
        const tileImage = new Image();
        tileImage.src = "./src/images/tile/cloudtile.png";
        ctx.drawImage(tileImage, imgPosX, 0, canvasWidth, canvasHeight)
        imgPosX += imgX
        if (imgPosX >= canvasWidth) {
            imgPosX = 1000;
        } 
        

    }


}