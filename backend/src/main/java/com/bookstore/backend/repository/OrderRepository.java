package com.bookstore.backend.repository;

import com.bookstore.backend.entity.Order;

import com.bookstore.backend.entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface OrderRepository extends PagingAndSortingRepository<Order, Integer> {
  List<Order> findAllByUser(User user, Pageable page);

  Long countAllByUser(User user);
}
