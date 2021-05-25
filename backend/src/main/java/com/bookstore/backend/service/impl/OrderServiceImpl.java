package com.bookstore.backend.service.impl;

import java.util.Set;

import com.bookstore.backend.dao.CartDao;
import com.bookstore.backend.dao.OrderDao;
import com.bookstore.backend.dao.UserDao;
import com.bookstore.backend.entity.Order;
import com.bookstore.backend.entity.OrderItem;
import com.bookstore.backend.service.OrderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class OrderServiceImpl implements OrderService {

  @Autowired
  CartDao cartDao;

  @Autowired
  UserDao userDao;

  @Autowired
  OrderDao orderDao;

  @Override
  public void checkout(Integer userId, String name, String phoneNumber, String address, String note) {
    // var items = cartService.getCart(userId);
    // if (items.isEmpty())
    // return;
    // BigDecimal totalPrice = new BigDecimal(0);
    // for (var item : items)
    // totalPrice = totalPrice.add(item.getPrice().multiply(new
    // BigDecimal(item.getQuantity())));
    // var orderId = orderDao.createOrder(userId, name, phoneNumber, address, note,
    // totalPrice);
    // items.forEach(item -> orderDao.addBookForOrder(orderId, item.getBookId(),
    // item.getQuantity()));
    // cartService.clearCart(userId);
    // TODO: subtract inventory
  }

  @Override
  public Set<Order> getOrders(Integer userId) {
    var user = userDao.getUser(userId).get();
    return user.getOrders();
  }

  @Override
  public Set<OrderItem> getOrder(Integer userId, Integer id) {
    var user = userDao.getUser(userId).get();
    var order = orderDao.getOrder(id);
    System.out.println("haha");
    System.out.println(order);
    if (!order.isPresent())
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No such order");
    if (!order.get().getUser().equals(user) && user.getIsAdmin() == 0)
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You can not get other user's order");
    return order.get().getOrderItems();
  }
}
