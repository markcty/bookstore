package com.bookstore.backend.dao.impl;

import java.math.BigInteger;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

import com.bookstore.backend.dao.OrderDao;
import com.bookstore.backend.entity.Order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

@Repository
public class OrderDaoImpl implements OrderDao {

  @Autowired
  JdbcTemplate jdbcTemplate;

  @Override
  public Integer createOrder(Integer userId, String name, String phoneNumber, String address, String note) {
    KeyHolder keyHolder = new GeneratedKeyHolder();
    String sql = "INSERT INTO bookstore.`order` (userId, name, phoneNumber, Address, note) VALUES (?, ?, ?, ?, ?)";
    jdbcTemplate.update(new PreparedStatementCreator() {
      public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
        PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
        ps.setInt(1, userId);
        ps.setString(2, name);
        ps.setString(3, phoneNumber);
        ps.setString(4, address);
        ps.setString(5, note);
        return ps;
      }
    }, keyHolder);
    return ((BigInteger) keyHolder.getKey()).intValue();
  }

  @Override
  public void addBookForOrder(Integer orderId, Integer bookId) {
    String sql = "INSERT INTO bookstore.`orderDetail`(orderId, bookId) VALUES(?, ?)";
    jdbcTemplate.update(sql, orderId, bookId);
  }

  @Override
  public List<Order> getOrders(Integer userId) {
    var result = jdbcTemplate.query("SELECT * FROM `order` WHERE userId = " + userId,
        new BeanPropertyRowMapper<>(Order.class));
    System.out.println("ORDERS!!!!");
    result.forEach(res -> System.out.println(res.toString()));

    return result;
  }

}
