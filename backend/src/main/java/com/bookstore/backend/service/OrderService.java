package com.bookstore.backend.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.bookstore.backend.entity.Order;
import com.bookstore.backend.entity.OrderItem;

public interface OrderService {
  void checkout(Integer userId, String consignee, String phoneNumber, String address, String note);

  List<Order> getOrders(Integer userId);

  Set<OrderItem> getOrder(Integer userId, Integer id);

  List<Order> getAllOrders();

  Map<String, Object> getOrdersPage(Integer userId, Integer page, Integer pageSize);

  Map<String, Object> getAllOrdersPage(Integer page, Integer pageSize);

  List<Order> getOrdersByBookTitle(Integer userId, String title);

  List<Order> getAllOrdersByBookTitle(String title);

  List<Order> getUserOrdersBetweenDate(Integer userId, LocalDate start, LocalDate end);
}
