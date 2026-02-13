// Boot sequence lines
const bootLines = [
    "Booting Love System...",
    "Calibrating Heart Rate...",
    "Love Target Acquired: Bebu"
];

let lineIndex = 0;
const bootSequence = document.getElementById('boot-sequence');

// Function to add boot sequence lines with delay
function addLine() {
    if (lineIndex < bootLines.length) {
        const line = document.createElement('div');
        line.textContent = bootLines[lineIndex];
        line.className = 'mb-1';
        bootSequence.appendChild(line);
        lineIndex++;
        setTimeout(addLine, 1000); // Add next line after 1 second
    }
}

// Start boot sequence
addLine();

// Password form handling
const form = document.getElementById('password-form');
const input = document.getElementById('password-input');
const error = document.getElementById('error-message');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const password = input.value.trim();
    // Change this password to your desired one
    if (password === 'forever') {
        // Correct password: start decryption animation
        startDecryption();
    } else {
        // Wrong password: show error and shake input
        error.textContent = 'Love Access Denied: Try Again.';
        error.classList.remove('hidden');
        input.classList.add('shake');
        input.value = ''; // Clear input
        setTimeout(() => {
            input.classList.remove('shake');
        }, 500);
    }
});

// Function to start the decryption progress bar
function startDecryption() {
    // Hide terminal and error
    document.getElementById('terminal').classList.add('hidden');
    error.classList.add('hidden');

    // Create progress bar container
    const progressContainer = document.createElement('div');
    progressContainer.className = 'w-full max-w-lg bg-red-700 rounded-full h-6 overflow-hidden';
    const progressBar = document.createElement('div');
    progressBar.className = 'bg-pink-400 h-full rounded-full transition-all duration-75 ease-out';
    progressBar.style.width = '0%';
    progressContainer.appendChild(progressBar);

    // Create progress text
    const progressText = document.createElement('div');
    progressText.className = 'text-center mt-4 text-pink-400 text-lg';
    progressText.textContent = 'Unlocking Heart... 0%';

    // Append to lock screen
    const lockScreen = document.getElementById('lock-screen');
    lockScreen.appendChild(progressContainer);
    lockScreen.appendChild(progressText);

    // Animate progress bar
    let percent = 0;
    const interval = setInterval(() => {
        percent += 2; // Increase by 2% every 75ms for ~3.75 seconds total
        progressBar.style.width = percent + '%';
        progressText.textContent = `Unlocking Heart... ${percent}%`;
        if (percent >= 100) {
            clearInterval(interval);
            // Fade out lock screen and reveal romantic content
            setTimeout(() => {
                lockScreen.classList.add('opacity-0');
                setTimeout(() => {
                    lockScreen.classList.add('hidden');
                    document.getElementById('romantic').classList.remove('hidden');
                    // Attach quiz button event listener after reveal
                    const quizBtn = document.getElementById('start-quiz');
                    if (quizBtn) {
                        quizBtn.onclick = function(e) {
                            e.preventDefault();
                            startQuiz();
                        };
                    }
                }, 2000); // 2 second fade
            }, 500); // Small delay before fade
        }
    }, 75);
}

// Relationship Quiz
const quizQuestions = [
    // Replace these with your own questions and answers
    {
        question: "When did we first meet in person?",
        options: ["December 23, 2023", "October 9, 2022", "January 1, 2024", "February 14, 2023"],
        correct: 0
    },
    {
        question: "What's my favorite color?",
        options: ["Blue", "Red", "Pink", "Green"],
        correct: 2 // Change to the correct index
    },
    {
        question: "What's our song?",
        options: ["Tum Se Hi", "Perfect", "All of Me", "At Last"],
        correct: 0
    },
    {
        question: "Where was our first date?",
        options: ["Restaurant", "Park", "Movie Theater", "Home"],
        correct: 1 // Change based on your memory
    },
    {
        question: "What's the best thing about our relationship?",
        options: ["Your smile", "Your laugh", "Your love", "Everything"],
        correct: 3
    }
];

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    currentQuestionIndex = 0;
    score = 0;
    displayQuestion();
}

function displayQuestion() {
    const quizContainer = document.getElementById('quiz-container');
    if (currentQuestionIndex >= quizQuestions.length) {
        showResult();
        return;
    }

    const question = quizQuestions[currentQuestionIndex];
    quizContainer.innerHTML = `
        <h3 class="text-xl font-semibold mb-4">${question.question}</h3>
        <div class="space-y-2">
            ${question.options.map((option, index) => 
                `<button class="quiz-option block w-full bg-gray-100 hover:bg-pink-100 text-gray-800 py-2 px-4 rounded-lg transition-colors" data-index="${index}">${option}</button>`
            ).join('')}
        </div>
    `;

    // Add event listeners to options
    document.querySelectorAll('.quiz-option').forEach(button => {
        button.addEventListener('click', selectOption);
    });
}

function selectOption(e) {
    const selectedIndex = parseInt(e.target.dataset.index);
    const correctIndex = quizQuestions[currentQuestionIndex].correct;
    
    if (selectedIndex === correctIndex) {
        score++;
        e.target.classList.add('bg-green-200');
    } else {
        e.target.classList.add('bg-red-200');
        // Highlight correct answer
        document.querySelectorAll('.quiz-option')[correctIndex].classList.add('bg-green-200');
    }

    // Disable all options
    document.querySelectorAll('.quiz-option').forEach(btn => btn.disabled = true);

    // Next question after delay
    setTimeout(() => {
        currentQuestionIndex++;
        displayQuestion();
    }, 1500);
}

function showResult() {
    const quizContainer = document.getElementById('quiz-container');
    let message = '';
    const percentage = (score / quizQuestions.length) * 100;
    
    if (percentage === 100) {
        message = "Perfect! You know me so well! 💕";
    } else if (percentage >= 80) {
        message = "Amazing! You're my soulmate! 💖";
    } else if (percentage >= 60) {
        message = "Great job! You know me pretty well! 💗";
    } else {
        message = "Not bad! But there's always more to learn about each other! 💓";
    }

    quizContainer.innerHTML = `
        <h3 class="text-2xl font-bold text-pink-600 mb-4">Quiz Complete!</h3>
        <p class="text-lg mb-4">You got ${score} out of ${quizQuestions.length} correct (${percentage.toFixed(0)}%)</p>
        <p class="text-xl text-gray-700">${message}</p>
        <button id="restart-quiz" class="mt-4 bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors">Take Quiz Again</button>
    `;

    document.getElementById('restart-quiz').addEventListener('click', startQuiz);
}

// Attach restart quiz button listener using event delegation
document.addEventListener('click', function(event) {
    if (event.target.id === 'restart-quiz') {
        event.preventDefault();
        startQuiz();
    }
});