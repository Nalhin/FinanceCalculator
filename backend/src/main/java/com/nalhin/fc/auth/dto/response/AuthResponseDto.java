package com.nalhin.fc.auth.dto.response;

import com.nalhin.fc.user.dto.response.UserResponseDto;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class AuthResponseDto {

  @ApiModelProperty(required = true)
  private String token;

  @ApiModelProperty(required = true)
  private UserResponseDto user;
}
