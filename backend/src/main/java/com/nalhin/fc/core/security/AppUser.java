package com.nalhin.fc.core.security;

import com.nalhin.fc.user.User;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@EqualsAndHashCode(callSuper = true)
public class AppUser extends org.springframework.security.core.userdetails.User {

  private final User user;

  @Builder(builderMethodName = "appUserBuilder")
  public AppUser(
      String username,
      String password,
      boolean enabled,
      boolean accountNonExpired,
      boolean credentialsNonExpired,
      boolean accountNonLocked,
      Collection<? extends GrantedAuthority> authorities,
      User user) {
    super(
        username,
        password,
        enabled,
        accountNonExpired,
        credentialsNonExpired,
        accountNonLocked,
        authorities);
    this.user = user;
  }

  public Long getId() {
    return user.getId();
  }

  public User getUser() {
    return user;
  }
}
