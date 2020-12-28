package com.nalhin.fc.investment.dto.request;

import com.nalhin.fc.investment.InvestmentCategory;
import lombok.Data;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Data
public class SaveInvestmentRequestDto {

  @Min(0)
  @Max(10_000_000)
  @NotNull
  private Integer startAmount;

  @Min(1)
  @Max(30)
  @NotNull
  private Integer yearsOfGrowth;

  @Min(1)
  @Max(52)
  @NotNull
  private Integer paymentFrequency;

  @Min(0)
  @Max(30)
  @NotNull
  private Double annualInterestRate;

  @Min(1)
  @Max(52)
  @NotNull
  private Integer compoundFrequency;

  @Min(0)
  @Max(1_000_000)
  @NotNull
  private Integer payment;

  @NotNull private InvestmentCategory category;
}
