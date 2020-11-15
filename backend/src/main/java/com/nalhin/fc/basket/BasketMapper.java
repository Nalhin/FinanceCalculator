package com.nalhin.fc.basket;

import com.nalhin.fc.basket.dto.BasketResponseDto;
import com.nalhin.fc.basket.dto.SaveBasketRequestDto;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface BasketMapper {

  BasketResponseDto basketToResponseDto(Basket basket);

  @Mapping(target = "owner", ignore = true)
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "createdDate", ignore = true)
  Basket saveBasketRequestDtoToBasket(SaveBasketRequestDto requestDto);
}
