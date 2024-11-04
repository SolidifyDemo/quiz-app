import { fetchQuestions } from '../data/questions.js';

let currentRound = 0;
let score = 0;
let questions = [];

async function initializeQuiz() {
    questions = await fetchQuestions();
    displayQuestion();
}

function displayQuestion() {
    if (currentRound >= 10) {
        const percentage = (score / 10) * 100;
        document.querySelector('.container').innerHTML = `
            <div class="game-over">
                <h1>🎮 Game Over! 🎮</h1>
                <div class="score">
                    Your final score: ${score}/10 (${percentage}%)
                </div>
                <button class="play-again" onclick="location.reload()">Play Again</button>
            </div>
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

// Start quiz when page loads
document.addEventListener('DOMContentLoaded', initializeQuiz);