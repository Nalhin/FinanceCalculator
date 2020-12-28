package com.nalhin.fc.common.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor(staticName = "of")
@Getter
public class ApiErrorResponseDto {

  private final String message;
}
