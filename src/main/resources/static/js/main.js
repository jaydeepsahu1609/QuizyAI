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

    // Hide all pages and show the current one
    [PAGE_HOME, PAGE_QUIZ, PAGE_RESULT].forEach(pageId => {
        const element = document.getElementById(pageId);
        if (element) {
            element.style.display = (pageId === currentPage) ? 'flex' : 'none';
        }
    });

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
            localStorage.setItem(STORAGE_KEY_PAGE, PAGE_QUIZ);
            initializeCurrentPage();
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
