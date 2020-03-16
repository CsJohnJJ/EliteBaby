import "./styles/reset.css";
import "./styles/index.scss";
import EliteBaby from "./scripts/game";
import drawBackground from "./scripts/background";

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    new EliteBaby(canvas);
    drawBackground();
})



