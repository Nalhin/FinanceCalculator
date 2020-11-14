package com.nalhin.fc.security;

import com.nalhin.fc.security.models.AppUser;
import org.springframework.security.core.Authentication;

import java.util.Optional;

public interface SecurityContextFacade {

  void setAuthentication(Authentication authentication);

  void clearAuthentication();

  Authentication getAuthentication();

  Optional<AppUser> getAppUser();
}
