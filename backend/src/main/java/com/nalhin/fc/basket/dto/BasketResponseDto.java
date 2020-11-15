package com.nalhin.fc.basket.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BasketResponseDto {

  private Long id;
  private String name;
  private LocalDateTime createdDate;
}
