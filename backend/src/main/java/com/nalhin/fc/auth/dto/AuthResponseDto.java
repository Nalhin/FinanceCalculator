package com.nalhin.fc.auth.dto;

import com.nalhin.fc.user.dto.UserResponseDto;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class AuthResponseDto {

  @ApiModelProperty(required = true)
  private String token;

  @ApiModelProperty(required = true)
  private UserResponseDto user;
}
