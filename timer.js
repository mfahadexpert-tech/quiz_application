
/* Timer variables */
let timeLeft = 15;
let timerInterval;

/* Start countdown */
function startTimer() {

    clearInterval(timerInterval);

    timeLeft = 15;
    document.getElementById("timer").innerText =
        "Time Left: " + timeLeft + "s";

    timerInterval = setInterval(function() {

        timeLeft--;

        document.getElementById("timer").innerText =
            "Time Left: " + timeLeft + "s";

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            selectAnswer(-1);
        }

    }, 1000);
}

/* Stop countdown */
function stopTimer() {
    clearInterval(timerInterval);
}
                    