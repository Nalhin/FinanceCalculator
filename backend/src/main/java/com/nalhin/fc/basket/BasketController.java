package com.nalhin.fc.basket;

import com.nalhin.fc.basket.dto.response.BasketResponseDto;
import com.nalhin.fc.basket.dto.request.SaveBasketRequestDto;
import com.nalhin.fc.basket.dto.request.UpdateBasketRequestDto;
import com.nalhin.fc.basket.exception.BasketNotFoundException;
import com.nalhin.fc.basket.exception.BasketNotOwnedException;
import com.nalhin.fc.common.annotations.CurrentAppUser;
import com.nalhin.fc.common.dto.ApiErrorResponseDto;
import com.nalhin.fc.common.dto.ValidationErrorResponseDto;
import com.nalhin.fc.core.security.AppUser;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;

@Api(tags = "Basket")
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
class BasketController {

  private final BasketService basketService;
  private final BasketMapper basketMapper;

  @ApiOperation(
      value = "Get baskets that belong to current user",
      authorizations = {@Authorization(value = "Authorization")})
  @ApiResponses(
      value = {
        @ApiResponse(code = 200, message = "Success"),
        @ApiResponse(code = 403, message = "Unauthorized"),
      })
  @GetMapping(path = "/me/baskets", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Page<BasketResponseDto>> getBaskets(
      Pageable pageable, @CurrentAppUser AppUser appUser) {

    Page<Basket> basketsPage = basketService.findAllBaskets(pageable, appUser.getId());

    return ResponseEntity.ok(basketsPage.map(basketMapper::toResponse));
  }

  @ApiOperation(
      value = "Save a basket",
      authorizations = {@Authorization(value = "Authorization")})
  @ApiResponses(
      value = {
        @ApiResponse(code = 201, message = "Created"),
        @ApiResponse(
            code = 400,
            message = "Invalid request body",
            response = ValidationErrorResponseDto.class),
        @ApiResponse(code = 403, message = "Unauthorized"),
      })
  @PostMapping(
      path = "/me/baskets",
      produces = MediaType.APPLICATION_JSON_VALUE,
      consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<BasketResponseDto> saveBasket(
      @Valid @RequestBody SaveBasketRequestDto basket) {

    Basket savedBasket = basketService.saveBasket(basketMapper.toEntity(basket));
    URI location = URI.create("/me/baskets/" + savedBasket.getId());

    return ResponseEntity.created(location).body(basketMapper.toResponse(savedBasket));
  }

  @ApiOperation(
      value = "Update a basket",
      authorizations = {@Authorization(value = "Authorization")})
  @ApiResponses(
      value = {
        @ApiResponse(code = 200, message = "Success"),
        @ApiResponse(
            code = 400,
            message = "Invalid request body",
            response = ValidationErrorResponseDto.class),
        @ApiResponse(code = 403, message = "Unauthorized"),
        @ApiResponse(code = 404, message = "Basket not found", response = ApiErrorResponseDto.class)
      })
  @PutMapping(
      path = "/me/baskets/{basketId}",
      produces = MediaType.APPLICATION_JSON_VALUE,
      consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<BasketResponseDto> updateBasket(
      @PathVariable Long basketId,
      @Valid @RequestBody UpdateBasketRequestDto updateBasketRequestDto,
      @CurrentAppUser AppUser appUser) {

    Basket updatedBasket = basketService.updateBasket(basketId, updateBasketRequestDto, appUser.getId());

    return ResponseEntity.ok(basketMapper.toResponse(updatedBasket));
  }

  @ApiOperation(
      value = "Delete a basket",
      authorizations = {@Authorization(value = "Authorization")})
  @ApiResponses(
      value = {
        @ApiResponse(code = 200, message = "Success"),
        @ApiResponse(code = 403, message = "Unauthorized"),
        @ApiResponse(code = 404, message = "Basket not found", response = ApiErrorResponseDto.class)
      })
  @DeleteMapping(path = "/me/baskets/{basketId}", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Void> deleteBasket(
      @PathVariable Long basketId, @CurrentAppUser AppUser appUser) {

    basketService.deleteBasket(basketId, appUser.getId());

    return ResponseEntity.ok().build();
  }

  @ExceptionHandler(BasketNotFoundException.class)
  public ResponseEntity<ApiErrorResponseDto> handleNotFound(BasketNotFoundException exception) {
    return new ResponseEntity<>(
        ApiErrorResponseDto.of(exception.getMessage()), HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(BasketNotOwnedException.class)
  public ResponseEntity<ApiErrorResponseDto> handleNotOwned(BasketNotOwnedException exception) {
    return new ResponseEntity<>(
        ApiErrorResponseDto.of(exception.getMessage()), HttpStatus.FORBIDDEN);
  }
}
