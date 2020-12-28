package com.nalhin.fc.basket;

import com.nalhin.fc.basket.dto.request.UpdateBasketRequestDto;
import com.nalhin.fc.basket.exception.BasketNotFoundException;
import com.nalhin.fc.basket.exception.BasketNotOwnedException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
class BasketService {
  private final BasketRepository basketRepository;
  private final BasketMapper basketMapper;

  public Page<Basket> findAll(Pageable page, Long userId) {
    return basketRepository.findAllByOwnerId(page, userId);
  }

  public Basket update(Long basketId, UpdateBasketRequestDto updateBasketRequest, Long userId) {
    Basket basket = basketRepository.findById(basketId).orElseThrow(BasketNotFoundException::new);

    if (!basket.getOwner().getId().equals(userId)) {
      throw new BasketNotOwnedException();
    }

    basketMapper.updateEntity(basket, updateBasketRequest);
    return basketRepository.save(basket);
  }

  public Basket save(Basket basket) {
    return basketRepository.save(basket);
  }

  public void delete(Long basketId, Long userId) {
    Basket basket = basketRepository.findById(basketId).orElseThrow(BasketNotFoundException::new);

    if (!basket.getOwner().getId().equals(userId)) {
      throw new BasketNotOwnedException();
    }

    basketRepository.delete(basket);
  }
}
