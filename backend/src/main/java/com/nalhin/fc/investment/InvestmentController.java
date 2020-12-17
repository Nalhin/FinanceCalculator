package com.nalhin.fc.investment;

import com.nalhin.fc.common.annotations.CurrentAppUser;
import com.nalhin.fc.investment.dto.InvestmentResponseDto;
import com.nalhin.fc.investment.dto.SaveInvestmentDto;
import com.nalhin.fc.investment.dto.UpdateInvestmentRequestDto;
import com.nalhin.fc.core.security.AppUser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
class InvestmentController {
  private final InvestmentService investmentService;
  private final InvestmentMapper investmentMapper;

  @GetMapping("/me/baskets/{basketId}/investments")
  public ResponseEntity<List<InvestmentResponseDto>> getInvestmentsByBasketId(
      @PathVariable Long basketId, @CurrentAppUser AppUser appUser) {
    List<Investment> investments = investmentService.findByBasketId(basketId, appUser.getId());

    return ResponseEntity.ok().body(investmentMapper.investmentsToResponseDto(investments));
  }

  @GetMapping("/me/baskets/{basketId}/investments/{investmentId}")
  public ResponseEntity<InvestmentResponseDto> getInvestmentDetails(
      @PathVariable Long basketId,
      @PathVariable Long investmentId,
      @CurrentAppUser AppUser appUser) {
    Investment foundInvestment =
        investmentService.getByBasketIdAndId(basketId, investmentId, appUser.getId());

    return ResponseEntity.ok(investmentMapper.investmentToResponseDto(foundInvestment));
  }

  @PostMapping("/me/baskets/{basketId}/investments")
  public ResponseEntity<InvestmentResponseDto> saveInvestment(
      @PathVariable Long basketId, @Valid @RequestBody SaveInvestmentDto investment) {
    Investment savedInvestment =
        investmentService.saveInvestment(
            investmentMapper.saveInvestmentDtoToInvestment(investment), basketId);

    URI location =
        URI.create("/me/baskets/" + basketId + "/investments/" + savedInvestment.getId());

    return ResponseEntity.created(location)
        .body(investmentMapper.investmentToResponseDto(savedInvestment));
  }

  @PutMapping("/me/baskets/{basketId}/investments/{investmentId}")
  public ResponseEntity<InvestmentResponseDto> updateInvestment(
      @PathVariable Long investmentId,
      @PathVariable Long basketId,
      @Valid @RequestBody UpdateInvestmentRequestDto updateInvestmentRequestDto,
      @CurrentAppUser AppUser appUser) {
    Investment updatedInvestment =
        investmentService.updateInvestment(
            basketId, investmentId, updateInvestmentRequestDto, appUser.getId());

    return ResponseEntity.ok().body(investmentMapper.investmentToResponseDto(updatedInvestment));
  }

  @DeleteMapping("/me/baskets/{basketId}/investments/{investmentId}")
  public ResponseEntity<Void> deleteInvestment(
      @PathVariable Long basketId,
      @PathVariable Long investmentId,
      @CurrentAppUser AppUser appUser) {
    investmentService.deleteByBasketId(basketId, investmentId, appUser.getId());

    return ResponseEntity.ok().build();
  }
}
