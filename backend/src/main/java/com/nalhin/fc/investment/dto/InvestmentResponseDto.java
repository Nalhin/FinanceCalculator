package com.nalhin.fc.investment.dto;

import lombok.Data;

import java.util.Date;

@Data
public class InvestmentResponseDto {

  private Long id;
  private Long startAmount;
  private Integer yearsOfGrowth;
  private Integer paymentFrequency;
  private Integer annualInterestRate;
  private Integer payment;
  private String risk;
  private Date created;
  private String category;
}
