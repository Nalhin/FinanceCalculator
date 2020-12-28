package com.nalhin.fc.common.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.validation.FieldError;

import javax.validation.ConstraintViolation;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class ValidationErrorResponseDto {

  private final List<ValidationFieldErrorResponseDto> errors;

  public static ValidationErrorResponseDto from(List<FieldError> fieldErrors) {
    return new ValidationErrorResponseDto(
        fieldErrors.stream()
            .map(ValidationFieldErrorResponseDto::from)
            .collect(Collectors.toList()));
  }

  public static ValidationErrorResponseDto from(Set<ConstraintViolation<?>> constraintViolations) {
    return new ValidationErrorResponseDto(
        constraintViolations.stream()
            .map(ValidationFieldErrorResponseDto::from)
            .collect(Collectors.toList()));
  }
}
