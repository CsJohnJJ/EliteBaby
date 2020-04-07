# Elite Baby 

## Background and Overview
Elite Baby is a side scrolling platform game. A user controls a baby's run and jump with right/left/up arrow keys. User will have to run across platforms, and collect objects such as milk bottles to increase their score. User will also have to avoid enemies such as cabbage, and falling off the map. Being hit by an enemy will end the game. Enjoy the game here at the<a href="http://jianjiang.me/EliteBaby/">(Live Site)</a>

<p align=center>
<img src="src/images/elitebaby1.gif" alt="Gameplay">
</p>

## Functionality and MVPs 

#### In Elite Baby, users can:
  - Move left and right
  - Jump up 
  - Collect food
  - See current score base on the food collected
  - Restart game at anytime
  - Mute/unmute sound

#### Game Features

- Game menu, simple introduction to the game 
<p align=center>
<img src="https://user-images.githubusercontent.com/50147749/78211520-32c82b80-747b-11ea-9d7e-ff9e635e7cd6.png" width=500 alt="Main Menu">
</p>

- Implement endless background scrolling for multi layers. Each background layer has it's own velocity and element (clouds/stars/color)

```
default class BackgroundLayer{  
    constructor(canvas, imgSrc, v){
        this.canvas = canvas;
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
        this.ctx = canvas.getContext("2d");
        this.imgX = v["imgX"];
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

    drawLayer(){

        let { canvas, ctx, canvasWidth, canvasHeight, layerImg, imgPosX, imgPosY, imgX } = this;

        function loop(){
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
```

```
function drawLayers(i) {
    let v = { imgX: 0 };
    switch(i) {
        case 0:
            v["imgX"] = 0;
            break
        case 1:
            v["imgX"] = -.8;
            break
        case 2:
            v["imgX"] = -1;
            break
        case 3:
            v["imgX"] = -2;
            break    
        case 4:
            v["imgX"] = -1.7;
            break
        case 5:
            v["imgX"] = 0;
            break
        case 6:
            v["imgX"] = -1.5;
            break
        case 7:
            v["imgX"] = 0;
            break 
        case 8:
            v["imgX"] = -1;
            break               
    }

    new BackgroundLayer(
        document.getElementById("l" + i),
        src + i + ".png",
        v
        ).drawLayer();
}

function drawBackground() {
    let layers = [];

    for (let i = 0; i < 9; i++) {
        layers.push(i)
    }
    layers.forEach(i => drawLayers(i));
}
```
- Formulated simple game object classes based on Object-Oriented Programming patterns for DRY code, which lends itself easily to the reuse of code through principles of inheritance and abstraction.   

```
class GameObject{
    constructor(ctx, x, y, vx, vy){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;

        this.isColliding = false;
    }
}
```

## Architecture and Technology
- JavaScript
- HTML
- CSS
- Canvas

## Implementation Timeline 

- Day 1
    - Game logic & Canvas & Research
- Day 2
    - Game logic & Player Controller/Input
- Day 3
    - Background Scrolling & Collison Detection
- Day 4
    - Game Menu & Start & Restart & End
- Day 5
    - Game logic/canvas

## Bonus Features

- User able to attack enemies
- Power up
- Select map difficulty

