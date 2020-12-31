package com.nalhin.fc.investment;

import com.nalhin.fc.common.annotations.CurrentAppUser;
import com.nalhin.fc.common.dto.ApiErrorResponseDto;
import com.nalhin.fc.common.dto.ValidationErrorResponseDto;
import com.nalhin.fc.investment.dto.response.InvestmentResponseDto;
import com.nalhin.fc.investment.dto.request.SaveInvestmentRequestDto;
import com.nalhin.fc.investment.dto.request.UpdateInvestmentRequestDto;
import com.nalhin.fc.core.security.AppUser;
import com.nalhin.fc.investment.exception.InvestmentBasketNotFound;
import com.nalhin.fc.investment.exception.InvestmentNotFoundException;
import com.nalhin.fc.investment.exception.InvestmentNotOwnedException;
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

@Api(tags = "Investment")
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
class InvestmentController {
  private final InvestmentService investmentService;
  private final InvestmentMapper mapper;

  @ApiOperation(
      value = "Get investments that belong to current user",
      authorizations = {@Authorization(value = "Authorization")})
  @ApiResponses(
      value = {
        @ApiResponse(code = 200, message = "Successful response"),
        @ApiResponse(code = 403, message = "Unauthorized"),
      })
  @GetMapping(
      path = "/me/baskets/{basketId}/investments",
      produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Page<InvestmentResponseDto>> getInvestmentsByBasketId(
      @PathVariable Long basketId, Pageable pageable, @CurrentAppUser AppUser appUser) {
    Page<Investment> investments =
        investmentService.findByBasketId(basketId, appUser.getId(), pageable);

    return ResponseEntity.ok().body(investments.map(mapper::toResponse));
  }

  @ApiOperation(
      value = "Get investment details",
      authorizations = {@Authorization(value = "Authorization")})
  @ApiResponses(
      value = {
        @ApiResponse(code = 200, message = "Successful response"),
        @ApiResponse(code = 403, message = "Unauthorized"),
        @ApiResponse(
            code = 404,
            message = "Investment not found",
            response = ApiErrorResponseDto.class)
      })
  @GetMapping(
      path = "/me/baskets/{basketId}/investments/{investmentId}",
      produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<InvestmentResponseDto> getInvestmentDetails(
      @PathVariable Long basketId,
      @PathVariable Long investmentId,
      @CurrentAppUser AppUser appUser) {
    Investment foundInvestment =
        investmentService.getByBasketIdAndId(basketId, investmentId, appUser.getId());

    return ResponseEntity.ok(mapper.toResponse(foundInvestment));
  }

  @ApiOperation(
      value = "Save an investment",
      authorizations = {@Authorization(value = "Authorization")})
  @ApiResponses(
      value = {
        @ApiResponse(code = 201, message = "Created"),
        @ApiResponse(
            code = 400,
            message = "Invalid request body",
            response = ValidationErrorResponseDto.class),
        @ApiResponse(code = 403, message = "Unauthorized"),
        @ApiResponse(code = 404, message = "Basket not found", response = ApiErrorResponseDto.class)
      })
  @PostMapping(
      path = "/me/baskets/{basketId}/investments",
      produces = MediaType.APPLICATION_JSON_VALUE,
      consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<InvestmentResponseDto> saveInvestment(
      @PathVariable Long basketId, @Valid @RequestBody SaveInvestmentRequestDto investment) {
    Investment savedInvestment =
        investmentService.saveInvestment(mapper.toEntity(investment), basketId);

    URI location =
        URI.create("/me/baskets/" + basketId + "/investments/" + savedInvestment.getId());

    return ResponseEntity.created(location).body(mapper.toResponse(savedInvestment));
  }

  @ApiOperation(
      value = "Update an investment",
      authorizations = {@Authorization(value = "Authorization")})
  @ApiResponses(
      value = {
        @ApiResponse(code = 200, message = "Success"),
        @ApiResponse(
            code = 400,
            message = "Invalid request body",
            response = ValidationErrorResponseDto.class),
        @ApiResponse(code = 403, message = "Unauthorized"),
        @ApiResponse(
            code = 404,
            message = "Investment not found",
            response = ApiErrorResponseDto.class)
      })
  @PutMapping(
      path = "/me/baskets/{basketId}/investments/{investmentId}",
      produces = MediaType.APPLICATION_JSON_VALUE,
      consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<InvestmentResponseDto> updateInvestment(
      @PathVariable Long investmentId,
      @PathVariable Long basketId,
      @Valid @RequestBody UpdateInvestmentRequestDto updateInvestmentRequestDto,
      @CurrentAppUser AppUser appUser) {
    Investment updatedInvestment =
        investmentService.updateInvestmentByBasketIdAndId(
            basketId, investmentId, updateInvestmentRequestDto, appUser.getId());

    return ResponseEntity.ok().body(mapper.toResponse(updatedInvestment));
  }

  @ApiOperation(
      value = "Delete an investment",
      authorizations = {@Authorization(value = "Authorization")})
  @ApiResponses(
      value = {
        @ApiResponse(code = 200, message = "Success"),
        @ApiResponse(code = 403, message = "Unauthorized"),
        @ApiResponse(
            code = 404,
            message = "Investment not found",
            response = ApiErrorResponseDto.class)
      })
  @DeleteMapping(
      path = "/me/baskets/{basketId}/investments/{investmentId}",
      produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Void> deleteInvestment(
      @PathVariable Long basketId,
      @PathVariable Long investmentId,
      @CurrentAppUser AppUser appUser) {
    investmentService.deleteByBasketIdAndId(basketId, investmentId, appUser.getId());

    return ResponseEntity.ok().build();
  }

  @ExceptionHandler(InvestmentNotFoundException.class)
  public ResponseEntity<ApiErrorResponseDto> handleNotFound(InvestmentNotFoundException exception) {
    return new ResponseEntity<>(
        ApiErrorResponseDto.of(exception.getMessage()), HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(InvestmentBasketNotFound.class)
  public ResponseEntity<ApiErrorResponseDto> handleNotFound(InvestmentBasketNotFound exception) {
    return new ResponseEntity<>(
        ApiErrorResponseDto.of(exception.getMessage()), HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(InvestmentNotOwnedException.class)
  public ResponseEntity<ApiErrorResponseDto> handleNotFound(InvestmentNotOwnedException exception) {
    return new ResponseEntity<>(
        ApiErrorResponseDto.of(exception.getMessage()), HttpStatus.FORBIDDEN);
  }
}
