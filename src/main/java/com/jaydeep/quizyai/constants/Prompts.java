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

}
