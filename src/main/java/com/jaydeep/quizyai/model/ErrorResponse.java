/*
 * Copyright (c) 2026 Jaydeep Sahu
 * Practice / learning project
 */

package com.jaydeep.quizyai.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ErrorResponse implements Response {

    private String error;

}