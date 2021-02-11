const gameBody = document.getElementsByTagName("body")[0];
const livesBlock = document.getElementById("lives");
const canvas = document.getElementById("myCanvas");
const planet = document.getElementsByClassName("planet");
const label = document.querySelector("#label");
const ground = document.querySelector("#ground");

const backgrounds = ["../img/level1.jpg", "../img/level2.jpg", "../img/level3.jpg",
                    "../img/level4.jpg", "../img/level5.jpg"];
const grounds = ["../img/ground.jpg", "../img/ground3.jpg", "../img/ground.jpg",
                    "../img/ground3.jpg", "../img/ground2.jpg"]

ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let mainPlayer = new MainPlayer();

let ball1 = planet[0];
let ball2 = planet[1];
let ball3 = planet[2];
let ball4 = planet[3];
let ball5 = planet[4];

let lvlBalls = [ball1, ball2, ball3, ball4, ball5];

let balls = [];
let laserBeam = new LaserBeam();
let keys = [];

livesBlock.src = "../img/" + mainPlayer.lives + "Lives.png";
const groundHeight = 40;
const roofToPlayerDistance = ctx.canvas.height - groundHeight - mainPlayer.height;
const collisionTolerance = 13;

class Game {
    level = -1;
    maxLevel = 6;
    ballVelX = 1;
    ballVelY = 0.1;

    setLevel(lvl) {
        this.level = lvl;
    }

    getLevel() {
        return this.level;
    }

    setBallsArray() {
        let ballIndex = (this.level - 1) % (lvlBalls.length + 1);
        if(this.level >= 5) {
            lvlBalls[ballIndex].width = 110;
            balls = [new Ball(lvlBalls[ballIndex], 1, 150, 110, this.ballVelX, this.ballVelY),
                    new Ball(lvlBalls[ballIndex], ctx.canvas.width - 119, 150, 110, -this.ballVelX, this.ballVelY)];
        }
        else if(this.level >= 3) {
            balls = [new Ball(lvlBalls[ballIndex], 1, 150, 90, this.ballVelX, this.ballVelY),
                    new Ball(lvlBalls[ballIndex], ctx.canvas.width - 99, 150, 90, -this.ballVelX, this.ballVelY)];
        }
        else {
            balls = [new Ball(lvlBalls[ballIndex], 1, 150, 90, this.ballVelX, this.ballVelY)];
        }
        //this.ballVelX += 0.5;
        this.ballVelY += 3;
    }

    setBackground() {
        let bgIndex = (this.level - 1) % (backgrounds.length + 1);
        gameBody.style.background = `url(${backgrounds[bgIndex]})`;
        gameBody.style.backgroundRepeat = "no-repeat";
        gameBody.style.backgroundSize = "cover";
    }

    setGround() {
        let gIndex = (this.level - 1) % (grounds.length + 1);
        ground.style.background = `url(${grounds[gIndex]})`;
        ground.style.backgroundRepeat = "no-repeat";
        ground.style.backgroundSize = "cover";
    }

    update() {
        if (mainPlayer.alive) {
            requestAnimationFrame(() => this.update());
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            laserBeam.update();
            mainPlayer.update();
            this.drawBalls();
        }
    }

    drawBalls() {
        for (var i = 0; i < balls.length; i++) {
            balls[i].draw();
            if (this.playerBallCollision(balls[i])) {
                this.loseLife();
                balls.splice(0, balls.length);
                return;
            }
            if(this.laserBallCollision(balls[i])) {
                if(balls.length === 0) {
                    this.winLevel();
                    return;
                }
            }
        }
    }

    playerBallCollision(ball) {
        var roofToBallButtomDistance = ball.top + ball.diameter - collisionTolerance;
        var ballRightDistance = ball.left + ball.diameter - collisionTolerance;
        var playerRightDistance = mainPlayer.x + mainPlayer.width - collisionTolerance;
        return (roofToBallButtomDistance > roofToPlayerDistance) && (ballRightDistance > mainPlayer.x) && (ball.left < playerRightDistance);
    }

    laserBallCollision(ball) {
        var laserLeftDistance = laserBeam.getPlayerMiddle() + laserBeam.width;
        var ballRightDistance = ball.left + ball.diameter;
        var laserToBallBottomDistance = ball.top + ball.diameter;
        if(laserBeam.fired && (laserLeftDistance >= ball.left) &&
            (laserBeam.getPlayerMiddle() <= ballRightDistance) &&
            (laserBeam.y <= laserToBallBottomDistance)) {

            laserBeam.fired = false;
            ball.splitBall();
            laserBeam.setPlayerMiddle(0);

            return true;
        }

        return false;
    }

    loseLife() {
        mainPlayer.lives--;
        mainPlayer.alive=false;
        gameBody.style.backdropFilter = "grayscale(1.0)";
        ground.style.filter = "grayscale(100%)";
        livesBlock.src = "../img/" + mainPlayer.lives + "Lives.png";
        if (mainPlayer.lives == 0) {
            mainPlayer.alive = false;
            this.gameOver();
        }
        else {
            label.innerText = "You lost a life";
            label.style.visibility = "visible";
            setTimeout(restartGame, 2000);
        }
    }

    gameOver() {
        label.innerText = "Game Over";
        label.style.visibility = "visible";
        document.getElementById("homeBtn").style.visibility = "visible";
        document.getElementById("playBtn").style.visibility = "visible";
    }

    winLevel() {
        this.level++;
        if(this.level === this.maxLevel) {
            this.winGame();
        }
        else {
            mainPlayer.alive=false;
            gameBody.style.backdropFilter = "grayscale(1.0)";
            ground.style.filter = "grayscale(100%)";
            label.innerText = "Congratulations! Going onto the next level...";
            label.style.visibility = "visible";
            setTimeout(restartGame, 1500);
        }
    }

    winGame() {
        label.innerText = "Congratulations you won!";
        label.style.visibility = "visible";
        document.getElementById("homeBtn").style.visibility = "visible";
        document.getElementById("playBtn").style.visibility = "visible";
        gameBody.style.backgroundImage = "url('../img/celebrate.gif')";
    }

    drawLevel(){
        gameBody.style.backdropFilter = "grayscale(0.0)";
        ground.style.filter = "grayscale(0%)";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        levelOne.drawBalls();
        mainPlayer.resetPlayer();
        laserBeam.resetLaser();
        mainPlayer.draw();
    }
}

var levelOne = new Game();
levelOne.setLevel(1);
levelOne.setBallsArray();
levelOne.setBackground();
levelOne.setGround();
label.innerText = "Level " + levelOne.getLevel();
setTimeout(startGame, 2000);
window.onload = function () {
    levelOne.drawLevel()
};

function startGame() {
    label.style.visibility = "hidden";
    levelOne.update();
}

function restartGame() {
    mainPlayer.alive=true;
    setGame();
    label.innerText = "level " + levelOne.getLevel();
    levelOne.setBallsArray();
    levelOne.drawLevel()
    setTimeout(startGame, 2000);
}

function setGame() {
    levelOne.setBallsArray();
    levelOne.setBackground();
    levelOne.setGround();
}

document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
    console.log(e.keyCode);
});
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});