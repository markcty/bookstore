package com.bookstore.backend.dao.impl;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import com.bookstore.backend.dao.OrderDao;
import com.bookstore.backend.entity.Order;
import com.bookstore.backend.repository.OrderRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class OrderDaoImpl implements OrderDao {

  @Autowired
  OrderRepository orderRepository;

  @Override
  public Optional<Order> getOrder(Integer id) {
    return orderRepository.findById(id);
  }

  @Override
  public void createOrder(Order order) {
    orderRepository.save(order);
  }

  @Override
  public Set<Order> getAllOrders() {
    return new HashSet<>(orderRepository.findAll());
  }

}
