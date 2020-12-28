package com.nalhin.fc.investment.dto.response;

import com.nalhin.fc.investment.InvestmentCategory;
import com.nalhin.fc.investment.InvestmentRisk;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.time.Instant;
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
  private Instant createdDate;

  @ApiModelProperty(required = true)
  private InvestmentCategory category;

  @ApiModelProperty(required = true)
  private InvestmentRisk risk;

  @ApiModelProperty(required = true)
  private Integer compoundFrequency;
}
