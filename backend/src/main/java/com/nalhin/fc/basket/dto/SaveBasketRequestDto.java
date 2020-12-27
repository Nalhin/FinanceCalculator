package com.nalhin.fc.basket.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class SaveBasketRequestDto {

  @NotBlank
  @Size(min = 3, max = 100)
  private String name;

  @ApiModelProperty(required = true)
  private String description;
}
