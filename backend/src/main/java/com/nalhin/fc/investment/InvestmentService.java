package com.nalhin.fc.investment;

import com.nalhin.fc.basket.Basket;
import com.nalhin.fc.basket.BasketRepository;
import com.nalhin.fc.investment.dto.UpdateInvestmentRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
class InvestmentService {

  private final InvestmentRepository investmentRepository;
  private final InvestmentMapper investmentMapper;
  private final BasketRepository basketRepository;

  List<Investment> findByBasketId(Long basketId, Long userId) {
    return this.investmentRepository.findByBasketIdAndOwnerId(basketId, userId);
  }

  public Investment getByBasketIdAndId(Long investmentId, Long basketId, Long userId) {
    Investment investment =
        investmentRepository
            .findByBasketIdAndId(investmentId, basketId)
            .orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Investment not found"));

    if (!investment.getOwner().getId().equals(userId)) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN);
    }

    return investment;
  }

  public Investment saveInvestment(Investment investment, Long basketId) {
    Basket basket =
        basketRepository
            .findById(basketId)
            .orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Basket not found"));

    investment.setBasket(basket);
    return investmentRepository.save(investment);
  }

  public Investment updateInvestment(
      Long basketId, Long investmentId, UpdateInvestmentRequestDto investmentRequest, Long userId) {
    Investment investment =
        investmentRepository
            .findByBasketIdAndId(basketId, investmentId)
            .orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Investment not found"));

    if (!investment.getOwner().getId().equals(userId)) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN);
    }

    investmentMapper.updateInvestmentFromDto(investmentRequest, investment);
    return investmentRepository.save(investment);
  }

  public void deleteByBasketId(Long basketId, Long investmentId, Long userId) {
    Investment investment =
        investmentRepository
            .findByBasketIdAndId(basketId, investmentId)
            .orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Investment not found"));

    if (!investment.getOwner().getId().equals(userId)) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN);
    }

    investmentRepository.delete(investment);
  }
}
