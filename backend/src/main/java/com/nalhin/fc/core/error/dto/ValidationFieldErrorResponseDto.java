package com.nalhin.fc.core.error.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.validation.FieldError;

import javax.validation.ConstraintViolation;

@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class ValidationFieldErrorResponseDto {

  private final String field;
  private final String message;

  public static ValidationFieldErrorResponseDto from(FieldError fieldError) {
    return new ValidationFieldErrorResponseDto(
        fieldError.getField(), fieldError.getDefaultMessage());
  }

  public static ValidationFieldErrorResponseDto from(ConstraintViolation<?> fieldError) {
    return new ValidationFieldErrorResponseDto(
        fieldError.getPropertyPath().toString(), fieldError.getMessage());
  }
}
