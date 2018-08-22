// Buttons
const guessButton           = document.querySelector("#guessButton");
const clearButton           = document.querySelector("#clearButton");
const resetButton           = document.querySelector("#resetButton");
const settingsButton        = document.querySelector("#settingsIco");
const helpButton            = document.querySelector("#helpIco");

//dynamic display windows
const helpDialog            = document.querySelector("#helpDialog");
const exitHelp              = document.querySelector("#closeHelp");
const settingsWindow        = document.querySelector("#settingsWindow");
const gameWindow            = document.querySelector("#gameWindow");

//Input Field   
const formInput             = document.querySelector("#guessValue");

//Settings dialog hooks
const lowValField           = document.querySelector("#lowVal");
const highValField          = document.querySelector("#highVal");
const exitSettings          = document.querySelector("#closeSettings");

//Displays game result on screen
let gameResult              = document.querySelector("#gameResult");

//Game level
const currentLevelViewer    = document.querySelector("#currentLevel");
let currentLevel            = 1;

//Possible results to display
let results = {
    default: "Make a guess!",
    correct: "BOOM!",
    tooHigh: "That is too high",
    tooLow: "That is too low"
}

//Displays most recent guess
let lastGuess = document.querySelector("#lastGuess");

//Sets game's high and low values to guess between
let lowVal = parseInt(lowValField.value);
let highVal = parseInt(highValField.value);

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

        if      (guessVal ===   targetVal)     levelUp();
        else if (guessVal >     targetVal)     gameResult.innerHTML = results.tooHigh;
        else if (guessVal <     targetVal)     gameResult.innerHTML = results.tooLow;
    }


    //Handles reset button state
    if(gameResult.innerText === results.default)      {     resetButton.disabled = true;    }
    else                                              {     resetButton.disabled = false;   }
        
});






//Clear Button click Handler
clearButton.addEventListener("click", function(){
    formInput.value = "";
    disableClearGuess();
});

//Reset Button Click Handler
resetButton.addEventListener("click", function() {
    resetGame();
});

//Clear, Guess Button state handler
formInput.addEventListener("keyup", function(){
    disableClearGuess();
});

//Help Button handler
helpButton.addEventListener("click", function(){
    toggleWindow(helpDialog);
});

exitHelp.addEventListener("click", function(){
    toggleWindow(helpDialog);
})

//Settings Button handler
settingsButton.addEventListener("click", function(){
    toggleWindow(settingsWindow);
});

exitSettings.addEventListener("click", function(){
    toggleWindow(settingsWindow);
})

function resetGame() {
    formInput.value = "";
    lastGuess.innerText = "?";
    gameResult.innerText = results.default;
    targetVal = generateTargetVal();
    resetButton.disabled = true;
    disableClearGuess();
    adjustLevel(-currentLevel+1);
}

function adjustLevel(adjustLevel){
    currentLevel += adjustLevel;
    highVal += (adjustLevel*10);
    highValField.value = highVal;
    currentLevelViewer.innerText = currentLevel;
}

function levelUp(){
    gameResult.innerHTML = results.correct;
    adjustLevel(1);
    targetVal = generateTargetVal();
}

//Disables clear and guess button when input is empty
function disableClearGuess() {
    if (formInput.value.length === 0) {
        clearButton.disabled = true;
        guessButton.disabled = true;
    }
    else {
        clearButton.disabled = false;
        guessButton.disabled = false;
    }
}

//Checks if input data is a number; Updates input validity state if not;
function validInput(value){
    let isValid = (lowVal <= value && value <= highVal);
    
    if (isValid) 
        formInput.setCustomValidity("");  
    else{   
        formInput.setCustomValidity("Invalid Input");   
    }

   return isValid;
}

//Creates a random number between high and low value
function generateTargetVal(){
    return Math.round(Math.random()*(highVal-lowVal))+ lowVal;
}

//Toggles setting and help windows
function toggleWindow(window){

    if(window.classList.contains("hide"))   {   window.classList.remove("hide");    }
    else                                    {   window.classList.add("hide");       }

}

//
//Settings handlers
//

function validValFields(){
    
    let isValid = (parseInt(lowValField.value) < parseInt(highValField.value));
    return isValid;
}

function clearValFieldsValidity(){
    lowValField.setCustomValidity("");
    highValField.setCustomValidity("");
}

lowValField.addEventListener("keyup", function(){

    if(validValFields()){
        
        clearValFieldsValidity();
    
        if(lowVal !== parseInt(lowValField.value)){
            lowVal = parseInt(lowValField.value);
            resetGame();
        }
    } else{
        //highlights box red if invalid
        lowValField.setCustomValidity("Invalid Input");
    }
});

highValField.addEventListener("keyup", function(){
    
    if(validValFields()){

        clearValFieldsValidity();
        
        if(highVal !== parseInt(highValField.value)){
            highVal = parseInt(highValField.value);
            resetGame();
        }
    } else{
        //highlights box red if invalid
        highValField.setCustomValidity("Invalid Input");
    }
});