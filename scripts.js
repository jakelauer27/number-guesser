/////Button and Input Variables

var userGuess = document.getElementById("userGuess");
var guessButton = document.querySelector("#guessButton");
var clearButtton = document.getElementById("clearButton");
var resetButton = document.querySelector("input[type=reset]");
var min = document.getElementById("min");
var max = document.getElementById("max");

var diffEasy = document.querySelector(".easy");
var diffMed = document.querySelector(".med");
var diffHard = document.querySelector(".hard");
var diffXtreme = document.querySelector(".xtreme");
var diffCustom = document.querySelector(".custom");

//////Results Text Variables

var setup = document.getElementById("setup");
var guessDisplay = document.getElementById("guessDisplay");
var result = document.getElementById("result");
var wins = document.querySelector(".wins");
var quickest = document.querySelector(".quickest");
var guesses = document.querySelector(".guesses");

/////Var for Computer's Guess

var compGuessNum = 0; 

var count = 0;

//////Button and input event listeners

userGuess.addEventListener("input", function() {
  guessButton.disabled = false;
})

guessButton.addEventListener("click", function() {
    event.preventDefault();
    min.disabled = true;
    max.disabled = true;
    checkGuess();
});

clearButton.addEventListener("click", function() {
    event.preventDefault();
    guessButton.disabled = true;
    userGuess.value = "";
    disableClear();
})

resetButton.addEventListener("click", function() {
    event.preventDefault();
    userGuess.value = "";
    result.innerHTML = "Test Your Fate";
    setup.innerHTML = "Guess The Number";
    guessDisplay.innerHTML = "#";
    min.value = 0;
    max.value = 100;
    wins.innerHTML = 0;
    guesses.innerHTML = 0;
    quickest.innerHTML = "--"
    guessButton.disabled = true;
    disableClear();
    disableReset();
    compGuess();
})

min.addEventListener("input", function() {
  compGuess();
})

max.addEventListener("input", function() {
  compGuess();
})

//////DIFFICULTY EVENT LISTENERS

diffEasy.addEventListener("click", function() {
    changeDiff();
    min.value = 0;
    max.value = 25;
    compGuess();
})

diffMed.addEventListener("click", function() {
    changeDiff();
    min.value = 0;
    max.value = 100;
    compGuess();
})

diffHard.addEventListener("click", function() {
    changeDiff();
    min.value = 0;
    max.value = 500;
    compGuess();
})

diffXtreme.addEventListener("click", function() {
    changeDiff();
    min.value = 0;
    max.value = 10000;
    compGuess();
})

diffCustom.addEventListener("click", function() {
    changeDiff();
    min.disabled = false;
    max.disabled = false;
    compGuess();
})

///////Function for Resetting Difficulty

function changeDiff() {
    userGuess.value = "";
    result.innerHTML = "Difficulty Changed";
    setup.innerHTML = "Good Luck";
    guessDisplay.innerHTML = "#";
    count = "0";
    disableClear();
    disableReset();
    compGuess();
}

//////Function for resetting computer guess

function compGuess(){
    compGuessNum = Math.floor(Math.random() * (Number(max.value) - Number(min.value)) + Number(min.value));
}

//////Function for checking quickest win

function quickestCheck(){
    var current = Number(quickest.innerHTML);
    if (quickest.innerHTML === "--") {
        quickest.innerHTML = count;
    }else if (count < current){
        quickest.innerHTML = count;
        setup.innerHTML = "NEW RECORD";
    }
}

//////Functions for checking whether or not "reset" and "clear" buttons should be disabled

function disableReset(){
    if (userGuess.value === "" || result.innerHTML === "#") {
        resetButton.disabled = true;
    } else {
        resetButton.disabled = false;
    }
}

function disableClear(){
    if (userGuess.value === "") {
        clearButton.disabled = true;
    } else {
        clearButton.disabled = false;
    }
}

//////Functions for validating user inputs are numbers in correct ranges

function numCheck(){
  var guess = Number(userGuess.value);
  if (isNaN(guess) === true || guess < Number(min.value) || guess > Number(max.value)) {
    return true;
  }
}

function rangeCheck(){
  var minCheck = Number(min.value);
  var maxCheck = Number(max.value);
  if (isNaN(minCheck) === true || isNaN(maxCheck) === true) {
    return true;
  }
}

///////Setting computer guess and disabling buttons on page load

compGuess();

disableClear();

disableReset();

guessButton.disabled = true;
min.disabled = true;
max.disabled = true;

///////Comparing user guess to computer Guess

function checkGuess() {
    var guess = Number(userGuess.value);
    count ++;
    guesses.innerHTML = count;
    console.log("Your Guess " + guess);
    console.log("Computer Guess " + compGuessNum);

    if (rangeCheck() === true) {
        result.innerHTML = "You May Only Enter Numbers in the Min and Max fields...idiot.";

    } else if (numCheck() === true) {
        result.innerHTML = "You Must Choose A Number Between " + min.value + "-" + max.value + " idiot.";                                       
      
    } else if (guess === compGuessNum) {
        result.innerHTML = "Don't get Cocky. Level up...";
        setup.innerHTML = "BOOM!";
        guessDisplay.innerHTML = `*${guess}*`;
        min.value *= 2;
        max.value *= 2;
        wins.innerHTML ++;
        quickestCheck();
        count = 0;
        compGuess();

    } else if (guess < compGuessNum) {
        result.innerHTML = "Too low, try harder";
        setup.innerHTML = "Your Last Guess Was";
        guessDisplay.innerHTML = guess;

    } else {
        result.innerHTML = "Too high, try harder";
        setup.innerHTML = "Your Last Guess Was";
        guessDisplay.innerHTML = guess;
    }

    disableClear();
    disableReset();
}


