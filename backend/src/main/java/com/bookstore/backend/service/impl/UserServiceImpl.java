package com.bookstore.backend.service.impl;

import java.util.Set;

import com.bookstore.backend.dao.UserDao;
import com.bookstore.backend.entity.User;
import com.bookstore.backend.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

  @Autowired
  private UserDao userDao;

  @Autowired
  PasswordEncoder passwordEncoder;

  @Override
  public void register(String username, String password) {
    userDao.register(username, passwordEncoder.encode(password));
  }

  @Override
  public User getUser(String username) {
    return userDao.getUser(username).get();
  }

  @Override
  public Set<User> getUsers() {
    return userDao.getUsers();
  }
}
