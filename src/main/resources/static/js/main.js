/*
 * Copyright (c) 2026 Jaydeep Sahu
 * Practice / learning project
 */

/**
 * Constants for page IDs and localStorage keys.
 */
const PAGE_HOME = 'home-page';
const PAGE_QUIZ = 'quiz-page';
const PAGE_RESULT = 'result-page';
const STORAGE_KEY_PAGE = 'current-page';
const STORAGE_KEY_HIGHSCORE = 'highscore';
const STORAGE_KEY_CATEGORY = 'current_category';
const STORAGE_KEY_DIFFICULTY = 'current_difficulty';
const STORAGE_KEY_QUIZ_ID = 'quiz-no';
const STORAGE_KEY_QUIZ_DATA = 'quiz-data';
const STORAGE_KEY_CURRENT_INDEX = 'current-question-index';
const STORAGE_KEY_USER_ANSWERS = 'user-answers';

/**
 * Initializes the high score from local storage and updates the UI.
 */
function initializeHighScore() {
    let highscore = localStorage.getItem(STORAGE_KEY_HIGHSCORE);

    if (highscore === null) {
        highscore = 0;
        localStorage.setItem(STORAGE_KEY_HIGHSCORE, highscore);
    }

    const highscoreSpan = document.getElementById('highscore');
    if (highscoreSpan) {
        highscoreSpan.innerHTML = highscore;
    }
}

function initializeOrIncrementQuizId() {
    let quizId = localStorage.getItem(STORAGE_KEY_QUIZ_ID);

    if (quizId === null) {
        quizId = 0;
    }

    quizId++;

    localStorage.setItem(STORAGE_KEY_QUIZ_ID, quizId);

    const quizIdSpan = document.getElementById('quiz-no');
    if (quizIdSpan) {
        quizIdSpan.innerHTML = quizId;
    }
}

/**
 * Initializes the current page state and ensures the correct view is displayed.
 */
function initializeCurrentPage() {
    let currentPage = localStorage.getItem(STORAGE_KEY_PAGE);
    const validPages = [PAGE_HOME, PAGE_QUIZ, PAGE_RESULT];

    if (!validPages.includes(currentPage)) {
        currentPage = PAGE_HOME;
        localStorage.setItem(STORAGE_KEY_PAGE, PAGE_HOME);
    }

    if (currentPage === PAGE_HOME) {
        // reset stale quiz data on home page
        resetQuizDataInLocalStorage();
        resetErrorAlert();
        resetQuizFilters();
    }

    // Hide all pages and show the current one
    [PAGE_HOME, PAGE_QUIZ, PAGE_RESULT].forEach(pageId => {
        const element = document.getElementById(pageId);
        if (element) {
            element.style.display = (pageId === currentPage) ? 'block' : 'none';
        }
    });

    if (currentPage === PAGE_QUIZ) {
        initializeOrIncrementQuizId();
        renderQuestion();
    }
}

/**
 * Resets the category and difficulty selection filters to their default values.
 */
function resetQuizFilters() {
    const categorySelect = document.getElementById('category');
    const difficultySelect = document.getElementById('difficulty');

    if (categorySelect) {
        categorySelect.selectedIndex = 0;
    }
    if (difficultySelect) {
        difficultySelect.value = 'EASY';
    }
}

/**
 * Fetches quiz data from the server based on user selection and manages page transition.
 */
