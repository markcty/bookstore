package com.bookstore.backend.dao;

import java.util.Optional;

import com.bookstore.backend.entity.User;

public interface UserDao {
  void register(String username, String password);

  Optional<User> getUser(String username);

  Optional<User> getUser(Integer userId);
}
