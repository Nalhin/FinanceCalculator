package com.nalhin.fc.investment.exception;

public class InvestmentNotFoundException extends RuntimeException {

  public InvestmentNotFoundException() {
    super("Investment not found");
  }
}
