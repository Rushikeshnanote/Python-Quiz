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
function initQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userSelected = false;
    resultModal.classList.add('hidden');

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
    const currentData = questions[currentQuestionIndex];

    // Update Text
    questionText.innerHTML = currentData.question; // .innerHTML allows HTML tags in JSON (e.g. <br>)
    questionCountFn.textContent = `Question ${currentQuestionIndex + 1}/${questions.length}`;

    // Update Progress Bar
    const progressPercent = ((currentQuestionIndex) / questions.length) * 100;
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
    if (currentQuestionIndex < questions.length) {
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

    // Custom feedback
    const percentage = (score / questions.length) * 100;
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

// Start on load
initQuiz();
