export default class GameObject{
    constructor(ctx, x, y, vx, vy){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;

        this.isColliding = false;
    }
}