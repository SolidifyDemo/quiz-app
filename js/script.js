let currentRound = 0;
let score = 0;

function displayQuestion() {
    if (currentRound >= 10) {
        document.querySelector('.container').innerHTML = `
            <h1>Quiz Complete!</h1>
            <p>Final Score: ${score}/10</p>
            <button onclick="location.reload()">Play Again</button>
        `;
        return;
    }

    const question = questions[currentRound];
    document.getElementById('round').textContent = currentRound + 1;
    document.getElementById('score').textContent = score;
    document.getElementById('question').textContent = question.question;
    
    const answersDiv = document.getElementById('answers');
    answersDiv.innerHTML = '';
    
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.onclick = () => checkAnswer(index);
        answersDiv.appendChild(button);
    });
}

function checkAnswer(selectedAnswer) {
    const question = questions[currentRound];
    if (selectedAnswer === question.correct) {
        score++;
    }
    currentRound++;
    displayQuestion();
}

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', displayQuestion);