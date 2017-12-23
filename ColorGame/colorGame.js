var colorToGuess = document.querySelector("#colorToGuess");
var CorrectNumber;
// var colors = [];
var colors = generateRamdomColors(6);
// get span in middle div
var messageDisplay = document.querySelector("#message");

// get squares
var square = document.querySelectorAll(".square");


// get new gate
var newGameDisplay = document.getElementById("NewGame");


//get buttons
var buttonMode = document.querySelectorAll(".mode");

buttonMode[0].addEventListener("click", function(){
    buttonMode[0].classList.add("select");
    buttonMode[1].classList.remove("select");
    colors = generateRamdomColors(3);
    startGame(3);
});

buttonMode[1].addEventListener("click", function(){
    buttonMode[1].classList.add("select");
    buttonMode[0].classList.remove("select");
    colors = generateRamdomColors(6);
    startGame(6);
});


newGameDisplay.addEventListener("click", function(){
    startGame(6);
});


// get h1 to change color
var headerDisplay = document.querySelector("#Uppercontent");

// // generate numbers for color
function random255number(){
    return Math.floor(Math.random() * 256);
}


// // generate colors
function generateRamdomColors(num){
    aux_array = []
    for (var i = 0; i < 6; i++){
        aux_array.push("rgb("+random255number()+", "+random255number()+", "+random255number()+")")
    }generateRamdomColors
    return aux_array;
}



// // choose one to be correct
var CorrectNumber = Math.floor(Math.random() * 6);

colorToGuess.textContent = colors[CorrectNumber];


// startGame(6);

// // set colors and add event
for (var i = 0 ; i < square.length; i++){
    square[i].style.backgroundColor = colors[i];
    square[i].addEventListener("click", function(){
        if (this.style.backgroundColor == colors[CorrectNumber]){
            messageDisplay.textContent = "Correct!";
            changeColors(this.style.backgroundColor);
            headerDisplay.style.background = this.style.backgroundColor;
            newGameDisplay.textContent = "New Game"
        }else{
            this.style.backgroundColor = "#232323";
            messageDisplay.textContent = "Try again";
        }
    })
}

function changeColors(color){
    // loop to change colors
    for (var i = 0; i < square.length; i++) {
        square[i].style.backgroundColor = color;
    }
}



var startGame = function(num){
    colors = generateRamdomColors(num);
    CorrectNumber = Math.floor(Math.random() * num);
    headerDisplay.style.background = "#21385b";
    messageDisplay.textContent = "";
    newGameDisplay.textContent = "New Colors"
    // set colors and add event
    for (var i = 0 ; i < num; i++){
        square[i].style.backgroundColor = colors[i];
        square[i].style.display = "block";
    }
    for (var i = num; i < 6; i++) {
        square[i].style.display = "none";
    }
    colorToGuess.textContent = colors[CorrectNumber];
}







