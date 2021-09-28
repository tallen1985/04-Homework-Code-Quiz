let gameStats = {
        score: 0,
        timeRemaining: 75,
        initials: "",
        questionNumber: 0
    };

let highScores = [{
        score: 10,
        initials: "TJA"
    }, {
        score: 25,
        initials: "LJA"
    }, {
        score: 14,
        initials: 'IPA'
    }
    ]
    
const questions = [{
        question: "Commonly used Data Types DO NOT include:",
        choice: ["1: Strings", "2: Boolean", "3: Alerts", "4: Numbers"],
        correctAnswer: "3: Alerts"
    }, {
        question: "The condition in an if / else statement is enclosed within _____.",
        choice: ["1: Quotes", "2: Curly Brackets", "3: Parenthesis", "4: Square Brackets"],
        correctAnswer: "3: Parenthesis"
    }]

let gameTimer;

function playGame() {
    const timeSpan = document.getElementById("timeRemaining");

    document.getElementById('startDiv').style.display = "none";
    document.getElementById('questionDiv').style.display = "block";
    
    gameStats = {
        score: 0,
        timeRemaining: 75,
        initials: "",
        questionNumber: 0
    };

    displayQuestion();

    gameTimer = setInterval(function() {
        if (gameStats.timeRemaining === 0) {
            clearInterval(gameTimer);
            alert('game over');
        }
        timeSpan.innerHTML = gameStats.timeRemaining;
        gameStats.timeRemaining--;
    }, 1000);
}

function displayQuestion() {
    let questionText = document.getElementById('questionText');
    const choiceText = document.getElementsByClassName('choiceBtn');
    let currentQuestion = questions[gameStats.questionNumber];

    questionText.innerText = currentQuestion.question;

    for (let x = 0; x < currentQuestion.choice.length; x++){
        choiceText[x].innerText = currentQuestion.choice[x];
        choiceText[x].setAttribute('onclick', 'checkAnswer("'+ currentQuestion.choice[x] +'")');
    }
}

function checkAnswer(answer){
    let answerText = document.getElementById('answerText');
    document.getElementById('answerStatus').style.display = "block";
    if (answer === questions[gameStats.questionNumber].correctAnswer) {
        answerText.innerText = "Correct!"
        gameStats.score++;
    } else {
        answerText.innerText = "Incorrect!"
        gameStats.timeRemaining -= 10;
    };

    setTimeout(function (){
    document.getElementById('answerStatus').style.display = "none";
        gameStats.questionNumber++;
    if (questions.length !== (gameStats.questionNumber)){
        displayQuestion();
    } else {
        clearInterval(gameTimer);
        displayScore();
    }
    }, 2000); 
}

function displayScore() {
    document.getElementById('questionDiv').style.display = 'none';
    document.getElementById('answerText').style.display = "none";
    document.getElementById('scoreDiv').style.display = "block";
    document.getElementById('score').innerText = gameStats.score;
}
function addToHighScore(){
    let newHighScore = {
        score: gameStats.score,
        initials: document.getElementById('initialsInput').value
    }
    highScores.push(newHighScore);
    displayHighScore();
}
function displayHighScore() {
    if (gameTimer) {
        clearInterval(gameTimer);
    }
    document.getElementById('questionDiv').style.display = 'none';
    document.getElementById('answerText').style.display = "none";
    document.getElementById('scoreDiv').style.display = "none";
    document.getElementById('highScoreDiv').style.display = "block";
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
    document.getElementById('highScoreDiv').style.display = "none";

    document.getElementById('startDiv').style.display = "block";
    document.getElementById('timeRemaining').innerText = "";
    document.getElementById('initialInput').value = "";
}

