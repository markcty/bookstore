package com.bookstore.backend.dao.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import com.bookstore.backend.dao.OrderDao;
import com.bookstore.backend.entity.Order;
import com.bookstore.backend.entity.User;
import com.bookstore.backend.repository.OrderRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;

@Repository
public class OrderDaoImpl implements OrderDao {

  @Autowired OrderRepository orderRepository;

  @Override
  public Optional<Order> getOrder(Integer id) {
    return orderRepository.findById(id);
  }

  @Override
  public void createOrder(Order order) {
    orderRepository.save(order);
  }

  @Override
  public List<Order> getAllOrders() {
    return StreamSupport.stream(orderRepository.findAll().spliterator(), false)
        .collect(Collectors.toList());
  }

  @Override
  public List<Order> getOrdersPage(User user, Integer page, Integer pageSize) {
    var p = PageRequest.of(page, pageSize);
    return orderRepository.findAllByUser(user, p);
  }

  @Override
  public List<Order> getAllOrdersPage(Integer page, Integer pageSize) {
    var p = PageRequest.of(page, pageSize);
    return StreamSupport.stream(orderRepository.findAll(p).spliterator(), false)
        .collect(Collectors.toList());
  }

  @Override
  public Long count(User user) {
    return orderRepository.countAllByUser(user);
  }

  @Override
  public Long count() {
    return orderRepository.count();
  }
}
