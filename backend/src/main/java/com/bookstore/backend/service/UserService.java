package com.bookstore.backend.service;

import com.bookstore.backend.entity.User;

public interface UserService {
  void register(String username, String password);

  User getUser(String username);
}
