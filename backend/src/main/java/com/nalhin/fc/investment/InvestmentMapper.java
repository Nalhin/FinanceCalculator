package com.nalhin.fc.investment;

import com.nalhin.fc.investment.dto.InvestmentResponseDto;
import com.nalhin.fc.investment.dto.SaveInvestmentDto;
import com.nalhin.fc.investment.dto.UpdateInvestmentRequestDto;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface InvestmentMapper {

  @Mapping(target = "owner", ignore = true)
  @Mapping(target = "createdDate", ignore = true)
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "basket", ignore = true)
  void updateInvestmentFromDto(
      UpdateInvestmentRequestDto updateInvestmentDto, @MappingTarget Investment investment);

  @Mapping(target = "risk", source = "investment.category.risk")
  InvestmentResponseDto investmentToResponseDto(Investment investment);

  @Mapping(target = "owner", ignore = true)
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "createdDate", ignore = true)
  @Mapping(target = "basket", ignore = true)
  Investment saveInvestmentDtoToInvestment(SaveInvestmentDto investment);

  List<InvestmentResponseDto> investmentsToResponseDto(List<Investment> investmentList);
}
