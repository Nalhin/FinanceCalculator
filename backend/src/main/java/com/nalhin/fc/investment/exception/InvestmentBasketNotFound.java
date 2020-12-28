package com.nalhin.fc.investment.exception;

public class InvestmentBasketNotFound extends RuntimeException{

    public InvestmentBasketNotFound() {
        super("Investment basket not found");
    }
}
