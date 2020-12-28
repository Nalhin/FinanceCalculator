package com.nalhin.fc.auth;

import com.nalhin.fc.auth.dto.response.AuthResponseDto;
import com.nalhin.fc.auth.dto.request.LoginUserRequestDto;
import com.nalhin.fc.auth.dto.request.SignUpUserRequestDto;
import com.nalhin.fc.auth.exception.UsernameOrEmailTakenException;
import com.nalhin.fc.common.dto.ApiErrorResponseDto;
import com.nalhin.fc.user.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@Api(tags = "Authentication")
@RequestMapping("/api")
@RequiredArgsConstructor
class AuthController {

  private final AuthService authService;
  private final AuthMapper authMapper;

  @ApiOperation(value = "Login into a preexisting account")
  @ApiResponses(
      value = {
        @ApiResponse(code = 200, message = "Successful Login"),
        @ApiResponse(code = 400, message = "Request body is invalid"),
        @ApiResponse(code = 403, message = "Invalid credentials or account does not exist"),
      })
  @PostMapping(path = "/auth/login", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<AuthResponseDto> login(
      @Valid @RequestBody LoginUserRequestDto loginUserDto) {

    Pair<User, String> result =
        authService.login(loginUserDto.getUsername(), loginUserDto.getPassword());

    return ResponseEntity.ok(authMapper.toResponse(result));
  }

  @ApiOperation(value = "Create an account")
  @ApiResponses(
      value = {
        @ApiResponse(code = 200, message = "Account created"),
        @ApiResponse(code = 400, message = "Request body is invalid"),
        @ApiResponse(code = 409, message = "Username or email is already taken")
      })
  @PostMapping(path = "/auth/sign-up", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<AuthResponseDto> signUp(
      @Valid @RequestBody SignUpUserRequestDto signUpUserDto) {

    Pair<User, String> result =
        authService.signUp(authMapper.toEntity(signUpUserDto));

    return ResponseEntity.ok(authMapper.toResponse(result));
  }

  @ExceptionHandler(UsernameOrEmailTakenException.class)
  public ResponseEntity<ApiErrorResponseDto> handleAuctionNotFound(
      UsernameOrEmailTakenException exception) {
    return new ResponseEntity<>(
        ApiErrorResponseDto.of(exception.getMessage()), HttpStatus.CONFLICT);
  }
}
