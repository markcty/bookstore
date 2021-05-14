package com.bookstore.backend.security.auth;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

import com.bookstore.backend.entity.User;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

public final class AuthUserFactory {
  private AuthUserFactory() {
  }

  public static AuthUserDetail create(User user) {
    return new AuthUserDetail(user.getId(), user.getUsername(), user.getPassword(), user.getEmail(),
        mapToGrantedAuthorities(user.getIsAdmin()), user.getIsEnabled());
  }

  private static List<GrantedAuthority> mapToGrantedAuthorities(Integer isAdmin) {
    List<String> authorities = new LinkedList<>();
    authorities.add("ROLE_USER");
    if (isAdmin > 0)
      authorities.add("ROLE_ADMIN");
    return authorities.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
  }
}
