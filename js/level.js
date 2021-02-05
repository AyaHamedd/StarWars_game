//canvas
const canvas = document.getElementById("myCanvas"),
ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let mainPlayer = new MainPlayer();
var alive = true;
const groundHeight = 40;
const roofToPlayerDistance = ctx.canvas.height - groundHeight - mainPlayer.height;
const collisionTolerance = 6;

/* Get the array of planets (balls) in the scene*/
const planet = document.getElementsByClassName("planet");
let ball1 = new Ball(planet[0], 1, 300, 90, 1, 0.1);
let ball2 = new Ball(planet[1], 150, 100, 90, 1, 0.1);
let ball3 = new Ball(planet[2], 50, 200, 90, 1, 0.1);
let ball4 = new Ball(planet[3], 200, 400, 90, 1, 0.1);
let ball5 = new Ball(planet[4], 250, 100, 90, 1, 0.1);
let balls = [ball1, ball2, ball3, ball4, ball5];

setTimeout(startGame, 3000);
function startGame() {
    readyLabel.style.visibility = "hidden";
    levelOne.update();
}

class Game {
    update() {
        if (alive) {
            requestAnimationFrame(() => this.update());
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            mainPlayer.update();
            this.drawBalls();
        }
    }

    drawBalls() {
        for (var i = 0; i < balls.length; i++) {
            balls[i].draw();
            if (this.playerBallCollision(balls[i])) {
                alive = false;
            }
        }
    }

    playerBallCollision(ball) {
        var roofToBallButtomDistance = ball.top + ball.diameter - collisionTolerance;
        var ballRightDistance = ball.left + ball.diameter - collisionTolerance;
        var playerRightDistance = mainPlayer.x + mainPlayer.width - collisionTolerance;
        return (roofToBallButtomDistance > roofToPlayerDistance) && (ballRightDistance > mainPlayer.x) && (ball.left < playerRightDistance);
    }
}

var levelOne = new Game();
window.onload = function () {
    levelOne.drawBalls();
    mainPlayer.draw();
};