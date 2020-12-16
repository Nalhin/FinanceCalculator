package com.nalhin.fc.basket;

import com.nalhin.fc.basket.dto.BasketResponseDto;
import com.nalhin.fc.basket.dto.SaveBasketRequestDto;
import com.nalhin.fc.basket.dto.UpdateBasketRequestDto;
import com.nalhin.fc.common.annotations.CurrentAppUser;
import com.nalhin.fc.core.security.AppUser;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
class BasketController {

  private final BasketService basketService;
  private final BasketMapper basketMapper;

  @GetMapping("/me/baskets")
  public ResponseEntity<Page<BasketResponseDto>> getBaskets(
      Pageable pageable, @CurrentAppUser AppUser appUser) {

    Page<Basket> basketsPage = basketService.findAll(pageable, appUser.getId());

    return ResponseEntity.ok(basketsPage.map(basketMapper::basketToResponseDto));
  }

  @PostMapping("/me/baskets")
  public ResponseEntity<BasketResponseDto> saveBasket(
      @Valid @RequestBody SaveBasketRequestDto basket) {

    Basket savedBasket = basketService.save(basketMapper.saveBasketRequestDtoToBasket(basket));
    URI location = URI.create("/me/baskets/" + savedBasket.getId());

    return ResponseEntity.created(location).body(basketMapper.basketToResponseDto(savedBasket));
  }

  @PutMapping("/me/baskets/{basketId}")
  public ResponseEntity<BasketResponseDto> updateBasket(
      @PathVariable Long basketId,
      @Valid @RequestBody UpdateBasketRequestDto updateBasketRequestDto,
      @CurrentAppUser AppUser appUser) {

    Basket updatedBasket = basketService.update(basketId, updateBasketRequestDto, appUser.getId());

    return ResponseEntity.ok(basketMapper.basketToResponseDto(updatedBasket));
  }

  @DeleteMapping("/me/baskets/{basketId}")
  public ResponseEntity<Void> deleteBasket(
      @PathVariable Long basketId, @CurrentAppUser AppUser appUser) {

    basketService.delete(basketId, appUser.getId());

    return ResponseEntity.ok().build();
  }
}
