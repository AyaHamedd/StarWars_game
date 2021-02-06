var laser = document.getElementById("laser");
var playerMiddle;

//class laserBeam 

class LaserBeam {
    constructor() {

        this.width = 15;
        this.height = 800;
        this.speed = 10;
        this.y = 0;
        this.fired = false;
        laser.src = "../img/" + character + "Laser.png";
    }

    //draw laserBeam
    fire() {
        playerMiddle = mainPlayer.x + mainPlayer.width / 2;
        this.y = mainPlayer.y;
        this.fired = true;
        ctx.drawImage(laser, playerMiddle, mainPlayer.y, this.width, this.height);
    }

    //move laser
    move() {
        this.y -= this.speed;
        ctx.drawImage(laser, playerMiddle, this.y, this.width, this.height);
    }

    update() {
        if (keys[32] && !this.fired) {
            this.fire();
        }
        else if (this.fired) {
            this.move();
            if (this.y < 0) {
                this.fired = false;
            }
        }
    }
}

