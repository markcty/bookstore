package com.bookstore.backend.dao;

import java.util.List;
import java.util.Optional;

import com.bookstore.backend.entity.Order;
import com.bookstore.backend.entity.User;

public interface OrderDao {
  Optional<Order> getOrder(Integer id);

  void createOrder(Order order);

  List<Order> getAllOrders();

  List<Order> getOrdersPage(User user, Integer page, Integer pageSize);

  List<Order> getAllOrdersPage(Integer page, Integer pageSize);
}
