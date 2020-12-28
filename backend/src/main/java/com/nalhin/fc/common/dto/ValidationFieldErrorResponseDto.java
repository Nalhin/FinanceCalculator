package com.nalhin.fc.common.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.validation.FieldError;

import javax.validation.ConstraintViolation;

@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class ValidationFieldErrorResponseDto {

  @ApiModelProperty(required = true)
  private final String field;

  @ApiModelProperty(required = true)
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
