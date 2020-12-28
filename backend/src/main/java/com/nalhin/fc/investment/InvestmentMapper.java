package com.nalhin.fc.investment;

import com.nalhin.fc.investment.dto.response.InvestmentResponseDto;
import com.nalhin.fc.investment.dto.request.SaveInvestmentRequestDto;
import com.nalhin.fc.investment.dto.request.UpdateInvestmentRequestDto;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface InvestmentMapper {

  @Mapping(target = "owner", ignore = true)
  @Mapping(target = "createdDate", ignore = true)
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "basket", ignore = true)
  void updateEntity(
      UpdateInvestmentRequestDto updateInvestmentDto, @MappingTarget Investment investment);

  @Mapping(target = "risk", source = "investment.category.risk")
  InvestmentResponseDto toResponse(Investment investment);

  @Mapping(target = "owner", ignore = true)
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "createdDate", ignore = true)
  @Mapping(target = "basket", ignore = true)
  Investment toEntity(SaveInvestmentRequestDto investment);
}
