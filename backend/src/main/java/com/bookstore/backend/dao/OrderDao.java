package com.bookstore.backend.dao;

import java.util.Optional;

import com.bookstore.backend.entity.Order;

public interface OrderDao {
  Optional<Order> getOrder(Integer id);
}
