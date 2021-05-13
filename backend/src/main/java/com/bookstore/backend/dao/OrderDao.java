package com.bookstore.backend.dao;

public interface OrderDao {
  Integer createOrder(Integer userId, String name, String phoneNumber, String address, String note);

  void addBookForOrder(Integer orderId, Integer bookId);
}
