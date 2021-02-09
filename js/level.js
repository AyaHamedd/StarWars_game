const gameBody = document.getElementsByTagName("body")[0];
const livesBlock = document.getElementById("lives");
const canvas = document.getElementById("myCanvas");
const planet = document.getElementsByClassName("planet");

ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let mainPlayer = new MainPlayer();
let ball1 = new Ball(planet[0], 1, 300, 90, 1, 0.1);
// let ball2 = new Ball(planet[1], 150, 100, 90, 1, 0.1);
// let ball3 = new Ball(planet[2], 50, 200, 90, 1, 0.1);
// let ball4 = new Ball(planet[3], 200, 400, 90, 1, 0.1);
// let ball5 = new Ball(planet[4], 250, 100, 90, 1, 0.1);
let balls = [ball1];
let laserBeam = new LaserBeam();
let keys = [];

livesBlock.src = "../img/" + mainPlayer.lives + "Lives.png";
const groundHeight = 40;
const roofToPlayerDistance = ctx.canvas.height - groundHeight - mainPlayer.height;
const collisionTolerance = 13;

class Game {
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
            }
        }
    }

    playerBallCollision(ball) {
        var roofToBallButtomDistance = ball.top + ball.diameter - collisionTolerance;
        var ballRightDistance = ball.left + ball.diameter - collisionTolerance;
        var playerRightDistance = mainPlayer.x + mainPlayer.width - collisionTolerance;
        return (roofToBallButtomDistance > roofToPlayerDistance) && (ballRightDistance > mainPlayer.x) && (ball.left < playerRightDistance);
    }

    loseLife() {
        mainPlayer.lives--;
        livesBlock.src = "../img/" + mainPlayer.lives + "Lives.png";
        if (mainPlayer.lives == 0) {
            mainPlayer.alive=false;
            this.gameOver();
        }
        else {
            //TODO :Update label make a delay then upload the same level again
            // label.innerText = "";
            // label.style.visibility = "visible";
        }
    }

    gameOver() {
        gameBody.style.backgroundBlendMode = "luminosity";
        ground.style.filter = "grayscale(100%)";
        label.innerText = "Game Over";
        label.style.visibility = "visible";
        document.getElementById("homeBtn").style.visibility = "visible";
        document.getElementById("playBtn").style.visibility = "visible";
    }

    winGame() {
        label.innerText = "Congratulations you won!";
        label.style.visibility = "visible";
        document.getElementById("homeBtn").style.visibility = "visible";
        document.getElementById("playBtn").style.visibility = "visible";
        gameBody.style.backgroundImage = "url('../img/celebrate.gif')";
    }
}

canvas.addEventListener("mousedown", function (e) {
    var mouseX = e.offsetX;
    var mouseY = e.offsetY;

    for (const ball of balls) {
        // console.log(ball);
        if (mouseX >= ball.left
            && mouseX <= (ball.left + ball.diameter)
            && mouseY >= ball.top
            && mouseY <= (ball.top + ball.diameter)) {
            ball.splitBall();
            break;
        }
    }
});

var levelOne = new Game();
setTimeout(startGame, 2000);
window.onload = function () {
    levelOne.drawBalls();
    mainPlayer.draw();
};

function startGame() {
    label.style.visibility = "hidden";
    levelOne.update();
}

document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
    console.log(e.keyCode);
});
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});