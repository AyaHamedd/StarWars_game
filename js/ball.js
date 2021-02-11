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

    cloneImage() {
        let clonedImage = this.img.cloneNode(true);
        clonedImage.style.width = (this.img.width - 20) + "px";
        clonedImage.style.height = (this.img.height - 19) + "px";

        return clonedImage;
    }

    splitBall(){
        let newBall1 = new Ball(this.cloneImage(), this.left - 10, this.top + 5, this.diameter - 20, this.velX, this.velY);
        let newBall2 = new Ball(this.cloneImage(), this.left + 10, this.top + 5, this.diameter - 20, - this.velX, this.velY);

        let ballIndex = balls.indexOf(this);
        balls.splice(ballIndex, 1);
        console.log(newBall1.diameter);

        if(newBall1.diameter !== 10) {
            balls.push(newBall1);
        }
        if(newBall2.diameter !== 10) {
            balls.push(newBall2);
        }
    }

    draw() {
        ctx.drawImage(this.img, this.left, this.top, this.diameter, this.diameter);
        this.move();
    }
}