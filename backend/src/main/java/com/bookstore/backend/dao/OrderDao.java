package com.bookstore.backend.dao;

import java.util.List;

import com.bookstore.backend.entity.Book;
import com.bookstore.backend.entity.Order;

public interface OrderDao {
  Integer createOrder(Integer userId, String name, String phoneNumber, String address, String note, Double totalPrice);

  void addBookForOrder(Integer orderId, Integer bookId);

  List<Order> getOrders(Integer userId);

  List<Book> getBooksOfOrder(Integer id);
}
