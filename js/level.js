/* Set the selected character as the player in the scene */
const character = localStorage.getItem("selectedCharacter");
const player = document.getElementById("player");
player.src = "../img/" + character + ".png";

/* Get the array of planets (balls) in the scene*/
const planet = document.getElementsByClassName("planet");

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

    static moveball() {
        for (var i = 0; i < balls.length; i++) {
            balls[i].left += balls[i].velX;
            balls[i].top += balls[i].velY;
            balls[i].velY += gravity;
            if (balls[i].velY > 9)
                balls[i].velY = 9;
            if (balls[i].velY < -9)
                balls[i].velY = -9;
            balls[i].img.style.left = balls[i].left + "px";
            balls[i].img.style.top = balls[i].top + "px";
            if (balls[i].left > (window.innerWidth - balls[i].diameter - 2) || balls[i].left < 1) {
                balls[i].velX = -balls[i].velX;
            }
            if (balls[i].top > (window.innerHeight - balls[i].diameter - 40) || balls[i].top < 40) {
                balls[i].velY = -balls[i].velY;
            }
        }
    }

    splitBall(){
        console.log(balls);
        console.log(this.img.width);
        console.log(this.img.height);
        console.log(this.img);

        let newBall1 = new Ball(this.img, this.left - 10, this.top + 3, this.diameter / 2, this.velX, this.velY );
        let newBall2 = new Ball(this.img, this.left + 10, this.top + 3, this.diameter / 2, this.velX, this.velY );

        newBall1.img.width = this.img.width / 2;
        newBall1.img.height = this.img.height / 2;

        console.log(newBall1);

        let ballIndex = balls.indexOf(this);
        balls.splice(ballIndex, 1);
        balls.push(newBall1);
        balls.push(newBall2);
        console.log(balls);
    }
    
}

var ball1 = new Ball(planet[0], 1, 100, 90, 1, 0.1);
// var ball2 = new Ball(planet[1], 150, 100, 90, 1, 0.1);
// var ball3 = new Ball(planet[2], 50, 200, 90, 1, 0.1);
// var ball4 = new Ball(planet[3], 200, 400, 90, 1, 0.1);
// var ball5 = new Ball(planet[4], 250, 50, 90, 1, 0.1);
// var balls = [ball1, ball2, ball3, ball4, ball5];
var balls = [ball1];

for (var i = 0; i < balls.length; i++) {
    balls[i].img.style.left = balls[i].left + "px";
    balls[i].img.style.top = balls[i].top + "px";
    balls[i].img.style.visibility = 'visible';
}

setTimeout(startGame, 3000);
var gravity = 0.1;

function startGame() {
    readyLabel.style.visibility = "hidden";
    setInterval(Ball.moveball, 20);

    balls[0].img.addEventListener("click", function() {
        balls[0].splitBall();
    });

    // for (const ball of balls) {
    //     ball.splitBall();
    // }
}



