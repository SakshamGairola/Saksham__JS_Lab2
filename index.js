class Question {
    constructor(questionText, options, correctAnswer) {
        this.questionText = questionText;
        this.options = options;
        this.correctAnswer = correctAnswer;
    }

    isCorrectAnswer(userAnswer) {
        return userAnswer.toLowerCase() === this.correctAnswer.toLowerCase();
    }
}

function Quiz(questionsList) {
    this.questionsList = questionsList;
    this.score = 0;
    this.questionIndex = 0;
}

Quiz.prototype.isEnded = function () {
    return this.questionsList.length === this.questionIndex;
}

Quiz.prototype.getQuestionByIndex = function () {
    return this.questionsList[this.questionIndex];
}

Quiz.prototype.checkAnswer = function (userAnswer) {
    if (this.questionsList[this.questionIndex].isCorrectAnswer(userAnswer)) {
        this.score++;
    }
    this.questionIndex++;
}


function loadQuestions() {
    if (quiz.isEnded()) {
        showScore(quiz.score);
    }
    else {
        let question = quiz.getQuestionByIndex();
        let element = document.getElementById('question');
        element.innerText = question.questionText;

        var choices = question.options;
        for (i = 0; i < choices.length; i++) {
            let element = document.getElementById('choice' + i);
            element.innerText = choices[i];
            handleOption('btn' + i, choices[i]);
        }
        updateProgress();
    }
}

function handleOption(id, userAnswer) {
    let element = document.getElementById(id);
    element.onclick = function () {
        quiz.checkAnswer(userAnswer);
        loadQuestions();
    }
}

function updateProgress() {
    let element = document.getElementById('progress');
    element.innerText = `Question ${quiz.questionIndex + 1} of ${quiz.questionsList.length}`;
}

function showScore(score) {
    let resultHTML = `
    <h1>Result</h1>
    <h2>Your Score: ${score}, percentage is: ${score*100/quiz.questionsList.length}%</h2>
    `;
    document.getElementById('quiz').innerHTML = resultHTML;
}

let questions = [
    new Question("JavaScript supports", ["Functions", "XHTML","CSS", "HTML"], "Functions"),
    new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery","Django", "NodeJS"], "Django"),
    new Question("Which is used for Connect To Database?", ["PHP", "HTML", "JS", "All"], "PHP"),
    new Question("JavaScript is a ", ["Language", "Programming Language", "Development", "All"], "Programming Language")
];
let quiz = new Quiz(questions);
loadQuestions();
