package com.nalhin.fc.auth.dto.request;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class SignUpUserRequestDto {

  @NotNull @Email private String email;

  @NotNull private String username;

  @NotNull
  @Size(min = 6)
  private String password;
}
