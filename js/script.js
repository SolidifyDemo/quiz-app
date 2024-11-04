import { fetchQuestions } from '../data/questions.js';

let currentRound = 0;
let score = 0;
let questions = [];
let playerAnswers = [];

async function initializeQuiz() {
    questions = await fetchQuestions();
    displayQuestion();
}

function displayQuestion() {
    if (currentRound >= 10) {
        const percentage = (score / 10) * 100;
        let resultsHTML = questions.map((q, index) => {
            const playerAnswer = playerAnswers[index];
            const correctAnswer = q.answers[q.correct];
            return `
                <div class="result">
                    <div class="question">${q.question}</div>
                    <div class="answer">Your answer: ${playerAnswer}</div>
                    <div class="correct-answer">Correct answer: ${correctAnswer}</div>
                </div>
            `;
        }).join('');
        
        document.querySelector('.container').innerHTML = `
            <div class="game-over">
                <h1>🎮 Game Over! 🎮</h1>
                <div class="score">
                    Your final score: ${score}/10 (${percentage}%)
                </div>
                ${resultsHTML}
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
        button.onclick = () => checkAnswer(index, answer);
        answersDiv.appendChild(button);
    });
}

function checkAnswer(selectedAnswer, answerText) {
    const question = questions[currentRound];
    if (selectedAnswer === question.correct) {
        score++;
    }
    playerAnswers.push(answerText);
    currentRound++;
    displayQuestion();
}

// Start quiz when page loads
document.addEventListener('DOMContentLoaded', initializeQuiz);