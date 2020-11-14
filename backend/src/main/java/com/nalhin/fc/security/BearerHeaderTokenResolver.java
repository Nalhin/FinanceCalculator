package com.nalhin.fc.security;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.Optional;

@Component
@RequiredArgsConstructor
class BearerHeaderTokenResolver {

  private static final String AUTH_PREFIX = "Bearer ";

  public Optional<String> resolveTokenFromHeader(String authHeader) {
    if (!isValidAuthHeader(authHeader)) {
      return Optional.empty();
    }
    return getTokenFromHeader(authHeader);
  }

  private boolean isValidAuthHeader(String authHeader) {
    return StringUtils.hasText(authHeader) && authHeader.startsWith(AUTH_PREFIX);
  }

  private Optional<String> getTokenFromHeader(String authHeader) {
    return Optional.of(authHeader.replace(AUTH_PREFIX, ""));
  }
}
