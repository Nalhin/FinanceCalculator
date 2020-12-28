package com.nalhin.fc.investment;

import com.nalhin.fc.common.annotations.CurrentAppUser;
import com.nalhin.fc.common.dto.ApiErrorResponseDto;
import com.nalhin.fc.investment.dto.response.InvestmentResponseDto;
import com.nalhin.fc.investment.dto.request.SaveInvestmentRequestDto;
import com.nalhin.fc.investment.dto.request.UpdateInvestmentRequestDto;
import com.nalhin.fc.core.security.AppUser;
import com.nalhin.fc.investment.exception.InvestmentNotFoundException;
import com.nalhin.fc.investment.exception.InvestmentNotOwnedException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
class InvestmentController {
  private final InvestmentService investmentService;
  private final InvestmentMapper mapper;

  @GetMapping("/me/baskets/{basketId}/investments")
  public ResponseEntity<List<InvestmentResponseDto>> getInvestmentsByBasketId(
      @PathVariable Long basketId, @CurrentAppUser AppUser appUser) {
    List<Investment> investments = investmentService.findByBasketId(basketId, appUser.getId());

    return ResponseEntity.ok()
        .body(investments.stream().map(mapper::toResponse).collect(Collectors.toList()));
  }

  @GetMapping("/me/baskets/{basketId}/investments/{investmentId}")
  public ResponseEntity<InvestmentResponseDto> getInvestmentDetails(
      @PathVariable Long basketId,
      @PathVariable Long investmentId,
      @CurrentAppUser AppUser appUser) {
    Investment foundInvestment =
        investmentService.getByBasketIdAndId(basketId, investmentId, appUser.getId());

    return ResponseEntity.ok(mapper.toResponse(foundInvestment));
  }

  @PostMapping("/me/baskets/{basketId}/investments")
  public ResponseEntity<InvestmentResponseDto> saveInvestment(
      @PathVariable Long basketId, @Valid @RequestBody SaveInvestmentRequestDto investment) {
    Investment savedInvestment =
        investmentService.saveInvestment(mapper.toEntity(investment), basketId);

    URI location =
        URI.create("/me/baskets/" + basketId + "/investments/" + savedInvestment.getId());

    return ResponseEntity.created(location).body(mapper.toResponse(savedInvestment));
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

    return ResponseEntity.ok().body(mapper.toResponse(updatedInvestment));
  }

  @DeleteMapping("/me/baskets/{basketId}/investments/{investmentId}")
  public ResponseEntity<Void> deleteInvestment(
      @PathVariable Long basketId,
      @PathVariable Long investmentId,
      @CurrentAppUser AppUser appUser) {
    investmentService.deleteByBasketId(basketId, investmentId, appUser.getId());

    return ResponseEntity.ok().build();
  }

  @ExceptionHandler(InvestmentNotFoundException.class)
  public ResponseEntity<ApiErrorResponseDto> handleNotFound(InvestmentNotFoundException exception) {
    return new ResponseEntity<>(
        ApiErrorResponseDto.of(exception.getMessage()), HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(InvestmentNotOwnedException.class)
  public ResponseEntity<ApiErrorResponseDto> handleNotFound(InvestmentNotOwnedException exception) {
    return new ResponseEntity<>(
        ApiErrorResponseDto.of(exception.getMessage()), HttpStatus.FORBIDDEN);
  }
}
