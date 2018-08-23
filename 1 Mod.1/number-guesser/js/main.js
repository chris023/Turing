// Buttons
const guessButton = document.querySelector('#guessButton');
const clearButton = document.querySelector('#clearButton');
const resetButton = document.querySelector('#resetButton');
const settingsButton = document.querySelector('#settingsIco');
const helpButton = document.querySelector('#helpIco');

// Dynamic display windows
const helpDialog = document.querySelector('#helpDialog');
const exitHelp = document.querySelector('#closeHelp');
const settingsWindow = document.querySelector('#settingsWindow');

// Input field
const formInput = document.querySelector('#guessValue');

// Settings dialog hooks
const lowValField = document.querySelector('#lowVal');
const highValField = document.querySelector('#highVal');
const exitSettings = document.querySelector('#closeSettings');

// Displays game result on screen
const gameResult = document.querySelector('#gameResult');

// Game level
const currentLevelViewer = document.querySelector('#currentLevel');
let currentLevel = 1;

// Possible results to display
const results = {
  default: 'Make a guess!',
  correct: 'BOOM!',
  tooHigh: 'That is too high',
  tooLow: 'That is too low',
};

// Displays most recent guess
const lastGuess = document.querySelector('#lastGuess');

// Sets game's high and low values to guess between
let lowVal = 0;
let highVal = 100;

function generateTargetVal() {
  return Math.round(Math.random() * (highVal - lowVal)) + lowVal;
}

let targetVal = generateTargetVal();

function validInput(userValue) {
  const isValid = (lowVal <= userValue && userValue <= highVal);
  if (isValid) {
    formInput.setCustomValidity('');
  } else {
    formInput.setCustomValidity('Invalid Input');
  }

  return isValid;
}

function adjustLevel(adjuster) {
  currentLevel += adjuster;
  highVal += (adjuster * 10);
  highValField.value = highVal;
  currentLevelViewer.innerText = currentLevel;
}

function levelUp() {
  gameResult.innerHTML = results.correct;
  adjustLevel(1);
  targetVal = generateTargetVal();
}

guessButton.addEventListener('click', () => {
  const guessVal = parseInt(document.querySelector('#guessValue').value, 2);

  if (!validInput(guessVal)) {
    return;
  }
  lastGuess.innerHTML = guessVal;

  if (guessVal === targetVal) {
    levelUp();
  } else if (guessVal > targetVal) {
    gameResult.innerHTML = results.tooHigh;
  } else if (guessVal < targetVal) {
    gameResult.innerHTML = results.tooLow;
  }

  // Handles reset button state
  if (gameResult.innerText === results.default) {
    resetButton.disabled = true;
  } else {
    resetButton.disabled = false;
  }
});

function disableClearGuess() {
  if (formInput.value.length === 0) {
    clearButton.disabled = true;
    guessButton.disabled = true;
  } else {
    clearButton.disabled = false;
    guessButton.disabled = false;
  }
}

function resetGame() {
  formInput.value = '';
  lastGuess.innerText = '?';
  gameResult.innerText = results.default;
  targetVal = generateTargetVal();
  resetButton.disabled = true;
  disableClearGuess();
  adjustLevel(-currentLevel + 1);
}


function validValFields() {
  const isValid = (parseInt(lowValField.value, 2) < parseInt(highValField.value, 2));
  return isValid;
}

// Clear Button click Handler
clearButton.addEventListener('click', () => {
  formInput.value = '';
  disableClearGuess();
});

// Reset Button Click Handler
resetButton.addEventListener('click', () => {
  resetGame();
});

// Clear, Guess Button state handler
formInput.addEventListener('keyup', () => {
  disableClearGuess();
});

// Toggles setting and help windows
function toggleWindow(window) {
  if (window.classList.contains('hide')) {
    window.classList.remove('hide');
  } else {
    window.classList.add('hide');
  }
}

// Help and Exit Button handlers
helpButton.addEventListener('click', () => {
  toggleWindow(helpDialog);
});

exitHelp.addEventListener('click', () => {
  toggleWindow(helpDialog);
});

settingsButton.addEventListener('click', () => {
  toggleWindow(settingsWindow);
});

exitSettings.addEventListener('click', () => {
  toggleWindow(settingsWindow);
});

function clearValFieldsValidity() {
  lowValField.setCustomValidity('');
  highValField.setCustomValidity('');
}

// Handles the low value field in the settings dialog
lowValField.addEventListener('keyup', () => {
  if (validValFields()) {
    clearValFieldsValidity();
    if (lowVal !== parseInt(lowValField.value, 2)) {
      lowVal = parseInt(lowValField.value, 2);
      resetGame();
    }
  } else {
    lowValField.setCustomValidity('Invalid Input');
  }
});

highValField.addEventListener('keyup', () => {
  if (validValFields()) {
    clearValFieldsValidity();

    if (highVal !== parseInt(highValField.value, 2)) {
      highVal = parseInt(highValField.value, 2);
      resetGame();
    }
  } else {
    highValField.setCustomValidity('Invalid Input');
  }
});
