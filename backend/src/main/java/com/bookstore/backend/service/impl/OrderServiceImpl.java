package com.bookstore.backend.service.impl;

import java.math.BigDecimal;
import java.util.Set;
import java.util.stream.Collectors;

import com.bookstore.backend.dao.BookDao;
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

  @Autowired
  BookDao bookDao;

  @Override
  public void checkout(Integer userId, String consignee, String phoneNumber, String address, String note) {
    var user = userDao.getUser(userId).get();
    var items = user.getCart().getItems();
    if (items.isEmpty())
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "empty cart");

    // calculate total price and check inventory
    BigDecimal totalPrice = new BigDecimal(0);
    for (var item : items) {
      var book = item.getBook();
      if (book.getInventory() < item.getQuantity())
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
            "There is not enough inventory for book " + book.getTitle());
      totalPrice = totalPrice.add(book.getPrice().multiply(new BigDecimal(item.getQuantity())));
    }

    // create new order
    var newOrder = new Order();
    newOrder.setAddress(address);
    newOrder.setConsignee(consignee);
    newOrder.setNote(note);
    var orderItems = items.stream().map(item -> {
      var orderItem = new OrderItem();
      orderItem.setBook(item.getBook());
      orderItem.setQuantity(item.getQuantity());
      orderItem.setOrder(newOrder);
      return orderItem;
    }).collect(Collectors.toSet());
    newOrder.setOrderItems(orderItems);
    newOrder.setPhoneNumber(phoneNumber);
    newOrder.setTotalPrice(totalPrice);
    newOrder.setUser(user);
    orderDao.createOrder(newOrder);

    System.out.println(newOrder.getId());

    // subtract inventory
    for (var item : orderItems) {
      var book = item.getBook();
      book.setInventory(book.getInventory() - item.getQuantity());
      bookDao.updateBook(book);
    }

    // clear cart
    cartDao.clearCart(user.getCart());
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
    if (!order.isPresent())
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No such order");
    if (!order.get().getUser().equals(user) && user.getIsAdmin() == 0)
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You can not get other user's order");
    return order.get().getOrderItems();
  }
}