function playgame() {
    const loader = document.getElementById('loader');
    resetErrorAlert();

    const categorySelect = document.getElementById('category');
    const difficultySelect = document.getElementById('difficulty');

    const category = categorySelect ? categorySelect.value : null;
    const difficulty = difficultySelect ? difficultySelect.value : 'EASY';

    if (category === 'SELECT' || !category) {
        showErrorInAlert("Please select a category");
        return;
    }

    if (loader) loader.style.display = 'block';

    const url = `/quiz?category=${encodeURIComponent(category)}&difficulty=${encodeURIComponent(difficulty)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (loader) loader.style.display = 'none';
            if (data.error) {
                showErrorInAlert(data.error);
            } else {
                localStorage.setItem(STORAGE_KEY_CATEGORY, category.toUpperCase());
                localStorage.setItem(STORAGE_KEY_DIFFICULTY, difficulty);
                localStorage.setItem(STORAGE_KEY_QUIZ_DATA, JSON.stringify(data));
                localStorage.setItem(STORAGE_KEY_CURRENT_INDEX, '0');
                localStorage.setItem(STORAGE_KEY_USER_ANSWERS, JSON.stringify([]));
                localStorage.setItem(STORAGE_KEY_PAGE, PAGE_QUIZ);
                initializeCurrentPage();
            }
        })
        .catch(error => {
            if (loader) loader.style.display = 'none';
            console.error('Error fetching quiz:', error);
            showErrorInAlert(error.message || "An error occurred while fetching the quiz.");
            localStorage.removeItem(STORAGE_KEY_PAGE);
        });
}

/**
 * Displays an error message in the alert component or via a browser alert.
 * @param {string} errorMsg - The error message to display.
 */
function showErrorInAlert(errorMsg) {
    const errorAlert = document.getElementById('error-alert');
    const errorMsgElement = document.getElementById('error-message');
    if (errorAlert && errorMsgElement) {
        errorMsgElement.innerText = errorMsg;
        errorAlert.style.display = 'block';
    } else {
        alert(errorMsg);
    }
}

/**
 * Hides the error alert and clears the message text.
 */
function resetErrorAlert() {
    const errorAlert = document.getElementById('error-alert');
    const errorMsgElement = document.getElementById('error-message');
    if (errorAlert) {
        errorAlert.style.display = 'none';
    }
    if (errorMsgElement) {
        errorMsgElement.innerText = '';
    }
}

/**
 * Renders the current question and options to the UI.
 */
function renderQuestion() {
    const quizData = JSON.parse(localStorage.getItem(STORAGE_KEY_QUIZ_DATA));

    const currentIndex = parseInt(localStorage.getItem(STORAGE_KEY_CURRENT_INDEX));

    if (!quizData || !quizData.questions || currentIndex >= quizData.questions.length) {
        return;
    }

    const question = quizData.questions[currentIndex];

    // Update Meta info
    const metaValues = document.querySelectorAll('#quiz-page .quiz-meta .meta-value');
    if (metaValues.length >= 2) {
        metaValues[0].innerText = localStorage.getItem(STORAGE_KEY_CATEGORY);
        metaValues[1].innerText = localStorage.getItem(STORAGE_KEY_DIFFICULTY);
    }
    
    document.querySelector('.question-count .meta-value').innerText = `${currentIndex + 1} / ${quizData.questions.length}`;

    // Update Question text
    document.querySelector('.question-text').innerText = question.question;

    // Update Options
    const optionsContainer = document.querySelector('.question-container .row');
    optionsContainer.innerHTML = '';
    question.options.forEach(option => {
        const col = document.createElement('div');
        col.className = 'col-md-6';
        const btn = document.createElement('button');
        btn.className = 'btn option-btn w-100';
        btn.innerText = option.value;
        btn.onclick = () => handleAnswer(option);
        col.appendChild(btn);
        optionsContainer.appendChild(col);
    });
}

/**
 * Handles the selection of an answer.
 */
function handleAnswer(selectedOption) {
    const quizData = JSON.parse(localStorage.getItem(STORAGE_KEY_QUIZ_DATA));
    let currentIndex = parseInt(localStorage.getItem(STORAGE_KEY_CURRENT_INDEX));
    let userAnswers = JSON.parse(localStorage.getItem(STORAGE_KEY_USER_ANSWERS));

    const currentQuestion = quizData.questions[currentIndex];
    // The server maps the answer as the key of the correct option (string)
    const isCorrect = String(selectedOption.key) === String(currentQuestion.answer);
    
    userAnswers.push(isCorrect);
    localStorage.setItem(STORAGE_KEY_USER_ANSWERS, JSON.stringify(userAnswers));

    currentIndex++;
    if (currentIndex < quizData.questions.length) {
        localStorage.setItem(STORAGE_KEY_CURRENT_INDEX, currentIndex.toString());
        renderQuestion();
    } else {
        showResults();
    }
}

/**
 * Shows the result page.
 */
function showResults() {
    const quizData = JSON.parse(localStorage.getItem(STORAGE_KEY_QUIZ_DATA));
    const userAnswers = JSON.parse(localStorage.getItem(STORAGE_KEY_USER_ANSWERS));
    const score = userAnswers.filter(ans => ans).length;

    localStorage.setItem(STORAGE_KEY_PAGE, PAGE_RESULT);
    document.getElementById('result-category').innerText = localStorage.getItem(STORAGE_KEY_CATEGORY);
    document.getElementById('result-difficulty').innerText = localStorage.getItem(STORAGE_KEY_DIFFICULTY);
    document.getElementById('score-value').innerText = score;
    document.getElementById('score-total').innerText = userAnswers.length;

    // Update high score
    let highscore = parseInt(localStorage.getItem(STORAGE_KEY_HIGHSCORE)) || 0;
    if (score > highscore) {
        localStorage.setItem(STORAGE_KEY_HIGHSCORE, score);
        initializeHighScore();
    }

    // Update result items list
    const resultItemsContainer = document.querySelector('#result-page .col-md-6:first-child');
    resultItemsContainer.innerHTML = '';
    userAnswers.forEach((isCorrect, index) => {
        const item = document.createElement('div');
        item.className = `result-item ${isCorrect ? 'correct' : 'wrong'}`;
        item.innerHTML = `<span class="result-number">${index + 1}</span><span class="result-text">${isCorrect ? 'CORRECT' : 'WRONG'} ANSWER</span>`;
        resultItemsContainer.appendChild(item);
    });

    initializeCurrentPage();
}

/**
 * Clears quiz data, user answers, and current index from local storage.
 */
function resetQuizDataInLocalStorage() {
    localStorage.removeItem(STORAGE_KEY_CATEGORY);
    localStorage.removeItem(STORAGE_KEY_DIFFICULTY);
    localStorage.removeItem(STORAGE_KEY_QUIZ_DATA);
    localStorage.removeItem(STORAGE_KEY_USER_ANSWERS);
    localStorage.removeItem(STORAGE_KEY_CURRENT_INDEX);
}

/**
 * Main entry point: initializes the application state once the DOM is fully loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
    initializeHighScore();
    initializeCurrentPage();

    const playBtn = document.getElementById('play-btn');
    if (playBtn) {
        playBtn.addEventListener('click', () => {
            playgame();
        });
    }

    const newQuizBtn = document.getElementById('new-quiz-btn');
    if (newQuizBtn) {
        newQuizBtn.addEventListener('click', () => {
            localStorage.setItem(STORAGE_KEY_PAGE, PAGE_HOME);
            initializeCurrentPage();
        });
    }

});
