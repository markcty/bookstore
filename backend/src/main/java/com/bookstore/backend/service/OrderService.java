package com.bookstore.backend.service;

import java.util.List;

import com.bookstore.backend.entity.Order;

public interface OrderService {
  String checkout(Integer userId, String name, String phoneNumber, String address, String note);

  List<Order> getOrders(Integer userId);
}
