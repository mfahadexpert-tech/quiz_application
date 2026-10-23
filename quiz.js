
/* Quiz variables */
let currentQuestion = 0;
let score = 0;
let selectedQuestions = [];
let userAnswers = [];
let answered = false;

/* HTML elements */
const questionText = document.getElementById("questionText");
const answerOptions = document.getElementById("answerOptions");
const nextBtn = document.getElementById("nextBtn");

/* Start quiz */
function startQuiz() {

    currentQuestion = 0;
    score = 0;
    userAnswers = [];

    // Shuffle questions and select five
    selectedQuestions = [...questions]
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);

    document.querySelector(".quiz-card").style.display = "block";
    document.getElementById("resultSection").style.display = "none";

    showQuestion();
}

/* Display question */
function showQuestion() {

    answered = false;
    nextBtn.disabled = true;

    const current = selectedQuestions[currentQuestion];

    questionText.innerText = current.question;

    document.getElementById("questionNumber").innerText =
        "Question " + (currentQuestion + 1) + " / 5";

    answerOptions.innerHTML = "";

    // Create answer buttons
    current.options.forEach(function(option, index) {

        const button = document.createElement("button");

        button.className = "answer-btn";
        button.innerText = option;

        button.onclick = function() {
            selectAnswer(index);
        };

        answerOptions.appendChild(button);
    });

    updateProgress();
    startTimer();
}

/* Check selected answer */
function selectAnswer(index) {

    if (answered) {
        return;
    }

    answered = true;
    stopTimer();

    const current = selectedQuestions[currentQuestion];
    const buttons = document.querySelectorAll(".answer-btn");

    // Save answer for PDF
    userAnswers.push(index);

    if (index === current.answer) {
        score++;
    }

    // Highlight correct and incorrect answers
    buttons.forEach(function(button, buttonIndex) {

        button.disabled = true;

        if (buttonIndex === current.answer) {
            button.classList.add("correct");
        }

        if (buttonIndex === index && index !== current.answer) {
            button.classList.add("incorrect");
        }
    });

    nextBtn.disabled = false;
}

/* Update colored progress bar */
function updateProgress() {

    const progressBar = document.getElementById("progressBar");
    progressBar.innerHTML = "";

    for (let i = 0; i < 5; i++) {

        const segment = document.createElement("div");

        segment.className =
            "progress-segment segment-" + i;

        if (i > currentQuestion) {
            segment.classList.add("pending");
        }

        progressBar.appendChild(segment);
    }
}

/* Next question button */
nextBtn.onclick = function() {

    currentQuestion++;

    if (currentQuestion < 5) {
        showQuestion();
    } else {
        showResult();
    }
};

/* Show final result */
function showResult() {

    stopTimer();

    document.querySelector(".quiz-card").style.display = "none";

    document.getElementById("resultSection").style.display = "block";

    document.getElementById("scoreText").innerText =
        "Your Score: " + score + " / 5";

    // Show all completed segments
    currentQuestion = 4;
    updateProgress();
}

/* Restart quiz */
document.getElementById("restartBtn").onclick = startQuiz;

/* Run when page loads */
startQuiz();
