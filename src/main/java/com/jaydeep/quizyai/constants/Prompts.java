/*
 * Copyright (c) 2026 Jaydeep Sahu
 * Practice / learning project
 */

package com.jaydeep.quizyai.constants;

public final class Prompts {

    private Prompts() {
    }

    public final static String WELCOME_PROMPT = """
            Generate a short welcome message.
            
            Structure:
            Hello {name}, <greeting>! <positive message>
            
            Important rules:
            - The positive message MUST be different every time.
            - Greeting must be according to the provided time.
            - Use a fresh and natural sentence.
            - Imagine you are speaking casually to a friend.
            - Maximum 18 words.
            - One sentence only.
            
            Name: {name}
            Current time: {time}
            """;


    public final static String QUIZ_PROMPT = """
            You are a quiz generator API.
            
             Generate exactly 5 quiz questions about the category: %s.
             Difficulty level: %s.
            
             Rules:
             - Each question must be unique and test a different fact.
             - Each question must be one short factual sentence.
             - Provide exactly 4 options per question.
             - Only one option must be correct.
             - The "answer" field must contain the VALUE of the correct option (not the key).
            
             Validation rules (VERY IMPORTANT):
             - The answer value must exactly match one of the option values.
             - Verify that the answer is factually correct before returning the response.
             - Do NOT generate a random answer.
             - Ensure the correct answer corresponds to the question.
            
             Formatting rules:
             - Question IDs must start from 1 and increment sequentially.
             - Option keys must always be exactly: 1, 2, 3, 4.
             - Option values must be short text.
            
             IMPORTANT:
             Return ONLY valid JSON.
             Do NOT include explanations, markdown, comments, or extra text.
            
             JSON format:
            
             {
               "questions": [
                 {
                   "id": 1,
                   "question": "question text",
                   "options": [
                     { "key": 1, "value": "option text" },
                     { "key": 2, "value": "option text" },
                     { "key": 3, "value": "option text" },
                     { "key": 4, "value": "option text" }
                   ],
                   "answer": "option text"
                 }
               ]
             }
            """;
}
