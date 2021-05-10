package com.bookstore.backend.dao.impl;

import java.util.List;

import com.bookstore.backend.dao.CartDao;
import com.bookstore.backend.entity.CartItem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class CartDaoImpl implements CartDao {

  @Autowired
  JdbcTemplate jdbcTemplate;

  @Override
  public List<CartItem> getCartItems(Integer userId) {
    String sql = "select cartItem.id as id, book.id as bookId, title, author, price, inventory, coverUrl "
        + "from cartItem,book where cartItem.userId = " + userId + " and bookId = book.id";

    return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(CartItem.class));
  }
}
