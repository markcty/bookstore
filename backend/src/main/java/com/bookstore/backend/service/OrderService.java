package com.bookstore.backend.service;

import java.util.Set;

import com.bookstore.backend.entity.Order;
import com.bookstore.backend.entity.OrderItem;

public interface OrderService {
  void checkout(Integer userId, String consignee, String phoneNumber, String address, String note);

  Set<Order> getOrders(Integer userId);

  Set<OrderItem> getOrder(Integer userId, Integer id);
}
