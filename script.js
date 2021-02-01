const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endGameEl = document.getElementById('end-game-container');
const settings = document.getElementById('settings');
const settingForm = document.getElementById('settings-form');
const settingBtn = document.getElementById('setting-btn');
const difficultySelect = document.getElementById('difficulty');


// List of words for Game
const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving'
];

// Initialize the Word
let randomWord;

// Initialize the Score
let score = 0;

// Initialize the Time
let time = 10;

let difficulty = localStorage.getItem('difficulty') !== null ?
    localStorage.getItem('difficulty') : 'medium';

// Set difficulty select value
difficultySelect.value = localStorage.getItem('difficulty') !== null ?
localStorage.getItem('difficulty') : 'medium';

// Focus on text area 
text.focus();

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// Get Random word from an Array
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}
// console.log(getRandomWord());

// Update the Score
function updateScore() {
    score++;
    scoreEl.innerHTML = score;
}

// Update Time
function updateTime() {
    time--;
    timeEl.innerHTML = time + 's';

    if (time <= 5) {
        timeEl.classList.add('timeOut');
        if(time === 0) {
            clearInterval(timeInterval);
    
            // end game
            gameOver();
        }
    }
    
}

// Game Over
function gameOver() {
    endGameEl.innerHTML = `
        <h1 class="endGameHead">Time ran out</h1>
        <p>Your final score is <span> ${score} </span></p>
        <button onclick = "location.reload()">Reload</button>`;

        endGameEl.style.display= 'flex';
}

// Add word to DOM
function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerText = randomWord;
}
addWordToDOM();

text.addEventListener('input', e =>{
    const insertedText = e.target.value;
    // console.log(insertedText);
    if(insertedText === randomWord) {
        addWordToDOM();
        updateScore();

        // Clear the text area
        e.target.value = '';

        if(difficulty === 'hard') {
            time += 2;
        }
        else if(difficulty === 'medium') {
            time += 3;
        }
        else {
            time += 4;
        }

        updateTime(); 
    }
});

// Setting Button click to hide
settingBtn.addEventListener('click', () => 
    settings.classList.toggle('hide'));

    // Setting for select Difficulty
    settingForm.addEventListener('change', e => {
      difficulty = e.target.value;
    //   console.log(difficulty);
    localStorage.setItem('difficulty', difficulty);
    });