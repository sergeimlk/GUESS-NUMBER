const difficultyButtons = document.querySelectorAll('.difficulty-btn');
const gameArea = document.getElementById('game-area');
const rangeDisplay = document.getElementById('range');
const attemptsDisplay = document.getElementById('attempts');
const guessInput = document.getElementById('guess');
const submitGuess = document.getElementById('submit-guess');
const message = document.getElementById('message');
const screen = document.getElementById('screen');
const gameOver = document.getElementById('game-over');
const result = document.getElementById('result');
const guessedNumbers = document.getElementById('guessed-numbers');
const playAgain = document.getElementById('play-again');

let secretNumber, maxAttempts, currentAttempts, maxNumber, guesses;

function startGame(difficulty) {
    gameArea.style.display = 'block';
    gameOver.style.display = 'none';
    guesses = [];

    switch(difficulty) {
        case 'easy':
            maxNumber = 20;
            maxAttempts = 8;
            break;
        case 'medium':
            maxNumber = 50;
            maxAttempts = 5;
            break;
        case 'hard':
            maxNumber = 100;
            maxAttempts = 3;
            break;
    }

    secretNumber = Math.floor(Math.random() * maxNumber) + 1;
    currentAttempts = 0;

    rangeDisplay.textContent = `Choisissez un nombre entre 1 et ${maxNumber}`;
    updateAttemptsDisplay();
    message.textContent = '';
    screen.textContent = '?';
}

function updateAttemptsDisplay() {
    attemptsDisplay.textContent = `Essais restants : ${maxAttempts - currentAttempts}`;
}

function checkGuess() {
    const userGuess = parseInt(guessInput.value);
    if (isNaN(userGuess) || userGuess < 1 || userGuess > maxNumber) {
        message.textContent = `Veuillez entrer un nombre valide entre 1 et ${maxNumber}.`;
        return;
    }

    currentAttempts++;
    guesses.push(userGuess);

    if (userGuess === secretNumber) {
        endGame(true);
    } else if (currentAttempts >= maxAttempts) {
        endGame(false);
    } else {
        message.textContent = userGuess < secretNumber ? "C'est plus!" : "C'est moins!";
        updateAttemptsDisplay();
    }

    guessInput.value = '';
}

function endGame(isWin) {
    gameArea.style.display = 'none';
    gameOver.style.display = 'block';
    
    if (isWin) {
        result.textContent = 'Félicitations! Vous avez deviné le nombre!';
        screen.textContent = '✓';
    } else {
        result.textContent = `Dommage! Le nombre était ${secretNumber}.`;
        screen.textContent = '✗';
    }

    guessedNumbers.textContent = guesses.join(', ');
}

difficultyButtons.forEach(button => {
    button.addEventListener('click', () => startGame(button.dataset.difficulty));
});

submitGuess.addEventListener('click', checkGuess);

guessInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkGuess();
    }
});

playAgain.addEventListener('click', () => {
    document.getElementById('difficulty-selection').style.display = 'block';
    gameOver.style.display = 'none';
    screen.textContent = '?';
});