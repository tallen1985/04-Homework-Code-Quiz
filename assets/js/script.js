let gameStats;
let gameTimer;
let highScores = [];

if (localStorage.getItem('highScores')){
    highScores = JSON.parse(localStorage.getItem('highScores'));
}

const questionNum = document.getElementById('questionNum');
const timeSpan = document.getElementById("timeRemaining");
const startDiv = document.getElementById('startDiv');
const questionDiv = document.getElementById('questionDiv');
const answerText = document.getElementById('answerText');
const scoreDiv = document.getElementById('scoreDiv');
const highScoreDiv = document.getElementById('highScoreDiv');
const input = document.getElementById('initialsInput');
const clearScores = document.getElementById('clearScores')
document.getElementById('displayHighScore').addEventListener('click', displayHighScore);
questionDiv.addEventListener('click', function(e) {
    const el = e.target;
    if (el.matches('.choiceBtn')){
        checkAnswer(el.textContent)

    }
});
clearScores.addEventListener('click', function() {
    highScores = [];
    alert('cleared');

})


function playGame() {
    startDiv.style.display = "none";
    questionDiv.style.display = "block";
    input.value = "";
    
    gameStats = {
        score: 0,
        timeRemaining:25,
        initials: "",
        questionNumber: 0
    };

    displayQuestion();

    gameTimer = setInterval(function() {
        if (gameStats.timeRemaining <= 0) {
            displayScore();
        } else {
            timeSpan.innerHTML = gameStats.timeRemaining;
            gameStats.timeRemaining--;
        }
    }, 750);
}

function displayQuestion() {
    const questionText = document.getElementById('questionText');
    const choiceText = document.getElementsByClassName('choiceBtn');
    let currentQuestion = questions[gameStats.questionNumber];

    questionNum.innerText = `Question ${gameStats.questionNumber + 1} out of ${questions.length}.`;

    questionText.innerText = currentQuestion.question;

    for (let x = 0; x < currentQuestion.choice.length; x++){
        choiceText[x].innerText = currentQuestion.choice[x];
    }
}

function checkAnswer(answer){
    
    const answerStatus = document.getElementById('answerStatus')

    answerStatus.style.display = "block";

    if (answer === questions[gameStats.questionNumber].correctAnswer) {
        answerText.innerText = "Correct!"
        gameStats.score += 5;
    } else {
        answerText.innerText = "Incorrect!"
        gameStats.timeRemaining -= 10;
    };

    setTimeout(function (){
    answerStatus.style.display = "none";
        gameStats.questionNumber++;
    if (questions.length !== (gameStats.questionNumber)){
        displayQuestion();
    } else {
        displayScore();
    }
    }, 1000); 
}

function displayScore() {
    timeSpan.textContent = " ";
    clearInterval(gameTimer);
    questionDiv.style.display = 'none';
    answerText.style.display = "none";
    scoreDiv.style.display = "block";
    document.getElementById('score').innerText = gameStats.score;
}
function addToHighScore(){
   
    if (input.value) {
        let newHighScore = {
            score: gameStats.score,
            initials: input.value
        };
        highScores.push(newHighScore);
        displayHighScore();
        localStorage.setItem('highScores', JSON.stringify(highScores))
    } else {
        input.setAttribute("placeholder", "Initials Please");
    }
    
} 
function displayHighScore(){
    if (gameTimer) {
        clearInterval(gameTimer);
    }
    questionDiv.style.display = 'none';
    answerText.style.display = "none";
    scoreDiv.style.display = "none";
    highScoreDiv.style.display = "block";
    
    let table = document.getElementById('highScoreTable');
    highScores.sort(function (a, b){
        return b.score - a.score;
    })
    
    table.innerHTML = "";

    for (let x = 0; x < highScores.length; x++){
        let row = table.insertRow();
        for (key in highScores[x]){
            let newCell = row.insertCell();
            let text = document.createTextNode(highScores[x][key]);
            newCell.appendChild(text);
        }
    }
}

function replay() {
    highScoreDiv.style.display = "none";
    startDiv.style.display = "block";
    timeSpan.innerText = "";
    
}

