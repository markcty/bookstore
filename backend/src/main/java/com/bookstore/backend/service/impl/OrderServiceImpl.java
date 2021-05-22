package com.bookstore.backend.service.impl;

import java.math.BigDecimal;
import java.util.List;

import com.bookstore.backend.entity.Order;
import com.bookstore.backend.entity.OrderDetailMeta;
import com.bookstore.backend.repository.OrderRepository;
import com.bookstore.backend.service.CartService;
import com.bookstore.backend.service.OrderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderServiceImpl implements OrderService {

  @Autowired
  CartService cartService;

  @Autowired
  OrderRepository orderDao;

  @Override
  public void checkout(Integer userId, String name, String phoneNumber, String address, String note) {
    var items = cartService.getCart(userId);
    if (items.isEmpty())
      return;
    BigDecimal totalPrice = new BigDecimal(0);
    for (var item : items)
      totalPrice = totalPrice.add(item.getPrice().multiply(new BigDecimal(item.getQuantity())));
    var orderId = orderDao.createOrder(userId, name, phoneNumber, address, note, totalPrice);
    items.forEach(item -> orderDao.addBookForOrder(orderId, item.getBookId(), item.getQuantity()));
    cartService.clearCart(userId);
    // TODO: subtract inventory
  }

  @Override
  public List<Order> getOrders(Integer userId) {
    return orderDao.getOrders(userId);
  }

  @Override
  public List<OrderDetailMeta> getOrderDetail(Integer id) {
    return orderDao.getOrderDetail(id);
  }

}
