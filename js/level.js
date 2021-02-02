/* Set the selected character as the player in the scene */
const character = localStorage.getItem("selectedCharacter");
const player = document.getElementById("player");
const body = document.querySelector("body");
player.src = "../img/" + character + ".png";

/* Get the array of planets (balls) in the scene*/
const planet = document.getElementsByClassName("planet");

/*Ball class*/
class Ball {
    constructor(image, x, y, d, vx, vy, isNew) {
        this.img = image;
        this.left = x;
        this.top = y;
        this.diameter = d;
        this.velX = vx;
        this.velY = vy;
        this.isNew = isNew;
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

    cloneImage() {
        let clonedImage = this.img.cloneNode(true);
        clonedImage.style.width = (this.img.width - 20) + "px";
        clonedImage.style.height = (this.img.height - 19) + "px";

        return clonedImage;
    }

    splitBall(){
        console.log(balls);
        console.log(this.img.width);
        console.log(this.img.height);
        console.log(this.img);

        let newBall1 = new Ball(this.cloneImage(), this.left - 10, this.top + 3, this.diameter - 20, this.velX, this.velY, true );
        let newBall2 = new Ball(this.cloneImage(), this.left + 10, this.top + 3, this.diameter - 20, - this.velX, this.velY, true );

        console.log("width: " + newBall1.img.width);
        console.log("height: " + newBall1.img.height);

        body.appendChild(newBall1.img);
        body.appendChild(newBall2.img);

        let ballIndex = balls.indexOf(this);
        balls.splice(ballIndex, 1);
        balls.push(newBall1);
        balls.push(newBall2);

        this.img.style.visibility = "hidden";
    }
    
}

var ball1 = new Ball(planet[0], 1, 100, 90, 1, 0.1, true);
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
}

var addClickListener = function(){
    for (let ball of balls) {
        if(ball.isNew){
            ball.img.addEventListener("click", function() {
                ball.splitBall();
            });   
            ball.isNew = false;
        }
    }
}

setInterval(addClickListener, 20);


