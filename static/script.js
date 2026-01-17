// State variables
let currentQuestionIndex = 0;
let userAnswers = {}; // Store answers by question index: { 0: 'Option A', 1: 'Option B' }
let quizQuestions = []; // The selected 10 questions

// DOM Elements
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const skipBtn = document.getElementById('skip-btn');
const progressFill = document.getElementById('progress');
const questionCountFn = document.getElementById('question-count');
const resultModal = document.getElementById('result-modal');
const finalScoreSpan = document.getElementById('final-score');
const feedbackMsg = document.getElementById('feedback-msg');
const restartBtn = document.getElementById('restart-btn');

// Initialize Quiz
function initQuiz() {
    currentQuestionIndex = 0;
    userAnswers = {};
    resultModal.classList.add('hidden');
    nextBtn.textContent = "Next";

    // 1. Select Questions (4 Easy, 3 Medium, 3 Hard)
    // Assuming 'questions' is defined in data.js
    const easyQ = questions.filter(q => q.difficulty === 'easy').sort(() => 0.5 - Math.random()).slice(0, 4);
    const mediumQ = questions.filter(q => q.difficulty === 'medium').sort(() => 0.5 - Math.random()).slice(0, 3);
    const hardQ = questions.filter(q => q.difficulty === 'hard').sort(() => 0.5 - Math.random()).slice(0, 3);

    // Combine them
    quizQuestions = [...easyQ, ...mediumQ, ...hardQ];

    // Fallback if not enough questions
    if (quizQuestions.length === 0) {
        quizQuestions = questions.slice(0, 10);
    }

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
    // 1. Update Buttons State
    prevBtn.disabled = currentQuestionIndex === 0;

    // If it's the last question, change Next to Submit
    if (currentQuestionIndex === quizQuestions.length - 1) {
        nextBtn.textContent = "Submit Quiz";
    } else {
        nextBtn.textContent = "Next";
    }

    // 2. Get current data
    const currentData = quizQuestions[currentQuestionIndex];

    // 3. Update Text with Animation
    questionText.innerHTML = currentData.question;
    questionText.classList.remove('question-animate');
    void questionText.offsetWidth; // Trigger reflow
    questionText.classList.add('question-animate');

    questionCountFn.textContent = `Question ${currentQuestionIndex + 1}/${quizQuestions.length}`;

    // 4. Update Progress Bar
    const progressPercent = ((currentQuestionIndex) / quizQuestions.length) * 100;
    progressFill.style.width = `${progressPercent}%`;

    // 5. Create Options
    optionsContainer.innerHTML = '';

    // Check if user already answered this question
    const storedAnswer = userAnswers[currentQuestionIndex];
    let isAnswered = storedAnswer !== undefined;

    nextBtn.disabled = !isAnswered; // Disable until answered (or skipped via skip button)

    currentData.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.classList.add('option-btn');
        btn.classList.add('option-animate');
        btn.textContent = opt;

        // If previously answered, mark it
        if (isAnswered) {
            if (opt === storedAnswer) {
                // Check validity to color correctly immediately?
                // Or just mark selected. Let's mark selected.
                if (opt === currentData.answer) {
                    btn.classList.add('correct');
                } else {
                    btn.classList.add('wrong');
                }
            } else if (opt === currentData.answer) {
                // Show correct one if user was wrong
                if (storedAnswer !== currentData.answer) {
                    btn.classList.add('correct');
                }
            }
            btn.disabled = true; // Lock options if revisiting? Let's lock for now.
        }

        btn.onclick = () => selectOption(btn, opt, currentData.answer);
        optionsContainer.appendChild(btn);
    });
}

// Handle Option Selection
function selectOption(btn, selectedOpt, correctOpt) {
    if (userAnswers[currentQuestionIndex]) return; // already answered

    // Save Answer
    userAnswers[currentQuestionIndex] = selectedOpt;

    // Visual Feedback
    if (selectedOpt === correctOpt) {
        btn.classList.add('correct');
    } else {
        btn.classList.add('wrong');
        // Highlight correct one
        const allBtns = optionsContainer.querySelectorAll('.option-btn');
        allBtns.forEach(b => {
            if (b.textContent === correctOpt) b.classList.add('correct');
        });
    }

    // Enable navigation
    nextBtn.disabled = false;
}

// Navigation Events
prevBtn.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
});

skipBtn.addEventListener('click', () => {
    // Treat skip as "no answer" or null?
    // Let's just move next without saving an answer (or save null)
    // If the user skips, they can come back later.
    // If they click 'Next', they MUST answer. 'Skip' allows moving without answering.

    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        showResults();
    }
});

nextBtn.addEventListener('click', () => {
    // Next should only work if answered (enforced by disabled attribute)
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        showResults();
    }
});


// Show Results
function showResults() {
    // Calculate Score
    let score = 0;
    quizQuestions.forEach((q, index) => {
        if (userAnswers[index] === q.answer) {
            score++;
        }
    });

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

    // Redirect to Result Page
    setTimeout(() => {
        window.location.href = `/result?score=${score}&total=${quizQuestions.length}`;
    }, 500);
}

// Restart Game
restartBtn.addEventListener('click', initQuiz);

// Start on load
initQuiz();
