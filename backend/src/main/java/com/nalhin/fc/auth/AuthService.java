package com.nalhin.fc.auth;

import com.nalhin.fc.jwt.JwtService;
import com.nalhin.fc.security.models.AppUser;
import com.nalhin.fc.user.User;
import com.nalhin.fc.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class AuthService {

  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;
  private final PasswordEncoder passwordEncoder;
  private final UserService userService;

  public Pair<User, String> login(String username, String password) {
    Authentication auth =
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(username, password));
    User user = ((AppUser) auth.getPrincipal()).getUser();
    return Pair.of(user, jwtService.sign(user.getUsername()));
  }

  public Pair<User, String> signUp(User user) {
    if (userService.existsByEmailOrUsername(user.getEmail(), user.getUsername())) {
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Username or email is already taken");
    }
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    User savedUser = userService.save(user);
    return Pair.of(savedUser, jwtService.sign(user.getUsername()));
  }
}
