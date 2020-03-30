export default class Player {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.playerWidth = 60;
        this.playerHeight = 80;
        this.isColliding = false;
        this.ground = true;
        this.jumping = false;
        this.falling = false;
        this.gameOver = false
        this.jumpCount = 2
        this.score = 0
        this.positionX = 50;
        this.positionY = 400,
        this.dx = 0;
        this.dy = 15; // changed from 5
        this.speed = 4;
        this.direction = "right";
        this.frameCount = 0;
        this.jump = this.jump.bind(this);
        // this.onGround = this.onGround.bind(this);
    }



    // // not used
    // animate(ctx) {
    //     this.movePlayer();
    //     this.drawPlayer(ctx);
    // }



    drawPlayer(ctx) {
        const playerImage = new Image();
        playerImage.src = "./src/images/Idle/Idle_000.png";
        // playerImage.src = "./src/images/Running/Running_000.png";
        // let numRows = 15;
        // let numColumns = 1;
        // let frameWidth = 50;
        // let frameHeight = 61;
        ctx.drawImage(playerImage, this.positionX, this.positionY, this.playerWidth, this.playerHeight);
    }

    movePlayer(direction){
        //change the movement of player base on key input
        switch (direction) {
            case "none":
                this.dx = 0;
                break;
            case "left":
                this.dx = -3;
                break
            case "right":
                this.dx = 3;
                // this.drawRunning(this.frameCount);
                break;
            // case "up":
            //     this.dy = -8;
            //     break
            case "gravity":
                this.dy = 15;
                this.ground = false
                // this.jumping = false;
                break    
        }
    }

    

    detectWalls() {
        //left wall
        if (this.positionX < 0) {
            this.positionX = 0;
        }
        //right wall
        if (this.positionX + this.playerWidth > this.canvasWidth) {
          this.positionX = this.canvasWidth - this.playerWidth;
        }
         //top wall
        if (this.positionY < 0){
            this.positionY = 0;
        }
         //bottom wall
        if (this.positionY + this.playerHeight > this.canvasHeight){
            this.gameOver = true
            // this.positionY = this.canvasHeight - this.playerHeight;
        }
    }
    
    newPos() {
        this.positionX += this.dx;
        this.positionY += this.dy;

        this.detectWalls();
    }


    jump() {
        if ((!this.jumping) && this.ground){
            this.dy *= -0.3;
            this.jumping = true;
            this.direction = "up"
        }
    }

    drawRunning(frameCount){
        let spriteMap = new Image();
        spriteMap.src = "./src/images/Running/Running_All.png"
        if (this.direction === "right"){
            this.ctx.drawImage(spriteMap(Math.floor(frameCount / 2) % 12) * 126.4 + 1,
                0,
                126.4,
                175,
                this.x, this.y,
                this.width + 5, this.height);
        }
    }


    // double jump need fix, laggy
    // jump() {
    //     if (this.jumpCount === 2) {
    //         this.dy -= 11;
    //         this.jumpCount = 1;
    //     } else if (this.jumpCount === 1) {
    //         this.dy -= -12;
    //         this.jumpCount = 0
    //     } else if (this.jumpCount === 0 && this.ground === true){
    //         this.jumpCount = 2
    //     }
    // }

    // onGround(){
    //     (this.positionY + this.playerHeight === this.canvasHeight) ? this.ground = false : null
    // }


}

