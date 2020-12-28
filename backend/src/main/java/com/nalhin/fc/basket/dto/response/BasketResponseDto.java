package com.nalhin.fc.basket.dto.response;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.time.Instant;

@Data
public class BasketResponseDto {

  @ApiModelProperty(required = true)
  private Long id;

  @ApiModelProperty(required = true)
  private String name;

  @ApiModelProperty(required = true)
  private String description;

  @ApiModelProperty(required = true)
  private Instant createdDate;
}
