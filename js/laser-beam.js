var laser = document.getElementById("laser");
var playerMiddle;

//class laserBeam 

class LaserBeam {
    playerMiddle = 0;
    constructor() {

        this.width = 15;
        this.height = 800;
        this.speed = 20;
        this.y = 0;
        this.fired = false;
        this.sound = new Audio('../sounds/laser.wav');
        laser.src = "../img/" + character + "Laser.png";
    }

    //draw laserBeam
    fire() {
        this.sound.play();
        this.playerMiddle = mainPlayer.x + mainPlayer.width / 2;
        //this.setPlayerMiddle();
        this.y = mainPlayer.y;
        this.fired = true;
        ctx.drawImage(laser, this.playerMiddle, mainPlayer.y, this.width, this.height);
    }

    //move laser
    move() {
        this.y -= this.speed;
        ctx.drawImage(laser, this.playerMiddle, this.y, this.width, this.height);
    }

    setPlayerMiddle(playerMiddleVal) {
        this.playerMiddle = playerMiddleVal;
    }

    getPlayerMiddle() {
        return this.playerMiddle;
    }

    update() {
        if (keys[32] && !this.fired) {
            this.fire();
        }
        else if (this.fired) {
            this.move();
            if (this.y < 0) {
                this.fired = false;
                this.playerMiddle = 0;
            }
        }
    }
}

