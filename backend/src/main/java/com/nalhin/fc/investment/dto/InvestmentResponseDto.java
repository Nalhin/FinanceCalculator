package com.nalhin.fc.investment.dto;

import com.nalhin.fc.investment.InvestmentCategory;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.Date;

@Data
public class InvestmentResponseDto {

  @ApiModelProperty(required = true)
  private Long id;

  @ApiModelProperty(required = true)
  private Long startAmount;

  @ApiModelProperty(required = true)
  private Integer yearsOfGrowth;

  @ApiModelProperty(required = true)
  private Integer paymentFrequency;

  @ApiModelProperty(required = true)
  private Integer annualInterestRate;

  @ApiModelProperty(required = true)
  private Integer payment;

  @ApiModelProperty(required = true)
  private Date created;

  @ApiModelProperty(required = true)
  private InvestmentCategory category;
}
