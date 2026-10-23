
/* PDF download button */

document.getElementById("downloadBtn").onclick = function() {

    // Create PDF document
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    let y = 20;

    // PDF heading
    pdf.setFontSize(18);
    pdf.text("Web Technologies Quiz Result", 15, y);

    y += 15;

    pdf.setFontSize(12);
    pdf.text("Score: " + score + " / 5", 15, y);

    y += 15;

    // Add each question and answer
    selectedQuestions.forEach(function(item, index) {

        const selectedIndex = userAnswers[index];

        const selectedAnswer = selectedIndex === -1
            ? "Not Answered"
            : item.options[selectedIndex];

        const correctAnswer = item.options[item.answer];

        const status = selectedIndex === item.answer
            ? "Correct"
            : "Incorrect";

        // Move to new page if needed
        if (y > 250) {
            pdf.addPage();
            y = 20;
        }

        // Question text
        const lines = pdf.splitTextToSize(
            (index + 1) + ". " + item.question, 180
        );

        pdf.text(lines, 15, y);
        y += lines.length * 7;

        pdf.text("Your Answer: " + selectedAnswer, 20, y);
        y += 7;

        pdf.text("Correct Answer: " + correctAnswer, 20, y);
        y += 7;

        pdf.text("Status: " + status, 20, y);
        y += 15;
    });

    // Save PDF
    pdf.save("Quiz_Result.pdf");
};
