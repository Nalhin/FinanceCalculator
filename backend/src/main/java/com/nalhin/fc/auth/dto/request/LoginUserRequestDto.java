package com.nalhin.fc.auth.dto.request;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class LoginUserRequestDto {

  @NotNull private String username;

  @NotNull private String password;
}
