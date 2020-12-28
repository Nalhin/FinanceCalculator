package com.nalhin.fc.investment.exception;

public class InvestmentNotOwnedException extends RuntimeException {
  public InvestmentNotOwnedException() {
    super("User does not own the investment");
  }
}
