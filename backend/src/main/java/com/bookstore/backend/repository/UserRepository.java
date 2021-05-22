package com.bookstore.backend.repository;

import java.util.Optional;

import com.bookstore.backend.entity.User;

public interface UserRepository {
  Optional<User> getUser(String username);

  void register(String username, String password);
}
