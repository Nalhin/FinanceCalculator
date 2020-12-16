package com.nalhin.fc.user;

import com.nalhin.fc.common.annotations.CurrentAppUser;
import com.nalhin.fc.core.security.AppUser;
import com.nalhin.fc.user.dto.UserResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
class UserController {

  private final UserMapper userMapper;

  @GetMapping(path = "/me", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<UserResponseDto> me(@CurrentAppUser AppUser appUser) {
    return ResponseEntity.ok(userMapper.userToUserResponseDto(appUser.getUser()));
  }
}
