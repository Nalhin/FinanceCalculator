package com.nalhin.fc.core.security;

import com.nalhin.fc.user.User;
import com.nalhin.fc.user.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
class CustomUserDetailsService implements UserDetailsService {
  private final UserRepository userRepository;

  public CustomUserDetailsService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public UserDetails loadUserByUsername(String username) {
    return userRepository
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
