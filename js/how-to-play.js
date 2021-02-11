var rightArrow = document.querySelector("#right-arrow");
var leftArrow = document.querySelector("#left-arrow");
var contentTxt = document.querySelector("#content-txt");
var imageGifs = document.querySelector("#game-gifs");
var howToplayArray = ["Use left and right arrows to move.", 
                    "Click the space bar to shoot the laser.", 
                    "Try to hit the ball with the laser.", 
                    "Avoid getting hit by the ball", 
                    "To complete the level hit all the balls."]
var gameGifs = ["../img/player-move.gif", "../img/shoot-laser.gif", 
                "../img/hit-ball.gif", "../img/player-hit.gif",
                "../img/hit-ball.gif"];
var howToplayArraySize = howToplayArray.length;
var gameGifsArraySize = gameGifs.length;
var arrayCount = 0;

console.log(rightArrow);
console.log(leftArrow);

function rightArrowHover(event) {
    console.log("hover");
    rightArrow.src = "../img//right-arrow-gray.png";
}

function rightArrowMouseOut(event) {
    rightArrow.src = "../img/right-arrow-black.png";
}

function rightArrowClick(event) {
    arrayCount = (arrayCount + 1) % howToplayArraySize;
    contentTxt.textContent = howToplayArray[arrayCount];
    imageGifs.src = gameGifs[arrayCount];
}

function leftArrowHover(event) {
    leftArrow.src = "../img/left-arrow-gray.png";
}

function leftArrowMouseOut(event) {
    leftArrow.src = "../img/left-arrow-black.png";
}

function leftArrowClick(event) {
    arrayCount = (arrayCount - 1) === -1 ? howToplayArraySize - 1 : Math.abs((arrayCount - 1));
    contentTxt.textContent = howToplayArray[arrayCount];
    imageGifs.src = gameGifs[arrayCount];
}

rightArrow.addEventListener('mouseover', rightArrowHover);
rightArrow.addEventListener('mouseout', rightArrowMouseOut);
rightArrow.addEventListener('click', rightArrowClick);

leftArrow.addEventListener('mouseover', leftArrowHover);
leftArrow.addEventListener('mouseout', leftArrowMouseOut);
leftArrow.addEventListener('click', leftArrowClick);