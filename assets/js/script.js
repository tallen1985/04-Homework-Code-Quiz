let gameStats = {
        score: 0,
        timeRemaining: 75,
        initials: "",
        questionNumber: 0
    };
    
const questions = [{
        question: "Commonly used Data Types DO NOT include:",
        choice: ["1: Strings", "2: Boolean", "3: Alerts", "4: Numbers"],
        correctAnswer: "3: Alerts"
    }, {
        question: "The condition in an if / else statement is enclosed within _____.",
        choice: ["1: Quotes", "2: Curly Brackets", "3: Parenthesis", "4: Square Brackets"],
        correctAnswer: "3: Parenthesis"
    }]

function playGame() {
    const timeSpan = document.getElementById("timeRemaining");

    document.getElementById('startDiv').style.display = "none";
    document.getElementById('questionDiv').style.display = "block";

    displayQuestion();

    const gameTimer = setInterval(function() {
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
    if (answer === questions[gameStats.questionNumber].correctAnswer) {
        alert('correct');
        gameStats.score++;
    } else {
        alert('incorrect');
    }
    gameStats.questionNumber++;
    if (questions.length !== (gameStats.questionNumber)){
        displayQuestion();
    } else {
        alert('end of game');
    }

}

