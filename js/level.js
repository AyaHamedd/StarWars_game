//canvas
const canvas = document.getElementById("myCanvas"),
ctx = canvas.getContext("2d");
//set canvas width and height
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

/* Get the array of planets (balls) in the scene*/
const planet = document.getElementsByClassName("planet");
let ball1 = new Ball(planet[0], 1, 300, 90, 1, 0.1);
let ball2 = new Ball(planet[1], 150, 100, 90, 1, 0.1);
let ball3 = new Ball(planet[2], 50, 200, 90, 1, 0.1);
let ball4 = new Ball(planet[3], 200, 400, 90, 1, 0.1);
let ball5 = new Ball(planet[4], 250, 50, 90, 1, 0.1);
let balls = [ball1, ball2, ball3, ball4, ball5];

let mainPlayer = new MainPlayer();
let keys = [];

setTimeout(startGame, 3000);
function startGame() {
    readyLabel.style.visibility = "hidden";
    levelOne.update();
}

class Game{
    update(){
        requestAnimationFrame(() => this.update());
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        mainPlayer.update();
        this.drawBalls();
    }

    drawBalls(){
        for (var i = 0; i < balls.length; i++) {
            console.log(i);
            balls[i].draw();
        }
    }
}

var levelOne = new Game();
window.onload = function() {
    levelOne.drawBalls();
    mainPlayer.draw();
};





