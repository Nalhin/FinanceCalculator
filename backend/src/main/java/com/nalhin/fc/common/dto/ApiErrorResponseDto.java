package com.nalhin.fc.common.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor(staticName = "of")
@Getter
public class ApiErrorResponseDto {

  @ApiModelProperty(required = true)
  private final String message;
}
