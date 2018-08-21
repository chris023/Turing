// Buttons
const guessButton = document.querySelector("#guessButton");
const clearButton = document.querySelector("#clearButton");
const resetButton = document.querySelector("#resetButton");

//Displays result on screen
let gameResult = document.querySelector("#gameResult");
let result = ["Make a guess!","BOOM!", "That is too high", "That is too low"];

//Displays most recent guess
let lastGuess = document.querySelector("#lastGuess");

//Sets game's high and low values to guess between
let lowVal = 0;
let highVal = 100;

//Sets the value we are trying to guess randomly
let targetVal = generateTargetVal();


//Guess Button Handler
guessButton.addEventListener("click", function(){
    
    let guessVal = parseInt(document.querySelector("#guessValue").value);

    if( !validInput(guessVal) ) {
            
            return;
    }  
    else{

        lastGuess.innerHTML = guessVal;

        if      (guessVal === targetVal)   gameResult.innerHTML = result[1];
        else if (guessVal > targetVal)     gameResult.innerHTML = result[2];
        else if (guessVal < targetVal)     gameResult.innerHTML = result[3];
    }
        
});



//Clear Button Handler
clearButton.addEventListener("click", function(){
    document.querySelector("#guessValue").value = "";
});

function whatHappensWhenIClickTheClearButton(){
    document.querySelector("#guessValue").value = "";
}

//Reset Button Handler
resetButton.addEventListener("click", function() {
    
    lastGuess.innerText = "?"
    gameResult.innerText = result[0];
    targetVal = generateTargetVal();

});

//Checks if input data is a number; Updates input validity state if not;
function validInput(value){
    isValid = (lowVal <= value && value <= highVal);
    
    if (isValid) 
        document.querySelector("#guessValue").setCustomValidity("");  
    else{   
        document.querySelector("#guessValue").setCustomValidity("Invalid Input");   
    }

   return isValid;
}

//Creates a random number between high and low value
function generateTargetVal(){
    return Math.round((Math.random()*highVal-lowVal) + lowVal);
}