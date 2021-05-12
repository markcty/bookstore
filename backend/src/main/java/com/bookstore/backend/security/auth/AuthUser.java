package com.bookstore.backend.security.auth;

import java.util.Collection;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class AuthUser implements UserDetails {
  private final Integer id;
  private final String username;
  private final String password;
  private final String email;
  private final Collection<? extends GrantedAuthority> authorities;
  private final Boolean isEnabled;

  public AuthUser(Integer id, String username, String password, String email,
      Collection<? extends GrantedAuthority> authorities, Integer isEnabled) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.authorities = authorities;
    this.isEnabled = isEnabled > 0 ? true : false;

  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
  }

  public Integer getId() {
    return id;
  }

  public String getEmail() {
    return email;
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return username;
  }

  @JsonIgnore
  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @JsonIgnore
  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @JsonIgnore
  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @JsonIgnore
  @Override
  public boolean isEnabled() {
    return isEnabled;
  }
}