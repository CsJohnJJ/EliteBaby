import "./styles/index.scss";
import EliteBaby from "./game";
import drawBackground from "./background";

const canvas = document.getElementById("canvas");
new EliteBaby(canvas);
drawBackground();

