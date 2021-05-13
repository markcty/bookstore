package com.bookstore.backend.service;

public interface OrderService {
  String checkout(Integer userId, String name, String phoneNumber, String address, String note);
}
