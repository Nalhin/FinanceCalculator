package com.nalhin.fc.investment.dto.response;

import com.nalhin.fc.investment.InvestmentCategory;
import com.nalhin.fc.investment.InvestmentRisk;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.time.Instant;

@Data
public class InvestmentResponseDto {

  @ApiModelProperty(required = true)
  private long id;

  @ApiModelProperty(required = true)
  private long startAmount;

  @ApiModelProperty(required = true)
  private int yearsOfGrowth;

  @ApiModelProperty(required = true)
  private int paymentFrequency;

  @ApiModelProperty(required = true)
  private int annualInterestRate;

  @ApiModelProperty(required = true)
  private int payment;

  @ApiModelProperty(required = true)
  private Instant createdDate;

  @ApiModelProperty(required = true)
  private InvestmentCategory category;

  @ApiModelProperty(required = true)
  private InvestmentRisk risk;

  @ApiModelProperty(required = true)
  private int compoundFrequency;
}
