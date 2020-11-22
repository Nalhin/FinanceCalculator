package com.nalhin.fc.security;

import com.nalhin.fc.user.User;
import com.nalhin.fc.user.UserService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
class CustomUserDetailsService implements UserDetailsService {
  private final UserService userService;

  public CustomUserDetailsService(UserService userService) {
    this.userService = userService;
  }

  @Override
  public UserDetails loadUserByUsername(String username) {
    return userService
        .findOneByUsername(username)
        .map(this::toUserDetails)
        .orElseThrow(() -> new UsernameNotFoundException(username + " not found"));
  }

  private UserDetails toUserDetails(User user) {
    return AppUser.appUserBuilder()
        .username(user.getUsername())
        .user(user)
        .password(user.getPassword())
        .accountNonExpired(true)
        .accountNonLocked(true)
        .credentialsNonExpired(true)
        .enabled(true)
        .authorities(Collections.emptyList())
        .build();
  }
}
