// Buttons
let guessButton = document.querySelector("#guessButton");
let clearButton = document.querySelector("#clearButton");
let resetButton = document.querySelector("#resetButton");

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

clearButton.addEventListener("click", function(){
    document.querySelector("#guessValue").value = "";
});

resetButton.addEventListener("click", function() {
    
    lastGuess.innerText = "?"
    gameResult.innerText = result[0];
    targetVal = generateTargetVal();

});

function validInput(value){
    isValid = (lowVal <= value && value <= highVal);
    
    if (isValid) 
        document.querySelector("#guessValue").setCustomValidity("");  
    else{   
        document.querySelector("#guessValue").setCustomValidity("Invalid Input");   
    }

   return (lowVal <= value && value <= highVal);
}

function generateTargetVal(){
    return Math.round((Math.random()*highVal-lowVal) + lowVal);
}