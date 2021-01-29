/* Set the selected character as the player in the scene */
const character = localStorage.getItem("selectedCharacter");
const player = document.getElementById("player");
const planet = document.getElementById("planet");
player.src = "../img/" + character + ".png";

/*Start the game after 3 seconds*/
setTimeout(startGame, 3000);

function startGame() {
    readyLabel.style.visibility = "hidden";
}