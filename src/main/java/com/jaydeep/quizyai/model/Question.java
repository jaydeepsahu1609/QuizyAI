/*
 * Copyright (c) 2026 Jaydeep Sahu
 * Practice / learning project
 */

package com.jaydeep.quizyai.model;

import lombok.Data;

import java.util.List;

@Data
public class Question {

    private int id;
    private String question;
    private List<Option> options;
    private String answer;
}