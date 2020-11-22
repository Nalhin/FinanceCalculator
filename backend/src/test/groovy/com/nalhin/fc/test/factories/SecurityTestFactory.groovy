package com.nalhin.fc.test.factories

import com.nalhin.fc.security.AppUser
import com.nalhin.fc.user.User
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication

class SecurityTestFactory {
  static AppUser appUser(user = UserTestFactory.user()) {
    return AppUser.appUserBuilder()
        .username(user.getUsername())
        .user(user)
        .password(user.getPassword())
        .accountNonExpired(true)
        .accountNonLocked(true)
        .credentialsNonExpired(true)
        .enabled(true)
        .authorities(Collections.emptyList()).build()
  }

  static Authentication authentication(User user) {
    return new UsernamePasswordAuthenticationToken(
        appUser(user), null, new ArrayList<>())
  }

  static Authentication authentication(AppUser user) {
    return new UsernamePasswordAuthenticationToken(user, null, new ArrayList<>())
  }
}
