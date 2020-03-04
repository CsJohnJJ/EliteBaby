import BackgroundLayer from "./background_layer";
const src = "./src/images/background/layers/";

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

export default drawBackground;