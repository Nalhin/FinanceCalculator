package com.nalhin.fc.core.error;

import com.nalhin.fc.common.dto.ApiErrorResponseDto;
import com.nalhin.fc.common.dto.ValidationErrorResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.validation.ConstraintViolationException;

@ControllerAdvice
public class ErrorHandlingControllerAdvice {
  @ExceptionHandler(ConstraintViolationException.class)
  ResponseEntity<ValidationErrorResponseDto> onConstraintValidation(
      ConstraintViolationException e) {
    return ResponseEntity.badRequest()
        .body(ValidationErrorResponseDto.from(e.getConstraintViolations()));
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  ResponseEntity<ValidationErrorResponseDto> onMethodArgumentNotValid(
      MethodArgumentNotValidException e) {
    return ResponseEntity.badRequest()
        .body(ValidationErrorResponseDto.from(e.getBindingResult().getFieldErrors()));
  }
}
