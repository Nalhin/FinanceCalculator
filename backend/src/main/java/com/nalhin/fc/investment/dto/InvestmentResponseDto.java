package com.nalhin.fc.investment.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotNull;
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
  private String risk;
  @ApiModelProperty(required = true)
  private Date created;
  @ApiModelProperty(required = true)
  private String category;
}
