# QuizyAI 🤖🧠

> [Work In Progress]

⚡ *QuizyAI explores a simple idea: what if quizzes didn't need a database at all?*

QuizyAI is an AI-powered quiz application built with **Spring Boot** and **Spring AI**, where quiz questions are generated dynamically using a Large Language Model instead of being stored in a traditional database.

In typical quiz applications, questions, options, answers, and difficulty levels are stored and fetched from a datastore. QuizyAI takes a different approach — it **generates quizzes on demand using AI**, eliminating the need to maintain a large question database.

The application integrates with **OpenRouter free LLM models** to generate quiz questions for any topic or category in real time.

This project is built primarily as a **learning project** to explore:

-   Integrating **AI into Java/Spring applications**
-   Using **Spring AI** for LLM interactions
-   Designing AI-assisted backend systems
-   Experimenting with prompt engineering and structured AI responses

---

## Features

-   🤖 **AI-generated quizzes** for any topic or category
-   🎯 Configurable **difficulty levels**
-   👤 **User management** with quiz history
-   🏆 **High score tracking and leaderboards**
-   💾 **Save progress** and resume quizzes
-   🔌 AI backend powered by **OpenRouter free models**
-   ⚡ Built with **Spring Boot + Spring AI**

## How It Works

Instead of retrieving quiz questions from a database, the backend sends a structured prompt to an AI model via OpenRouter. The AI returns a formatted quiz containing:

-   Question
-   Multiple-choice options
-   Correct answer
-   Difficulty level

The Spring Boot application then validates, stores user results, and manages quiz sessions.

---

## Tech Stack

-   Java
-   Spring Boot
-   Spring AI
-   OpenRouter (For Free AI Models)
-   JSON-based AI responses

---

## Purpose of the Project

This project is intentionally designed as an **experimental playground for learning AI integration in Java applications**.

The goal is to explore:

-   How LLMs can replace traditional data sources in some scenarios
-   Best practices for AI prompting and response parsing
-   Building AI-assisted backend services using Spring

## Future Improvements

-   AI response validation and retry mechanisms
-   Better prompt engineering for consistent quiz format
-   Rate limiting and caching of generated quizzes
-   Support for multiple AI providers
-   Web or mobile frontend

---

## How to run the project

```sh
cp .env.template .env

## set SECRET_API_KEY value in the .env file

./startup.sh
```