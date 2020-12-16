package com.nalhin.fc.core.jwt;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.Clock;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtClock implements io.jsonwebtoken.Clock {

  private final Clock clock;

  @Override
  public Date now() {
    return new Date(clock.millis());
  }
}
