import "./styles/index.scss";
import EliteBaby from "./game";
import drawBackground from "./background";
// import Background from "./background";




const canvas = document.getElementById("canvas");
new EliteBaby(canvas);
drawBackground();
// new Background(canvas);
