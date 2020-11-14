package com.nalhin.fc.jwt;

import io.jsonwebtoken.Clock;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.Date;
import java.util.Optional;

@Service
public class JwtService {

  private final String jwtKey;
  private final Long validityInMs;
  private final Clock clock;

  public JwtService(
      @Value("${jwt.secret:jwt}") String jwtKey,
      @Value("${jwt.validity:3600000}") Long validity,
      Clock clock) {
    this.jwtKey = encodeKey(jwtKey);
    this.validityInMs = validity;
    this.clock = clock;
  }

  private String encodeKey(String key) {
    return Base64.getEncoder().encodeToString(key.getBytes());
  }

  public String sign(String username) {
    Date now = clock.now();
    Date expiration = new Date(now.getTime() + validityInMs);

    return Jwts.builder()
        .setSubject(username)
        .setIssuedAt(now)
        .setExpiration(expiration)
        .signWith(SignatureAlgorithm.HS512, jwtKey)
        .compact();
  }

  public Optional<String> resolveUsernameFromToken(String token) {
    try {
      return Optional.of(
          Jwts.parser()
              .setSigningKey(jwtKey)
              .setClock(clock)
              .parseClaimsJws(token)
              .getBody()
              .getSubject());
    } catch (JwtException ex) {
      return Optional.empty();
    }
  }

  public boolean isTokenValid(String token) {
    try {
      Jwts.parser().setSigningKey(jwtKey).setClock(clock).parseClaimsJws(token);
      return true;
    } catch (JwtException ex) {
      return false;
    }
  }
}
