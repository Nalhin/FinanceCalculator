package com.nalhin.fc.core.security;

import com.nalhin.fc.core.jwt.JwtService;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

  private static final String AUTH_HEADER = "Authorization";

  private final JwtService jwtService;
  private final BearerHeaderTokenResolver bearerHeaderTokenResolver;
  private final UserDetailsService authUserDetailsService;
  private final SecurityContextFacade securityContextFacade;

  @Override
  protected void doFilterInternal(
      HttpServletRequest request, @NotNull HttpServletResponse response, FilterChain chain)
      throws ServletException, IOException {

    bearerHeaderTokenResolver
        .resolveTokenFromHeader(request.getHeader(AUTH_HEADER))
        .flatMap(jwtService::resolveUsernameFromToken)
        .flatMap(this::getAuthentication)
        .ifPresentOrElse(
            securityContextFacade::setAuthentication, securityContextFacade::clearAuthentication);

    chain.doFilter(request, response);
  }

  private Optional<UsernamePasswordAuthenticationToken> getAuthentication(String username) {
    try {
      UserDetails userDetails = this.authUserDetailsService.loadUserByUsername(username);
      return Optional.of(
          new UsernamePasswordAuthenticationToken(userDetails, null, new ArrayList<>()));
    } catch (UsernameNotFoundException e) {
      return Optional.empty();
    }
  }
}
