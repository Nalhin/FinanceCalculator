package com.nalhin.fc.user;

import com.nalhin.fc.user.dto.UserResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {

  private final UserMapper userMapper;

  @GetMapping(path = "/me", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<UserResponseDto> me() {
    return ResponseEntity.ok(userMapper.userToUserResponseDto(new User()));
  }
}
