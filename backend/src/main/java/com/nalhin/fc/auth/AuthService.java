package com.nalhin.fc.auth;

import com.nalhin.fc.auth.exception.UsernameOrEmailTakenException;
import com.nalhin.fc.core.jwt.JwtService;
import com.nalhin.fc.core.security.AppUser;
import com.nalhin.fc.user.User;
import com.nalhin.fc.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.util.Pair;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
class AuthService {

  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;
  private final PasswordEncoder passwordEncoder;
  private final UserRepository userRepository;

  public Pair<User, String> login(String username, String password) {
    Authentication auth =
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(username, password));
    User user = ((AppUser) auth.getPrincipal()).getUser();
    return Pair.of(user, jwtService.sign(user.getUsername()));
  }

  public Pair<User, String> signUp(User user) {
    if (userRepository.existsByEmailOrUsername(user.getEmail(), user.getUsername())) {
      throw new UsernameOrEmailTakenException();
    }
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    User savedUser = userRepository.save(user);
    return Pair.of(savedUser, jwtService.sign(user.getUsername()));
  }
}
