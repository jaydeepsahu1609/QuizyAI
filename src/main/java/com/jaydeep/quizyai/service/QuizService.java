/*
 * Copyright (c) 2026 Jaydeep Sahu
 * Practice / learning project
 */

package com.jaydeep.quizyai.service;

import com.jaydeep.quizyai.model.QuizResponse;

public interface QuizService {
    String sayHello(String name);

    QuizResponse generateQuiz(String category, String difficulty);
}
