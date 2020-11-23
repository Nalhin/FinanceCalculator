package com.nalhin.fc.investment.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class SaveInvestmentDto {

  @NotNull private Long startAmount;
  @NotNull private Integer yearsOfGrowth;
  @NotNull private Integer paymentFrequency;
  @NotNull private Integer annualInterestRate;
  @NotNull private Integer payment;
  @NotNull private String risk;
  @NotNull private String category;
}