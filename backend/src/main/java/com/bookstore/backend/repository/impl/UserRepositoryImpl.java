package com.bookstore.backend.repository.impl;

import java.util.Optional;

import com.bookstore.backend.entity.User;
import com.bookstore.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepositoryImpl implements UserRepository {

  @Autowired
  JdbcTemplate jdbcTemplate;

  @Override
  public void register(String username, String password) {
    String sql = "INSERT INTO user(username, password) VALUES ('" + username + "', '" + password + "')";
    jdbcTemplate.update(sql);
  }

  @Override
  public Optional<User> getUser(String username) {
    String sql = "SELECT * FROM user WHERE username='" + username + "'";
    var list = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(User.class));
    if (list.isEmpty())
      return Optional.empty();
    return Optional.of(list.get(0));
  }
}