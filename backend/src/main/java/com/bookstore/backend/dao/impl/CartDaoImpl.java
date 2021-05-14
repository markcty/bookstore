package com.bookstore.backend.dao.impl;

import java.util.List;

import com.bookstore.backend.dao.CartDao;
import com.bookstore.backend.entity.CartItemMeta;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class CartDaoImpl implements CartDao {

  @Autowired
  JdbcTemplate jdbcTemplate;

  @Override
  public List<CartItemMeta> getCart(Integer userId) {
    String sql = "SELECT book.id as bookId, title, author, price, coverUrl, quantity FROM `cart`,`cartItem`,`book` WHERE cart.id = cartItem.cartId and cartItem.bookId = book.id";
    return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(CartItemMeta.class));
  }

  @Override
  public void delCartItem(Integer id) {
    String sql = "delete from cartItem where id=" + id;
    jdbcTemplate.update(sql);
  }

  @Override
  public void addCartItem(Integer userId, Integer bookId) {
    String sql = "INSERT INTO cartItem (userId, bookId) VALUES (?, ?)";
    jdbcTemplate.update(sql, userId, bookId);
  }

  @Override
  public void clearCart(Integer userId) {
    String sql = "DELETE FROM cartItem where userId = ?";
    jdbcTemplate.update(sql, userId);
  }

}
