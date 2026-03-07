/*
 * Copyright (c) 2026 Jaydeep Sahu
 * Practice / learning project
 */

package com.jaydeep.quizyai.model;

import lombok.Data;

import java.util.List;

@Data
public class QuizResponse implements Response{

    private List<Question> questions;

}