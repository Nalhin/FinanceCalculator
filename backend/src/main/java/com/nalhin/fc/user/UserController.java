package com.nalhin.fc.user;

import com.nalhin.fc.common.annotations.CurrentAppUser;
import com.nalhin.fc.common.dto.ApiErrorResponseDto;
import com.nalhin.fc.common.dto.ValidationErrorResponseDto;
import com.nalhin.fc.core.security.AppUser;
import com.nalhin.fc.user.dto.response.UserResponseDto;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(tags = "User")
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
class UserController {

  private final UserMapper userMapper;

  @ApiOperation(
      value = "Get current user details",
      authorizations = {@Authorization(value = "Authorization")})
  @ApiResponses(
      value = {
        @ApiResponse(code = 200, message = "Successful response"),
        @ApiResponse(code = 403, message = "Unauthorized"),
      })
  @GetMapping(path = "/me", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<UserResponseDto> me(@CurrentAppUser AppUser appUser) {
    return ResponseEntity.ok(userMapper.toResponse(appUser.getUser()));
  }
}
