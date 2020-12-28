package com.nalhin.fc.basket.dto.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class SaveBasketRequestDto {

  @Size(min = 3, max = 100)
  private String name;

  @NotBlank private String description;
}