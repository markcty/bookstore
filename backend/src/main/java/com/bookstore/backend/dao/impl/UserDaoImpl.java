package com.bookstore.backend.dao.impl;

import java.util.Optional;

import com.bookstore.backend.dao.UserDao;
import com.bookstore.backend.entity.Cart;
import com.bookstore.backend.entity.User;
import com.bookstore.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Repository;
import org.springframework.web.server.ResponseStatusException;

@Repository
public class UserDaoImpl implements UserDao {

  @Autowired
  UserRepository userRepository;

  @Override
  public Optional<User> getUser(String username) {
    return userRepository.findByUsername(username);
  }

  @Override
  public void register(String username, String password) {
    if (userRepository.findByUsername(username).isPresent())
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "username already exists");
    var user = new User();
    user.setIsAdmin(0);
    user.setIsEnabled(1);
    user.setPassword(password);
    user.setUsername(username);

    // dispatch a cart
    var cart = new Cart();
    cart.setUser(user);
    user.setCart(cart);

    userRepository.save(user);
  }

  @Override
  public Optional<User> getUser(Integer userId) {
    return userRepository.findById(userId);
  }

}
