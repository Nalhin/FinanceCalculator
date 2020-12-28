package com.nalhin.fc.basket;

import com.nalhin.fc.basket.dto.response.BasketResponseDto;
import com.nalhin.fc.basket.dto.request.SaveBasketRequestDto;
import com.nalhin.fc.basket.dto.request.UpdateBasketRequestDto;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface BasketMapper {

  BasketResponseDto toResponse(Basket basket);

  @Mapping(target = "owner", ignore = true)
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "createdDate", ignore = true)
  Basket toEntity(SaveBasketRequestDto requestDto);

  @Mapping(target = "owner", ignore = true)
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "createdDate", ignore = true)
  void updateEntity(@MappingTarget Basket entity, UpdateBasketRequestDto updateBasket);
}
