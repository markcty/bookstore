package com.bookstore.backend.dao;

import java.util.Optional;
import java.util.Set;

import com.bookstore.backend.entity.Order;

public interface OrderDao {
  Optional<Order> getOrder(Integer id);

  void createOrder(Order order);

  Set<Order> getAllOrders();
}
