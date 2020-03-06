import "./styles/index.scss";
import EliteBaby from "./scripts/game";
import drawBackground from "./scripts/background";
import Tile from "./scripts/tile";

const canvas = document.getElementById("canvas");
new EliteBaby(canvas);
drawBackground();

// new Tile(ctx)

