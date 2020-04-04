# Elite Baby 

## Background and Overview
Elite Baby is a platform game which a user controls a baby who runs and jumps onto platforms and objects to collect foods such as milk bottles. Some of these foods will be power ups to help user through the game. User will also avoid enemies such as broccoli. Being caught by an enemy will end the game. Difficulty will increase overtime, the longer the user plays without restarting or select from difficulty level.

<a href="http://jianjiang.me/EliteBaby/">Live  Site</a>

## Functionality and MVPs 

In Elite Baby, users will be able to:
  - Move left and right
  - Jump up 
  - Collect food
  - See current score base on the food collected
  - Platform is moving, disppearing
  - Infinite scrolling background
  - Restart, pause, end game
  - Sound

## Wireframes 

#### Main Menu
<p align=center>
<img src="https://user-images.githubusercontent.com/50147749/78211520-32c82b80-747b-11ea-9d7e-ff9e635e7cd6.png" width=500 alt="Main Menu">
</p>

#### Gameplay

<p align=center>
<img src="src/images/elitebaby1.gif" alt="Gameplay">
</p>

## Code Snippet 

Implement endless background scrolling for multi layers. Each background layer has it's own velocity and element (clouds/stars/color)

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

