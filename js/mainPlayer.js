/* Set the selected character as the player in the scene */
const character = localStorage.getItem("selectedCharacter");
const player = document.getElementById("player");


//class mainplayer
class MainPlayer {
    constructor() {
        this.gameWidth = ctx.canvas.width;
        this.gameHeight = ctx.canvas.height;
        this.width = 80;
        this.height = 110;
        this.speed = 4;
        this.velY = 0;
        this.velX = 0;
        this.alive= true;
        this.lives=3;
        this.friction = 0.8;// friction
        this.x = this.gameWidth / 2 - this.width / 2;
        this.y = this.gameHeight - this.height - 40;
        player.src = "../img/" + character + ".png";
    }

    //draw mainplayer
    draw() {
        ctx.drawImage(player, this.x, this.y, this.width, this.height);
    }

    //move right
    moveright() {
        if (this.velX < this.speed) {
            this.velX++;
        }
        player.src = "../img/" + character + 'Right' + ".png";
    }

    //moveleft
    moveleft() {
        if (this.velX > -this.speed) {
            this.velX--;
        }
        player.src = "../img/" + character + 'Left' + ".png";
    }

    resetPlayer(){
        this.x = this.gameWidth / 2 - this.width / 2;
        this.y = this.gameHeight - this.height - 40;
        player.src = "../img/" + character + ".png";
    }

    update() {
        // check the keys and do the movement.
        if (keys[39]) {

            this.moveright();
        }
        else if (keys[37]) {
            this.moveleft();
        }
        else {
            player.src = "../img/" + character + ".png";
        }
        // apply some friction to x velocity.
        this.velX *= this.friction;
        this.x += this.velX;
        // bounds checking
        if (this.x + this.width >= this.gameWidth) {
            this.x = this.gameWidth - this.width;
        } else if (this.x <= 5) {
            this.x = 5;
        }
        this.draw();
    }
}

