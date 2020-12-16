package com.nalhin.fc.basket;

import com.nalhin.fc.basket.dto.UpdateBasketRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
class BasketService {
  private final BasketRepository basketRepository;

  public Page<Basket> findAll(Pageable page, Long userId) {
    return basketRepository.findAllByOwnerId(page, userId);
  }

  public Basket update(Long basketId, UpdateBasketRequestDto updateBasketRequest, Long userId) {
    Basket basket =
        basketRepository
            .findById(basketId)
            .orElseThrow(
                () ->
                    new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Basket not found with id " + basketId));
    if (!basket.getOwner().getId().equals(userId)) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN);
    }

    basket.setName(updateBasketRequest.getName());
    return basketRepository.save(basket);
  }

  public Basket save(Basket basket) {
    return basketRepository.save(basket);
  }

  public void delete(Long basketId, Long userId) {
    Basket basket =
        basketRepository
            .findById(basketId)
            .orElseThrow(
                () ->
                    new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Basket not found with id " + basketId));

    if (!basket.getOwner().getId().equals(userId)) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN);
    }

    basketRepository.delete(basket);
  }
}
