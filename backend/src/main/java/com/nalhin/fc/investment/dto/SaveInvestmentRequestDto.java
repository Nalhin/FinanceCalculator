package com.nalhin.fc.investment.dto;

import com.nalhin.fc.investment.InvestmentCategory;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class SaveInvestmentRequestDto {

  @NotNull private Long startAmount;
  @NotNull private Integer yearsOfGrowth;
  @NotNull private Integer paymentFrequency;
  @NotNull private Integer annualInterestRate;
  @NotNull private Integer compoundFrequency;
  @NotNull private Integer payment;
  @NotNull private InvestmentCategory category;
}
