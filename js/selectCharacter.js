/* Get the characters to detect user selection on any of them */
const pinkCharacter = document.getElementById("pink");
const whiteCharacter = document.getElementById("white");
const orangeCharacter = document.getElementById("orange");
const redCharacter = document.getElementById("red");
const blueCharacter = document.getElementById("blue");
const greenCharacter = document.getElementById("green");
const characters = document.getElementsByTagName("img");

pinkCharacter.addEventListener("click", selectCharHandler);
whiteCharacter.addEventListener("click", selectCharHandler);
orangeCharacter.addEventListener("click", selectCharHandler);
redCharacter.addEventListener("click", selectCharHandler);
blueCharacter.addEventListener("click", selectCharHandler);
greenCharacter.addEventListener("click", selectCharHandler);

localStorage.setItem("selectedCharacter", "pink"); 

function selectCharHandler(e){
    /*Set The selectedCharacter to the character id that triggered the function*/
    localStorage.setItem("selectedCharacter", this.id); 
    /* Get the selected character imager*/
    var selectedCharImg= document.getElementById(this.id);
    /*Reset all characters borders to default*/
    for (var i = 0; i < characters.length; i++){
        characters[i].style.border="";
        characters[i].style.borderRadius = ""
    }
    /*Add a border on the selected character*/
    selectedCharImg.style.border="0.5vw ridge #27FFE5";
    selectedCharImg.style.borderRadius = "2.5vw"
}

