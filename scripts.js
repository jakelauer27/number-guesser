/////Button and Input Variables

var userGuess = document.getElementById("userGuess");
var guessButton = document.querySelector("#guessButton");
var clearButtton = document.getElementById("clearButton");
var resetButton = document.querySelector("input[type=reset]");
var min = document.getElementById("min");
var max = document.getElementById("max");

var difficulty = [document.querySelector(".easy"), document.querySelector(".med"), document.querySelector(".hard"), document.querySelector(".xtreme"), document.querySelector(".custom")];
var currentDifficulty = 1;

//////Results Text Variables

var setup = document.getElementById("setup");
var guessDisplay = document.getElementById("guessDisplay");
var result = document.getElementById("result");
var wins = document.querySelector(".wins");
var quickest = document.querySelector(".quickest");
var guesses = document.querySelector(".guesses");

var historyGuess = ["","","","",""];
var historyResult = ["","","","",""];


/////Var for Your/Computer's Guess and Guess Count

var guess = ""; 

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
    resetGuesses();
    displayGuesses();
    if (currentDifficulty = 4) {
        min.disabled = false;
        max.disabled = false;
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
    changeDiff();
    min.value = 0;
    max.value = 25;
    min.disabled = true;
    max.disabled = true;
    compGuess();
    resetGuesses();
    displayGuesses();
    currentDifficulty = 0;
})

difficulty[1].addEventListener("click", function() {
    changeDiff();
    min.value = 0;
    max.value = 100;
    min.disabled = true;
    max.disabled = true;
    compGuess();
    resetGuesses();
    displayGuesses();
    currentDifficulty = 1;
})

difficulty[2].addEventListener("click", function() {
    changeDiff();
    min.value = 0;
    max.value = 500;
    min.disabled = true;
    max.disabled = true;
    compGuess();
    resetGuesses();
    displayGuesses();
    currentDifficulty = 2;
})

difficulty[3].addEventListener("click", function() {
    changeDiff();
    min.value = 0;
    max.value = 10000;
    min.disabled = true;
    max.disabled = true;
    compGuess();
    resetGuesses();
    displayGuesses();
    currentDifficulty = 3;
})

difficulty[4].addEventListener("click", function() {
    changeDiff();
    min.disabled = false;
    max.disabled = false;
    compGuess();
    resetGuesses();
    displayGuesses();
    currentDifficulty = 4;
})

///////Functions For History Feature

function displayGuesses() {
    document.querySelector(".histOne").innerHTML = historyGuess[0];
    document.querySelector(".histTwo").innerHTML = historyGuess[1];
    document.querySelector(".histThree").innerHTML = historyGuess[2];
    document.querySelector(".histFour").innerHTML = historyGuess[3];
    document.querySelector(".histFive").innerHTML = historyGuess[4];

    document.querySelector(".resultOne").innerHTML = historyResult[0];
    document.querySelector(".resultTwo").innerHTML = historyResult[1];
    document.querySelector(".resultThree").innerHTML = historyResult[2];
    document.querySelector(".resultFour").innerHTML = historyResult[3];
    document.querySelector(".resultFive").innerHTML = historyResult[4];

}

displayGuesses();

function resetGuesses() {
    for (i = 0; i <= 5; i++) {
        historyGuess[i] = "";
        historyResult[i] = "";
    }
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

///////Function for Resetting Difficulty

function changeDiff() {
    userGuess.value = "";
    result.innerHTML = "Difficulty Changed";
    setup.innerHTML = "Good Luck";
    guessDisplay.innerHTML = "#";
    count = "0";
    guesses.innerHTML = count;
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
        result.innerHTML = "Hey Hot Shot. Try Custom.";
        setup.innerHTML = "BOOM!";
        guessDisplay.innerHTML = `*${guess}*`;
        wins.innerHTML ++;
        quickestCheck();
        count = 0;
        compGuess();
        resetGuesses();
        displayGuesses();
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
