// State variables
let currentQuestionIndex = 0;
let score = 0;
let userSelected = false;

// DOM Elements
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const progressFill = document.getElementById('progress');
const questionCountFn = document.getElementById('question-count');
const resultModal = document.getElementById('result-modal');
const finalScoreSpan = document.getElementById('final-score');
const feedbackMsg = document.getElementById('feedback-msg');
const restartBtn = document.getElementById('restart-btn');

// Initialize Quiz
// Initialize Quiz
function initQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userSelected = false;
    resultModal.classList.add('hidden');

    // 1. Filter questions based on difficulty
    let filteredQuestions = [];
    if (typeof DIFFICULTY !== 'undefined' && DIFFICULTY !== 'mixed') {
        filteredQuestions = questions.filter(q => q.difficulty === DIFFICULTY);
    } else {
        filteredQuestions = [...questions]; // Mixed: use all
    }

    // Fallback: If not enough questions in that difficulty, use all to prevent crash or empty
    if (filteredQuestions.length === 0) {
        console.warn(`No questions found for difficulty: ${DIFFICULTY}. Switching to mixed.`);
        filteredQuestions = [...questions];
    }

    // 2. Shuffle and pick 10 random questions
    shuffledQuestions = filteredQuestions.sort(() => 0.5 - Math.random());

    // Select top 10 (or fewer if total is less than 10)
    quizQuestions = shuffledQuestions.slice(0, 10);

    // Log visit
    fetch('/api/log_visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: typeof USERNAME !== 'undefined' ? USERNAME : 'Anonymous' }),
    });

    loadQuestion();
}

// Load Question
function loadQuestion() {
    userSelected = false;
    nextBtn.disabled = true;

    // Get current data
    const currentData = quizQuestions[currentQuestionIndex];

    // Update Text
    questionText.innerHTML = currentData.question;
    questionCountFn.textContent = `Question ${currentQuestionIndex + 1}/${quizQuestions.length}`;

    // Update Progress Bar
    const progressPercent = ((currentQuestionIndex) / quizQuestions.length) * 100;
    progressFill.style.width = `${progressPercent}%`;

    // Clear old options
    optionsContainer.innerHTML = '';

    // Create new options
    currentData.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.classList.add('option-btn');
        btn.textContent = opt;
        btn.onclick = () => selectOption(btn, opt, currentData.answer);
        optionsContainer.appendChild(btn);
    });
}

// Handle Option Selection
function selectOption(btn, selectedOpt, correctOpt) {
    if (userSelected) return; // Prevent multiple clicks
    userSelected = true;

    // Check Answer
    if (selectedOpt === correctOpt) {
        btn.classList.add('correct');
        score++;
    } else {
        btn.classList.add('wrong');
        // Highlight correct one
        const allBtns = optionsContainer.querySelectorAll('.option-btn');
        allBtns.forEach(b => {
            if (b.textContent === correctOpt) {
                b.classList.add('correct');
            }
        });
    }

    // Enable next button
    nextBtn.disabled = false;
}

// Next Button Click
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

// Show Results
function showResults() {
    resultModal.classList.remove('hidden');
    finalScoreSpan.textContent = score;

    // Update final progress to 100%
    progressFill.style.width = '100%';

    // Log Score
    fetch('/api/log_score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: typeof USERNAME !== 'undefined' ? USERNAME : 'Anonymous',
            score: score,
            total: quizQuestions.length
        }),
    });

    // Custom feedback
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage === 100) {
        feedbackMsg.textContent = "Perfect! You're a Python Master! 🐍";
    } else if (percentage >= 70) {
        feedbackMsg.textContent = "Great job! Keep practicing.";
    } else {
        feedbackMsg.textContent = "Good effort! Review the basics and try again.";
    }
}

// Restart Game
restartBtn.addEventListener('click', initQuiz);

// Global variable to hold current session questions
let quizQuestions = [];

// Start on load
initQuiz();
