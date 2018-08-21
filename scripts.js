/////Button and Input Variables

var userGuess = document.getElementById("userGuess");
var guessButton = document.querySelector("#guessButton");
var clearButtton = document.getElementById("clearButton");
var resetButton = document.querySelector("input[type=reset]");
var min = document.getElementById("min");
var max = document.getElementById("max");
var stopFlash = document.querySelector("#stopFlash");

var difficulty = [document.querySelector(".easy"), document.querySelector(".med"), document.querySelector(".hard"), document.querySelector(".xtreme"), document.querySelector(".custom")];
var currentDifficulty = 1;

//////Results Text Variables

var setup = document.getElementById("setup");
var guessDisplay = document.getElementById("guessDisplay");
var result = document.getElementById("result");
var wins = document.querySelector(".wins");
var quickest = document.querySelector(".quickest");
var guesses = document.querySelector(".guesses");

var historyGuessDoc = document.querySelectorAll(".lastGuess > div");
var historyResultDoc = document.querySelectorAll(".lastResult > div");
var historyGuess = ["","","","",""];
var historyResult = ["","","","",""];


/////Var for Your/Computer's Guess and Guess Count

var guess = ""; 

var compGuessNum = 0; 

var count = 0;

//////Button and input event listeners

stopFlash.addEventListener("click", function(){
    var numberHeader = document.querySelector(".number");
    var extremeHeader = document.querySelector(".extreme");
    numberHeader.classList.toggle('removeAnimation')
    extremeHeader.classList.toggle('removeAnimation')
    if (numberHeader.classList.contains('removeAnimation') === true) {
        stopFlash.innerHTML = "I want my eyes to burn";
    } else {
        stopFlash.innerHTML = "My Eyes Are Burning";
    }
    
})

userGuess.addEventListener("input", function() {
  guessButton.disabled = false;
})

guessButton.addEventListener("click", function() {
    event.preventDefault();
    min.disabled = true;
    max.disabled = true;
    checkGuess();
})

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
    wins.innerHTML = 0;
    guesses.innerHTML = 0;
    quickest.innerHTML = "--"
    count = 0;
    guessButton.disabled = true;
    difficulty[currentDifficulty].click();
    disableClear();
    disableReset();
    compGuess();
    resetGuesses();
    if (currentDifficulty < 4) {
        min.disabled = true;
        max.disabled = true;
    }
})

min.addEventListener("input", function() {
  compGuess();
})

max.addEventListener("input", function() {
  compGuess();
})

//////DIFFICULTY EVENT LISTENERS

difficulty[0].addEventListener("click", function() {
    currentDifficulty = 0;
    min.value = 0;
    max.value = 25;
    changeDiff();
})

difficulty[1].addEventListener("click", function() {
    currentDifficulty = 1
    min.value = 0;
    max.value = 100;
    changeDiff();
})

difficulty[2].addEventListener("click", function() {
    currentDifficulty = 2;
    min.value = 0;
    max.value = 500;
    changeDiff();
})

difficulty[3].addEventListener("click", function() {
    currentDifficulty = 3;
    min.value = 0;
    max.value = 10000;
    changeDiff();
})

difficulty[4].addEventListener("click", function() {
    currentDifficulty = 4;
    changeDiff();
})


///////Function for Resetting Difficulty

function changeDiff() {
    userGuess.value = "";
    result.innerHTML = "Difficulty Changed";
    setup.innerHTML = "Good Luck";
    guessDisplay.innerHTML = "#";
    guessButton.disabled = true;
    disableClear();
    disableReset();
    compGuess();
    resetGuesses();
    count = 0;
    guesses.innerHTML = count;
    if (currentDifficulty < 4) {
        min.disabled = true;
        max.disabled = true;
    } else {
        min.disabled = false;
        max.disabled = false;
    }
}

///////Functions For History Feature

function displayGuesses() {
    if (count <= 5) {
        for (i = 0; i <= count - 1; i++) {
            historyGuessDoc[i].innerHTML = historyGuess[i];
            historyResultDoc[i].innerHTML = historyResult[i];
            if (count > 0) {
            historyResultDoc[i].classList.add("vertTranslate");
            historyGuessDoc[i].classList.add("vertTranslate");
            }
        }
    } else {
        for (i = 0; i < 5; i++) {
            historyGuessDoc[i].innerHTML = historyGuess[i];
            historyResultDoc[i].innerHTML = historyResult[i];
        }
    }
}

displayGuesses();

function resetGuesses() {
    for (i = 0; i < 5; i++) {
        count = 0;
        historyGuess[i] = "";
        historyResult[i] = "";
        // if (historyGuessDoc[i].classList.contains("vertTranslate") === true) {
        historyResultDoc[i].classList.remove("vertTranslate");
        historyGuessDoc[i].classList.remove("vertTranslate");
        // }
    }
    displayGuesses();
}

function historyUpdate (count, message) {
    if (count > 5) {
        for (i = 0; i < 4; i++) {
            historyGuess[i] = historyGuess[i + 1];
            historyResult[i] = historyResult[i + 1]
        }
        historyGuess[4] = guess;
        historyResult[4] = message;
    } else {
        historyGuess[count - 1] = guess;
        historyResult[count - 1] = message;
    }
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
  if (isNaN(minCheck) === true || isNaN(maxCheck) === true || minCheck > maxCheck) {
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

///////Comparing user guess to computer Guess - This is where is all comes together

function checkGuess() {
    guess = Number(userGuess.value);
    count ++;
    guesses.innerHTML = count;
    console.log("Your Guess " + guess);
    console.log("Computer Guess " + compGuessNum);

    if (rangeCheck() === true) {
        setup.innerHTML = "C'mon Man!"
        result.innerHTML = "You put something stupid in Min/Max fields...fix it.";
        count --;
        guesses.innerHTML = count;

    } else if (numCheck() === true) {
        setup.innerHTML = "Can you even read?"
        result.innerHTML = "You Must Choose A NUMBER Between " + min.value + " - " + max.value + " idiot.";                                       
        count --;
        guesses.innerHTML = count;

    } else if (guess === compGuessNum) {
        currentDifficulty ++;
        result.innerHTML = "Fine. You Win.";
        setup.innerHTML = "BOOM!";
        guessDisplay.innerHTML = `*${guess}*`;
        wins.innerHTML ++;
        quickestCheck();
        count = 0;
        compGuess();
        resetGuesses();
        if (currentDifficulty < 4) {
            difficulty[currentDifficulty].click();
            result.innerHTML = "Don't get Cocky. Level up...";
            guessDisplay.innerHTML = `*${guess}*`;
            setup.innerHTML = "BOOM!";
        }

    } else if (guess < compGuessNum) {
        result.innerHTML = "Too low, try harder";
        setup.innerHTML = "Your Last Guess Was";
        guessDisplay.innerHTML = guess;
        historyUpdate(count, "Too Low");
        displayGuesses();

    } else {
        result.innerHTML = "Too high, try harder";
        setup.innerHTML = "Your Last Guess Was";
        guessDisplay.innerHTML = guess;
        historyUpdate(count, "Too High")
        displayGuesses();
    }

    disableClear();
    disableReset();
}

