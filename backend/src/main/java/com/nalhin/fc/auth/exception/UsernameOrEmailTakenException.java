package com.nalhin.fc.auth.exception;

public class UsernameOrEmailTakenException extends RuntimeException {

  public UsernameOrEmailTakenException() {
    super("Username or email is already taken");
  }
}
