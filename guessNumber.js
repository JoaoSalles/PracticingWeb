
var correctNumber = Math.floor((Math.random() * 100) + 1);


var guess = NaN;


while (guess != correctNumber){
    guess = Number(prompt("Guess number"));
    if (guess == correctNumber){
        alert("Correct");
    }else if(guess > correctNumber){
        alert("Too high");
    }else if (guess < correctNumber){
        alert("Too low");
    }
}


