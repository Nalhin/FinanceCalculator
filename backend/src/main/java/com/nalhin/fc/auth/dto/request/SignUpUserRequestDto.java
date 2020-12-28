package com.nalhin.fc.auth.dto.request;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class SignUpUserRequestDto {

  @NotNull @Email private String email;

  @Size(min = 3, max = 30)
  @NotNull
  private String username;

  @NotNull
  @Size(min = 6, max = 30)
  private String password;
}
