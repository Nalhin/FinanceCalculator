package com.nalhin.fc.basket.exception;

public class BasketNotFoundException extends RuntimeException {
  public BasketNotFoundException() {
    super("Basket not found");
  }
}
