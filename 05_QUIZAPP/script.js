document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById("start-btn");
    const nextBtn = document.getElementById("next-btn");
    const restartBtn = document.getElementById("restart-btn");
    const questionContainer = document.getElementById("question-container");
    const questionText = document.getElementById("question-text");
    const choicesList = document.getElementById("choices-list");
    const resultContainer = document.getElementById("result-container");
    const quizContainer = document.getElementById("quiz-container");
    const scoreDisplay = document.getElementById("score");

    const questions = [
        {
            question: "What is the capital of France?",
            choices: ["Paris", "London", "Berlin", "Madrid"],
            answer: "Paris",
        },
        {
            question: "Which planet is known as the Red Planet?",
            choices: ["Mars", "Venus", "Jupiter", "Saturn"],
            answer: "Mars",
        },
        {
            question: "Who wrote 'Hamlet'?",
            choices: ["Charles Dickens", "Jane Austen", "William Shakespeare", "Mark Twain"],
            answer: "William Shakespeare", // ✅ Fixed missing answer field
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    startBtn.addEventListener("click", startQuiz);
    nextBtn.addEventListener("click", nextQuestion);
    restartBtn.addEventListener("click", restartQuiz);

    function startQuiz() {
        startBtn.classList.add("hidden");  // Hide start button
        quizContainer.classList.remove("hidden"); // Show quiz section
        questionContainer.classList.remove("hidden"); // Ensure question section is visible
        resultContainer.classList.add("hidden"); // Hide result
        currentQuestionIndex = 0;
        score = 0;
        showQuestion();
    }

    function showQuestion() {
        nextBtn.classList.add("hidden");  // Hide next button
        const currentQuestion = questions[currentQuestionIndex];
        questionText.textContent = currentQuestion.question;
        choicesList.innerHTML = "";

        currentQuestion.choices.forEach(choice => {
            const li = document.createElement("li");
            li.textContent = choice;
            li.addEventListener("click", () => selectAnswer(choice));
            choicesList.appendChild(li);
        });
    }

    function selectAnswer(choice) {
        const correctAnswer = questions[currentQuestionIndex].answer;
        if (choice.toLowerCase().trim() === correctAnswer.toLowerCase().trim()) { // ✅ Case-insensitive check
            score++;
        }
        nextBtn.classList.remove("hidden"); // Show next button after selection
    }

    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }

    function showResult() {
        questionContainer.classList.add("hidden");
        resultContainer.classList.remove("hidden");
        scoreDisplay.textContent = `${score} out of ${questions.length}`;
    }

    function restartQuiz() {
        resultContainer.classList.add("hidden");
        questionContainer.classList.remove("hidden");
        startQuiz();
    }
});
