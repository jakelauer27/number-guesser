/////Button and Input Variables

var userGuess = document.getElementById("userGuess");
var guessButton = document.querySelector("#guessButton");
var clearButtton = document.getElementById("clearButton");
var resetButton = document.querySelector("input[type=reset]");
var min = document.getElementById("min");
var max = document.getElementById("max");

//////Results Text Variables

var setup = document.getElementById("setup");
var guessDisplay = document.getElementById("guessDisplay");
var result = document.getElementById("result");

/////Var for Computer's Guess

var compGuessNum = 0; 

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
    result.innerHTML = "Guess the Number!";
    setup.innerHTML = "Set the Range!";
    guessDisplay.innerHTML = "#";
    min.value = 0;
    max.value = 100;
    min.disabled = false;
    max.disabled = false;
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

//////Function for resetting computer guess

function compGuess(){
    compGuessNum = Math.floor(Math.random() * (parseInt(max.value) - parseInt(min.value)) + 1);
}

//////Functions for checking whether or not "reset" and "clear" buttons should be disabled

function disableReset(){
    if (userGuess.value === "" || result.innerHTML === "") {
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
  var guess = parseInt(userGuess.value);
  if (isNaN(guess) === true || guess <  parseInt(min.value) || guess > parseInt(max.value)) {
    return true;
  }
}

function rangeCheck(){
  var minCheck = parseInt(min.value);
  var maxCheck = parseInt(max.value);
  if (isNaN(minCheck) === true || isNaN(maxCheck) === true) {
    return true;
  }
}

///////Setting computer guess and disabling buttons on page load

compGuess();

disableClear();

disableReset();

guessButton.disabled = true;

///////Comparing user guess to computer Guess

function checkGuess() {
    var guess = parseInt(userGuess.value);
    console.log(guess);
    console.log(compGuessNum);

    if (rangeCheck() === true) {
        result.innerHTML = "You May Only Enter Numbers in the Min and Max fields";

    } else if (numCheck() === true) {
        result.innerHTML = "You Must Choose A Number Between " + min.value + " and " + max.value;                                       
      
    } else if (guess === compGuessNum) {
        result.innerHTML = "Level Up!";
        setup.innerHTML = "BOOM! CORRECT!";
        guessDisplay.innerHTML = guess;
        min.value -= 10;
        max.value -= -10;
        compGuess();

    } else if (guess < compGuessNum) {
        result.innerHTML = "That is too low";
        setup.innerHTML = "Your Last Guess Was";
        guessDisplay.innerHTML = guess;

    } else {
        result.innerHTML = "That is too high";
        setup.innerHTML = "Your Last Guess Was";
        guessDisplay.innerHTML = guess;
    }

    disableClear();
    disableReset();
}


