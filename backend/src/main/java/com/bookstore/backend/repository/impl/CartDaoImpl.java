package com.bookstore.backend.repository.impl;

import java.util.List;

import com.bookstore.backend.entity.CartItemMeta;
import com.bookstore.backend.repository.CartDao;

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
    String sql = "SELECT book.id as bookId, title, author, price, coverUrl, quantity FROM cart, cartItem, book WHERE cart.userId = "
        + userId + " and cart.id = cartItem.cartId and cartItem.bookId = book.id";
    return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(CartItemMeta.class));
  }

  @Override
  public void clearCart(Integer userId) {
    Integer cartId = getCartIdOfUser(userId);

    String sql = "DELETE FROM cartItem where cartId = ?";
    jdbcTemplate.update(sql, cartId);
  }

  @Override
  public Integer getQuantityOfBook(Integer userId, Integer bookId) {
    String sql = "SELECT quantity FROM cart, cartItem WHERE cart.userId = ? and cart.id=cartItem.cartId and cartItem.bookId = ?";
    var res = jdbcTemplate.queryForList(sql, userId, bookId);
    if (res.isEmpty())
      return 0;
    return (Integer) res.get(0).get("quantity");
  }

  @Override
  public void updateQuantityOfBook(Integer userId, Integer bookId, Integer quantity) {
    Integer cartId = getCartIdOfUser(userId);

    String sql = "SELECT * FROM cartItem where cartId = ? and bookId = ?";
    Boolean exist = jdbcTemplate.queryForList(sql, cartId, bookId).size() > 0;
    if (exist) {
      sql = "UPDATE cartItem SET quantity = ? where cartId = ? and bookId = ?";
      jdbcTemplate.update(sql, quantity, cartId, bookId);
    } else {
      sql = "INSERT INTO cartItem(cartId, bookId, quantity) VALUE(?, ?, ?) ";
      jdbcTemplate.update(sql, cartId, bookId, quantity);
    }

    if (quantity == 0) {
      sql = "DELETE FROM cartItem WHERE cartId = ? and bookId = ?";
      jdbcTemplate.update(sql, cartId, bookId);
    }
  }

  @Override
  public Integer getCartIdOfUser(Integer userId) {
    String sql = "SELECT id FROM cart WHERE userId = ?";
    var res = jdbcTemplate.queryForList(sql, userId);
    if (res.isEmpty()) {
      String insertSql = "INSERT INTO cart(userId) VALUE (?)";
      jdbcTemplate.update(insertSql, userId);
      res = jdbcTemplate.queryForList(sql, userId);
    }
    return (Integer) res.get(0).get("id");
  }

}
