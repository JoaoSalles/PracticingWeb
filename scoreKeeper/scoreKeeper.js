var p1Button = document.getElementById("Player1");
var p2Button = document.getElementById("Player2");
var ResetButton = document.getElementById("Reset");
var winningDisplay = document.querySelector("#winningScore");
var inputNumber = document.querySelector("#roof");


var gameOVer = false;
var winningScore = 5;



var p1Display = document.getElementById("Score1")
var p2Display = document.getElementById("Score2")

var p1Score = 0;
var p2Score = 0;


// change maximum value
inputNumber.addEventListener("change", function(){
    winningDisplay.textContent = this.value;
    winningScore = Number(this.value);
    p1Score = 0;
    p2Score = 0;
    p2Display.textContent = p2Score;
    p1Display.textContent = p1Score;
    p1Display.style.color = "black";
    p2Display.style.color = "black";
});

// add number for plater 1
p1Button.addEventListener("click", function(){
    if (!gameOVer){
        p1Score++;
        p1Display.textContent = p1Score;
    }
    if (p1Score == winningScore){
        gameOVer = true;
        p1Display.style.color = "green";
    }
});

// add number for plater 2
p2Button.addEventListener("click", function(){
    if (!gameOVer){
        p2Score++;
        p2Display.textContent = p2Score;
    }
    if (p2Score == winningScore){
        gameOVer = true;
        p2Display.style.color = "green";
    }
});

// resete score
ResetButton.addEventListener("click", function(){
    p1Score = 0;
    p2Score = 0;
    gameOVer = false;
    p2Display.textContent = p2Score;
    p1Display.textContent = p1Score;
    p1Display.style.color = "black";
    p2Display.style.color = "black";
    winningScore = 5;
});