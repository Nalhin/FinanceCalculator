package com.nalhin.fc.investment;

import lombok.Getter;

@Getter
public enum InvestmentCategory {
  SAVINGS_ACCOUNT(InvestmentRisk.LOW),
  RENTAL_HOUSING(InvestmentRisk.LOW),
  STOCK_FUND(InvestmentRisk.HIGH),
  CERTIFICATE_OF_DEPOSIT(InvestmentRisk.LOW),
  TREASURY_SECURITIES(InvestmentRisk.LOW),
  HEDGE_FUND(InvestmentRisk.MEDIUM),
  MONEY_MARKET_ACCOUNT(InvestmentRisk.MEDIUM),
  GOVERNMENT_BOND_FUNDS(InvestmentRisk.LOW),
  OTHER(InvestmentRisk.UNKNOWN);

  private final InvestmentRisk risk;

  InvestmentCategory(InvestmentRisk risk) {
    this.risk = risk;
  }
}
