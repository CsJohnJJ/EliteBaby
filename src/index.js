import "./styles/index.scss";
import EliteBaby from "./scripts/game";
import drawBackground from "./scripts/background";
import Tile from "./scripts/tile";

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    new EliteBaby(canvas);
    drawBackground();
})



