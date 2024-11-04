// questions.js
async function fetchQuestions() {
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=10&type=multiple');
        const data = await response.json();
        
        return data.results.map(q => {
            // Combine correct and incorrect answers and shuffle them
            const answers = [...q.incorrect_answers, q.correct_answer]
                .sort(() => Math.random() - 0.5);
            
            return {
                question: q.question,
                answers: answers,
                // Find index of correct answer in shuffled array
                correct: answers.indexOf(q.correct_answer)
            };
        });
    } catch (error) {
        console.error('Error fetching questions:', error);
        // Fallback questions in case API fails
        return [
            {
                question: "What is the capital of France?",
                answers: ["London", "Berlin", "Paris", "Madrid"],
                correct: 2
            },
            {
                question: "Which planet is closest to the Sun?",
                answers: ["Venus", "Mercury", "Mars", "Earth"],
                correct: 1
            }
        ];
    }
}

// Export for use in script.js
export { fetchQuestions };