package com.nalhin.fc.user.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;


@Data
public class UserResponseDto {
  @ApiModelProperty(required = true)
  private String email;
  @ApiModelProperty(required = true)
  private String username;
}
