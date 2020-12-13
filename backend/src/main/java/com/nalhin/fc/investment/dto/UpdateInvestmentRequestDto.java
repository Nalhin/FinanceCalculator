package com.nalhin.fc.investment.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class UpdateInvestmentRequestDto {

  @NotNull private Long startAmount;
  @NotNull private Integer yearsOfGrowth;
  @NotNull private Integer paymentFrequency;
  @NotNull private Integer annualInterestRate;
  @NotNull private Integer compoundFrequency;
  @NotNull private Integer payment;
  @NotNull private String risk;
  @NotNull private String category;
}
