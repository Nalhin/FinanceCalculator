package com.nalhin.fc.basket.exception;

public class BasketNotOwnedException extends RuntimeException {
  public BasketNotOwnedException() {
    super("User does not own the basket");
  }
}
