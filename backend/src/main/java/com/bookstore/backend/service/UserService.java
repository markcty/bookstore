package com.bookstore.backend.service;

import java.util.Optional;

import com.bookstore.backend.entity.User;

public interface UserService {
  void register(String username, String password);

  Optional<User> getUser(String username);
}
