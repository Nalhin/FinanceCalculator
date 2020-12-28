package com.nalhin.fc.core.config;

import com.nalhin.fc.core.security.AppUser;
import com.nalhin.fc.core.security.SecurityContextFacade;
import com.nalhin.fc.user.User;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.auditing.DateTimeProvider;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.core.Authentication;

import java.time.Clock;
import java.util.Optional;

@Configuration
@EnableJpaAuditing(dateTimeProviderRef = "dateTimeProvider")
@RequiredArgsConstructor
public class JpaAuditingConfig implements AuditorAware<User> {

  private final SecurityContextFacade securityContextFacade;
  private final Clock clock;

  @NotNull
  @Override
  public Optional<User> getCurrentAuditor() {

    Authentication authentication = securityContextFacade.getAuthentication();
    if (authentication == null || !authentication.isAuthenticated()) {
      return Optional.empty();
    }

    User user = ((AppUser) authentication.getPrincipal()).getUser();
    return Optional.of(user);
  }

  @Bean
  public DateTimeProvider dateTimeProvider() {
    return () -> Optional.of(clock.instant());
  }
}
