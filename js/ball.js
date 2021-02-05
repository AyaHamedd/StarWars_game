const gravity = 0.1;
const maxSpeed = 9;
const tolerance = 2;

/*Ball class*/
class Ball {
    constructor(image, x, y, d, vx, vy) {
        this.img = image;
        this.left = x;
        this.top = y;
        this.diameter = d;
        this.velX = vx;
        this.velY = vy;
    }

    checkSpeedLimit() {
        if (this.velY > maxSpeed)
            this.velY = maxSpeed;
        if (this.velY < -maxSpeed)
            this.velY = -maxSpeed;
    }

    checkBoundaries() {
        if (this.left > (ctx.canvas.width - this.diameter - tolerance) || this.left < tolerance) {
            this.velX = -this.velX;
        }
        if (this.top > ( ctx.canvas.height - this.diameter - groundHeight) || this.top < groundHeight) {
            this.velY = -this.velY;
        }
    }
    
    move() {
        this.left += this.velX;
        this.top += this.velY;
        this.velY += gravity;
        this.checkSpeedLimit();
        this.checkBoundaries();
    }

    draw() {
        this.move();
        ctx.drawImage(this.img, this.left, this.top, this.diameter, this.diameter);
    }
}