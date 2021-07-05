package com.bookstore.backend.service.impl;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

import com.bookstore.backend.dao.BookDao;
import com.bookstore.backend.dao.CartDao;
import com.bookstore.backend.dao.OrderDao;
import com.bookstore.backend.dao.UserDao;
import com.bookstore.backend.entity.Book;
import com.bookstore.backend.entity.Order;
import com.bookstore.backend.entity.OrderItem;
import com.bookstore.backend.service.OrderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class OrderServiceImpl implements OrderService {

  @Autowired CartDao cartDao;

  @Autowired UserDao userDao;

  @Autowired OrderDao orderDao;

  @Autowired BookDao bookDao;

  @Override
  public void checkout(
      Integer userId, String consignee, String phoneNumber, String address, String note) {
    var temp = userDao.getUser(userId);
    if (temp.isEmpty()) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No such user");
    var user = temp.get();

    var items = user.getCart().getItems();
    if (items.isEmpty()) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "empty cart");

    // calculate total price and check inventory
    BigDecimal totalPrice = new BigDecimal(0);
    for (var item : items) {
      var book = item.getBook();
      if (book.getInventory() < item.getQuantity())
        throw new ResponseStatusException(
            HttpStatus.BAD_REQUEST,
            "There is not enough inventory for book \"" + book.getTitle() + "\"");
      totalPrice = totalPrice.add(book.getPrice().multiply(new BigDecimal(item.getQuantity())));
    }

    // create new order
    var newOrder = new Order();
    newOrder.setAddress(address);
    newOrder.setConsignee(consignee);
    newOrder.setNote(note);
    var orderItems =
        items.stream()
            .map(
                item -> {
                  var orderItem = new OrderItem();
                  orderItem.setBook(item.getBook());
                  orderItem.setQuantity(item.getQuantity());
                  orderItem.setOrder(newOrder);
                  return orderItem;
                })
            .collect(Collectors.toSet());
    newOrder.setOrderItems(orderItems);
    newOrder.setPhoneNumber(phoneNumber);
    newOrder.setTotalPrice(totalPrice);
    newOrder.setUser(user);
    orderDao.createOrder(newOrder);

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
  public List<Order> getOrders(Integer userId) {
    var temp = userDao.getUser(userId);
    if (temp.isEmpty()) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No such user");
    var user = temp.get();
    return user.getOrders();
  }

  @Override
  public Set<OrderItem> getOrder(Integer userId, Integer id) {
    var temp = userDao.getUser(userId);
    if (temp.isEmpty()) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No such user");
    var user = temp.get();

    var order = orderDao.getOrder(id);
    if (order.isEmpty()) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No such order");

    if (!order.get().getUser().equals(user) && user.getIsAdmin() == 0)
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You can not get other user's order");
    return order.get().getOrderItems();
  }

  @Override
  public List<Order> getAllOrders() {
    return orderDao.getAllOrders();
  }

  @Override
  public Map<String, Object> getOrdersPage(Integer userId, Integer page, Integer pageSize) {
    var temp = userDao.getUser(userId);
    if (temp.isEmpty()) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No such user");
    var user = temp.get();

    var orders = orderDao.getOrdersPage(user, page, pageSize);
    var total = orderDao.count(user);

    var res = new HashMap<String, Object>();
    res.put("orders", orders);
    res.put("total", total);
    return res;
  }

  @Override
  public Map<String, Object> getAllOrdersPage(Integer page, Integer pageSize) {
    var orders = orderDao.getAllOrdersPage(page, pageSize);
    var total = orderDao.count();

    var res = new HashMap<String, Object>();
    res.put("orders", orders);
    res.put("total", total);
    return res;
  }

  @Override
  public List<Order> getOrdersByBookTitle(Integer userId, String title) {
    var temp = userDao.getUser(userId);
    if (temp.isEmpty()) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No such user");
    var orders = temp.get().getOrders();

    return getOrdersContainingBookTitle(orders, title);
  }

  @Override
  public List<Order> getAllOrdersByBookTitle(String title) {
    var orders = orderDao.getAllOrders();
    return getOrdersContainingBookTitle(orders, title);
  }

  private List<Order> getOrdersContainingBookTitle(List<Order> orders, String title) {
    title = title.toLowerCase(Locale.ROOT);
    var res = new ArrayList<Order>();
    for (var order : orders) {
      var items = order.getOrderItems();
      for (var item : items)
        if (item.getBook().getTitle().toLowerCase(Locale.ROOT).contains(title)) {
          res.add(order);
          break;
        }
    }
    return res;
  }
}
