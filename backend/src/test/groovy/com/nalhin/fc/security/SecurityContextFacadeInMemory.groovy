package com.nalhin.fc.security


import org.springframework.security.core.Authentication

class SecurityContextFacadeInMemory implements SecurityContextFacade {

  private Authentication authentication

  @Override
  void setAuthentication(Authentication authentication) {
    this.authentication = authentication
  }

  @Override
  void clearAuthentication() {
    authentication = null
  }

  @Override
  Authentication getAuthentication() {
    return authentication
  }

  @Override
  Optional<AppUser> getAppUser() {
    if (authentication == null) {
      return Optional.empty()
    }
    return Optional.ofNullable((AppUser) authentication.getPrincipal())
  }
}

