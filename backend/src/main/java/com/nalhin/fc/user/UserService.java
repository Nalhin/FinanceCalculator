package com.nalhin.fc.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
  private final UserRepository userRepository;

  public boolean existsByEmailOrUsername(String email, String username) {
    return this.userRepository.existsByEmailOrUsername(email, username);
  }

  public Optional<User> findOneByUsername(String username) {
    return this.userRepository.findOneByUsername(username);
  }

  public User save(User user) {
    return this.userRepository.save(user);
  }
}
