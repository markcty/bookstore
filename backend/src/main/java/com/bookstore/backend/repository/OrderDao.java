package com.bookstore.backend.repository;

import java.math.BigDecimal;
import java.util.List;

import com.bookstore.backend.entity.Order;
import com.bookstore.backend.entity.OrderDetailMeta;

public interface OrderDao {
  Integer createOrder(Integer userId, String name, String phoneNumber, String address, String note,
      BigDecimal totalPrice);

  List<Order> getOrders(Integer userId);

  List<OrderDetailMeta> getOrderDetail(Integer id);

  void addBookForOrder(Integer orderId, Integer bookId, Integer quantity);
}
