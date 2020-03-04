import "./styles/index.scss";
import EliteBaby from "./game";
import drawBackground from "./background";
import Tile from "./tile";

const canvas = document.getElementById("canvas");
new EliteBaby(canvas);
drawBackground();

// new Tile(ctx)

